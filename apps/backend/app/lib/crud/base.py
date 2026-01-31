# # app/services/base_crud.py
# """
# BaseCRUD
# ---------
# A generic, fully async CRUD helper class designed for SQLModel + AsyncSession.
#
# This class should be extended by resource-specific CRUD classes such as:
#     - UserCRUD(BaseCRUD[User, UserCreate, UserUpdate])
#     - ProductCRUD(BaseCRUD[Product, ProductCreate, ProductUpdate])
#
# Features:
#     • Highly typed (uses TypeVar for model + schemas)
#     • Async-only SQLModel operations
#     • Minimal business logic — pure data access layer
#     • Separate create/update schemas for safety
# """
#
# from typing import Generic, Type, TypeVar, Optional, Sequence, Union
#
# from pydantic import BaseModel
# from sqlmodel import SQLModel, select
# from sqlmodel.ext.asyncio.session import AsyncSession
#
# # Generic type variables
# ModelType = TypeVar("ModelType", bound=SQLModel)
# CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
# UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)
#
#
# class BaseCRUD(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
#     """Generic async CRUD operations for SQLModel models."""
#
#     def __init__(self, model: Type[ModelType]):
#         # The SQLModel (ORM) class, e.g. User, Product
#         self.model = model
#
#     # ------------------------------------------------------------
#     # GET BY ID
#     # ------------------------------------------------------------
#     async def get(
#         self,
#         db: AsyncSession,
#         id: Union[int, str]
#     ) -> Optional[ModelType]:
#         """
#         Retrieve a single record by primary key.
#
#         Args:
#             db: AsyncSession
#             id: Primary key value
#
#         Returns:
#             The model instance or None.
#         """
#         result = await db.exec(select(self.model).where(self.model.id == id))
#         return result.first()
#
#     # ------------------------------------------------------------
#     # LIST / PAGINATION
#     # ------------------------------------------------------------
#     async def get_multi(
#         self,
#         db: AsyncSession,
#         *,
#         skip: int = 0,
#         limit: int = 100
#     ) -> Sequence[ModelType]:
#         """
#         Retrieve multiple rows with pagination.
#         """
#         query = select(self.model).offset(skip).limit(limit)
#         result = await db.exec(query)
#         return result.all()
#
#     # ------------------------------------------------------------
#     # CREATE
#     # ------------------------------------------------------------
#     async def create(
#         self,
#         db: AsyncSession,
#         *,
#         obj_in: CreateSchemaType
#     ) -> ModelType:
#         """
#         Create a new database row.
#         Accepts a CreateSchemaType to avoid exposing raw model fields.
#         """
#         obj_data = obj_in.model_dump()  # safe conversion
#         db_obj = self.model(**obj_data)
#
#         db.add(db_obj)
#         await db.commit()
#         await db.refresh(db_obj)
#         return db_obj
#
#     # ------------------------------------------------------------
#     # UPDATE
#     # ------------------------------------------------------------
#     async def update(
#         self,
#         db: AsyncSession,
#         *,
#         db_obj: ModelType,
#         obj_in: UpdateSchemaType
#     ) -> ModelType:
#         """
#         Update an existing DB row.
#         Only fields present in the update schema are applied.
#         """
#         update_data = obj_in.model_dump(exclude_unset=True)
#
#         for field, value in update_data.items():
#             setattr(db_obj, field, value)
#
#         db.add(db_obj)
#         await db.commit()
#         await db.refresh(db_obj)
#         return db_obj
#
#     # ------------------------------------------------------------
#     # DELETE
#     # ------------------------------------------------------------
#     async def remove(
#         self,
#         db: AsyncSession,
#         *,
#         id: Union[int, str]
#     ) -> Optional[ModelType]:
#         """
#         Delete a record by ID.
#         Returns the deleted object, or None if not found.
#         """
#         obj = await self.get(db, id)
#         if not obj:
#             return None
#
#         await db.delete(obj)
#         await db.commit()
#         return obj


from typing import Generic, Type, TypeVar, Optional, Sequence
from uuid import UUID

from pydantic import BaseModel
from sqlmodel import SQLModel, select
from sqlmodel.ext.asyncio.session import AsyncSession

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
