from datetime import datetime
from typing import Literal, List, Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from pydantic.alias_generators import to_camel

from app.lib.db.models import ServiceCategory, ServiceProvider


# --- Shared Nested Models ---


class FAQ(BaseModel):
    q: str
    a: str


class Pricing(BaseModel):
    governmentFee: int = 0
    serviceFee: int = 0
    total: int = 0


class Author(BaseModel):
    name: str
    role: str


class ImageInfo(BaseModel):
    url: str
    alt: str


class ContentSection(BaseModel):
    heading: str
    body: str
    hasAdAfter: bool = False


class BlogContent(BaseModel):
    introduction: str
    sections: List[ContentSection]


# --- Service Schemas ---

# from pydantic import BaseModel, Field, ConfigDict

#
# class ServiceBase(BaseModel):
#     name: str
#     slug: str
#     provider: str
#     category: ServiceCategory
#
#     # Add validation_alias to tell Pydantic where to look in the DB
#     subCategory: str = Field(validation_alias="sub_category")
#     icon: str
#     description: str
#     seoTitle: str = Field(validation_alias="seo_title")
#     seoDescription: str = Field(validation_alias="seo_description")
#     requirements: List[str]
#     faqs: List[FAQ]
#     pricing: Pricing
#     estimatedTime: str = Field(validation_alias="estimated_time")
#
#     # This is the "magic" config that allows reading from SQLModel objects
#     model_config = ConfigDict(
#         alias_generator=to_camel,
#         populate_by_name=True,  # Allows using 'sub_category'
#         from_attributes=True,
#         validate_by_alias=True,  # ADD THIS: Tells Pydantic to look for 'subCategory'
#     )


class ServiceBase(BaseModel):
    name: str
    slug: str
    # Wired to Enums for "Perfect Automation"
    provider: ServiceProvider
    category: ServiceCategory

    # Pydantic 2 uses validation_alias to map DB (snake) to Code (camel)
    sub_category: str = Field(alias="subCategory", validation_alias="sub_category")
    icon: str
    description: str

    seo_title: str = Field(alias="seoTitle", validation_alias="seo_title")
    seo_description: str = Field(
        alias="seoDescription", validation_alias="seo_description"
    )

    requirements: List[str]
    faqs: List[FAQ]
    pricing: Pricing

    estimated_time: str = Field(
        alias="estimatedTime", validation_alias="estimated_time"
    )

    # Flags for Next.js Logic
    available: bool = True
    published: bool = False
    featured: bool = False
    popularity_score: Optional[float] = 0.0
    schema_type: str = Field(default="Service", alias="schemaType")
    related_slugs: Optional[List[str]] = Field(default=[], alias="relatedSlugs")

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
        # This ensures that when we seed or read, both styles work
    )


class ServiceCreateSchema(ServiceBase):
    pass


class ServiceUpdateSchema(BaseModel):
    name: Optional[str]
    slug: Optional[str]
    provider: Optional[str]
    category: Optional[Literal["Government", "Education", "Business"]]
    subCategory: Optional[str]
    icon: Optional[str]
    description: Optional[str]
    seoTitle: Optional[str] = Field(None, max_length=60)
    seoDescription: Optional[str] = Field(None, max_length=160)
    requirements: Optional[List[str]]
    faqs: Optional[List[FAQ]]
    pricing: Optional[Pricing]
    estimatedTime: Optional[str]

    # # This is the "magic" config that allows reading from SQLModel objects
    # model_config = ConfigDict(
    #     from_attributes=True,
    #     populate_by_name=True
    # )


class ServiceRead(ServiceBase):
    """The schema Next.js uses for pre-rendering."""

    id: UUID
    available: bool
    published: bool


class ServiceSlugsResposnse(BaseModel):
    slug: str


# --- User & Order Schemas ---


class UserSchema(BaseModel):
    first_name: str = Field(alias="firstName")
    second_name: str = Field(alias="secondName")
    email: EmailStr
    phone_number: str = Field(alias="phoneNumber")
    contact_method: str = Field(alias="contactMethod")

    model_config = ConfigDict(populate_by_name=True, from_attributes=True)


class UserCreateSchema(UserSchema):
    pass


class UserUpdateSchema(BaseModel):
    first_name: str
    second_name: str
    phone_number: str
    contact_method: str
    email: str


class OrderUpdateSchema(BaseModel):
    status: str


class OrderSchema(BaseModel):
    user_id: UUID = Field(alias="userId")
    service_id: UUID = Field(alias="serviceId")
    status: str
    created_at: datetime = Field(alias="orderDate")

    model_config = ConfigDict(populate_by_name=True, from_attributes=True)


class OrderCreateSchema(BaseModel):
    user_id: UUID
    service_id: UUID
    status: str


class OrderRequestSchema(UserCreateSchema):
    service_id: UUID
    status: str


# --- Blog Schemas ---


class BlogPostRead(BaseModel):
    title: str
    slug: str
    category: Literal["Guides", "News", "Taxes", "Legal"]
    author: Author  # We can map the Author model to this shape
    image: ImageInfo
    excerpt: str
    seoTitle: str
    seoDescription: str
    content: BlogContent
    relatedServices: List[str]  # Fetched via the ServiceBlogLink table
    faqs: List[FAQ]

    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
