from datetime import datetime
from typing import Literal, List
from uuid import UUID

from pydantic import BaseModel, EmailStr

# users
class UserSchema(BaseModel):
    first_name: str
    second_name: str
    email: EmailStr
    phone_number: str
    contact_method: str



class UserCreateSchema(BaseModel):
    first_name: str
    second_name: str
    email: str
    phone_number: str
    contact_method: str
    # service_id: UUID


class UserUpdateSchema(BaseModel):
    first_name: str
    second_name: str
    phone_number: str
    contact_method: str
    email: str





class BlogSchema(BaseModel):
    title: str
    content: str
    author_id: int
    is_published: bool



# class ServiceSchema(BaseModel):
#     name: str
#     description: str
#     price: float
#     is_available: bool

# class Service(BaseMixin, table=True):
#     __tablename__ = "services"
#
#     service_name: str
#     description: Optional[str] = None
#     price: int
#     slug: str = Field(unique=True, index=True)





class OrderSchema(BaseModel):
    user_id: UUID
    service_id: UUID
    order_date: datetime
    status: str

class OrderCreateSchema(BaseModel):
    user_id: UUID
    service_id: UUID
    status: str

class OrderUpdateSchema(BaseModel):
    status: str


class OrderRequestSchema(UserCreateSchema):
    service_id: UUID
    status: str



# from pydantic import BaseModel, Field
# from typing import List, Optional, Literal
# from datetime import datetime



# --- Shared Nested Models ---
class FAQ(BaseModel):
    q: str
    a: str

class Pricing(BaseModel):
    governmentFee: str
    serviceFee: str
    total: str

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

# --- Main Models ---
class ServiceBase(BaseModel):
    name: str
    slug: str
    provider: str
    category: Literal["Government", "Education", "Business"]
    subCategory: str
    icon: str
    description: str
    seoTitle: str
    seoDescription: str
    requirements: List[str]
    faqs: List[FAQ]
    pricing: Pricing
    estimatedTime: str

class BlogPostBase(BaseModel):
    title: str
    slug: str
    category: Literal["Guides", "News", "Taxes", "Legal"]
    author: Author
    publishedDate: str
    updatedDate: str
    image: ImageInfo
    excerpt: str
    seoTitle: str
    seoDescription: str
    content: BlogContent
    relatedServices: List[str]
    faqs: List[FAQ]




class ServiceCreateSchema(ServiceBase):
    pass

class ServiceUpdateSchema(ServiceBase):
    pass
