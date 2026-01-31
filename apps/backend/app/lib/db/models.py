from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from uuid import UUID, uuid4

from sqlalchemy import DateTime, func, text, Enum
from sqlalchemy.dialects.postgresql import UUID as PG_UUID, JSONB
from sqlmodel import Field, SQLModel, Column

# enums for both categories in service and blogs


class ServiceCategory(Enum):
    GOVERNMENT = "Government"
    EDUCATION = "Education"
    BUSINESS = "Business"


# -----------------------
# Base Mixins
# -----------------------


class TimestampMixin(SQLModel):
    # Use sa_type and sa_column_kwargs instead of sa_column=Column(...)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={"server_default": func.now(), "nullable": False},
    )

    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={
            "server_default": func.now(),
            "onupdate": func.now(),
            "nullable": False,
        },
    )

    deleted_at: Optional[datetime] = Field(
        default=None,
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={"nullable": True},
    )


class BaseMixin(TimestampMixin):
    # Standard Fields work best for IDs in Mixins
    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        index=True,
        sa_type=PG_UUID(as_uuid=True),
        sa_column_kwargs={
            "server_default": text("gen_random_uuid()"),
            "nullable": False,
        },
    )


# -----------------------
# Concrete Tables
# -----------------------


class User(BaseMixin, table=True):
    __tablename__ = "users"
    first_name: str = Field(alias="firstName")
    second_name: str = Field(alias="secondName")
    email: str = Field(unique=True, index=True)
    phone_number: str = Field(alias="phoneNumber")
    contact_method: str = Field(alias="contactMethod")  # "Email" | "Phone"


# class Service(BaseMixin, table=True):
#     __tablename__ = "services"
#
#     service_name: str
#     description: Optional[str] = None
#     price: int
#     slug: str = Field(unique=True, index=True)


class Order(BaseMixin, table=True):
    __tablename__ = "orders"
    user_id: UUID = Field(foreign_key="users.id", index=True, alias="userId")
    service_id: UUID = Field(foreign_key="services.id", index=True, alias="serviceId")
    status: str


# --- SQLModel Table Definitions ---


class Service(BaseMixin, table=True):
    __tablename__ = "services"

    name: str
    slug: str = Field(index=True, unique=True)
    provider: str
    category: str  # "Government" | "Education" | "Business"
    sub_category: str = Field(alias="subCategory")
    icon: str
    description: str
    seo_title: str = Field(alias="seoTitle")
    seo_description: str = Field(alias="seoDescription")

    # JSONB columns for nested data
    requirements: List[str] = Field(sa_column=Column(JSONB))
    faqs: List[Dict[str, str]] = Field(sa_column=Column(JSONB))
    pricing: Dict[str, str] = Field(sa_column=Column(JSONB))
    estimated_time: str = Field(alias="estimatedTime")


class BlogPost(BaseMixin, table=True):
    __tablename__ = "blog_posts"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    slug: str = Field(index=True, unique=True)
    category: str  # "Guides" | "News" | "Taxes" | "Legal"

    # Complex nested structures stored as JSONB
    author: Dict[str, str] = Field(sa_column=Column(JSONB))
    published_date: str = Field(alias="publishedDate")
    updated_date: str = Field(alias="updatedDate")
    image: Dict[str, str] = Field(sa_column=Column(JSONB))
    excerpt: str
    seo_title: str = Field(alias="seoTitle")
    seo_description: str = Field(alias="seoDescription")
    content: Dict[str, Any] = Field(sa_column=Column(JSONB))
    related_services: List[str] = Field(
        sa_column=Column(JSONB), alias="relatedServices"
    )
    faqs: List[Dict[str, str]] = Field(sa_column=Column(JSONB))
