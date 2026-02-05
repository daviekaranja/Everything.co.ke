from typing import Generic, Type, TypeVar, Optional, Sequence, Any, Dict
from uuid import UUID
from pydantic import BaseModel, ValidationError, TypeAdapter
from sqlmodel import SQLModel, select, col
from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi import HTTPException

# ---------------------------------------------------------
# Generic type variables
# ---------------------------------------------------------
ModelType = TypeVar("ModelType", bound=SQLModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class BaseCRUD(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """
    Generic async CRUD operations for SQLModel models.

    - Async-only
    - UUID primary keys
    - Transaction-safe (no implicit commits)
    - Dynamic attribute validation
    """

    def __init__(self, model: Type[ModelType]):
        self.model = model

    # -----------------------------------------------------
    # GET BY ID
    # -----------------------------------------------------
    async def get(
        self,
        db: AsyncSession,
        id: UUID,
    ) -> Optional[ModelType]:
        stmt = select(self.model).where(self.model.id == id).limit(1)
        result = await db.exec(stmt)
        return result.first()

    # -----------------------------------------------------
    # DYNAMIC FILTERING (The Architect's Addition)
    # -----------------------------------------------------
    async def get_by_attributes(
        self,
        db: AsyncSession,
        *,
        filters: Dict[str, Any],
        skip: int = 0,
        limit: int = 100,
        descending: bool = False,
    ) -> Sequence[ModelType]:
        """
        Filters by any column with pre-flight validation.
        - Checks if column exists on model.
        - Validates data type against model definition.
        """
        stmt = select(self.model)

        for field_name, value in filters.items():
            # 1. Check if column exists
            if not hasattr(self.model, field_name):
                raise HTTPException(
                    status_code=400,
                    detail=f"Field '{field_name}' does not exist on model {self.model.__name__}",
                )

            # 2. Type validation using Pydantic TypeAdapter
            # We extract the expected type from SQLModel/Pydantic fields
            try:
                field_info = self.model.model_fields.get(field_name)
                if field_info:
                    expected_type = field_info.annotation
                    # Validate the value matches the expected type (e.g., str vs int)
                    TypeAdapter(expected_type).validate_python(value)
            except ValidationError as e:
                raise HTTPException(
                    status_code=422,
                    detail=f"Invalid type for field '{field_name}': {str(e)}",
                )

            # 3. Add to query
            stmt = stmt.where(getattr(self.model, field_name) == value)

        # Apply ordering and pagination
        if descending:
            stmt = stmt.order_by(col(self.model.id).desc())

        stmt = stmt.offset(skip).limit(limit)

        result = await db.exec(stmt)
        return result.all()

    # -----------------------------------------------------
    # LIST / PAGINATION
    # -----------------------------------------------------
    async def get_multi(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 100,
    ) -> Sequence[ModelType]:
        stmt = select(self.model).offset(skip).limit(limit)
        result = await db.exec(stmt)
        return result.all()

    # -----------------------------------------------------
    # CREATE
    # -----------------------------------------------------
    async def create(
        self,
        db: AsyncSession,
        *,
        obj_in: CreateSchemaType,
    ) -> ModelType:
        obj_data = obj_in.model_dump()
        db_obj = self.model(**obj_data)

        db.add(db_obj)
        await db.flush()  # 👈 let DB generate UUID + timestamps
        await db.refresh(db_obj)

        return db_obj

    # -----------------------------------------------------
    # UPDATE
    # -----------------------------------------------------
    async def update(
        self,
        db: AsyncSession,
        *,
        db_obj: ModelType,
        obj_in: UpdateSchemaType,
    ) -> ModelType:
        update_data = obj_in.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(db_obj, field, value)

        await db.flush()
        await db.refresh(db_obj)

        return db_obj

    # -----------------------------------------------------
    # DELETE
    # -----------------------------------------------------
    async def remove(
        self,
        db: AsyncSession,
        *,
        id: UUID,
    ) -> Optional[ModelType]:
        obj = await self.get(db, id)
        if not obj:
            return None

        await db.delete(obj)
        await db.flush()

        return obj
