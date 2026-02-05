# from datetime import datetime, timezone
# from typing import Optional, List, Dict, Any
# from uuid import UUID, uuid4
# from enum import Enum as PyEnum
#
# from sqlalchemy import DateTime, func, text, Enum
# from sqlalchemy.dialects.postgresql import UUID as PG_UUID, JSONB
# from sqlmodel import Field, SQLModel, Column, Relationship, Index
#
#
# # --- ENUMS ---
#
# class ServiceCategory(str, PyEnum):
#     """
#     Standardized Categories based on the Kenya eCitizen & MDA 2026 framework.
#     These power the primary navigation and SEO silos in Next.js.
#     """
#     TRANSPORT = "Transport & Motoring"
#     CIVIL_REG = "Civil Registration"  # Births, Deaths, Marriages
#     TAXATION = "Taxation & KRA"
#     BUSINESS = "Business & Industry"
#     EDUCATION = "Education & Training"
#     HEALTH = "Health Services"
#     LEGAL = "Legal & Public Safety"
#     LANDS = "Lands & Housing"
#     IMMIGRATION = "Immigration & Foreign Affairs"
#
#
# class ServiceProvider(str, PyEnum):
#     """
#     Official Kenyan Government Agencies (MDAs).
#     Used for 'Filter by Agency' and provider-specific landing pages.
#     """
#     KRA = "Kenya Revenue Authority"
#     NTSA = "National Transport and Safety Authority"
#     DCI = "Directorate of Criminal Investigations"
#     BRS = "Business Registration Service"
#     HELB = "Higher Education Loans Board"
#     SHA = "Social Health Authority"
#     IMMIGRATION = "Department of Immigration"
#     LANDS = "Ministry of Lands"
#     CRS = "Civil Registration Services"
#
#
# class OrderStatus(str, PyEnum):
#     """Standardized lifecycle of a service order."""
#     PENDING = "Pending"
#     PAID = "Paid"
#     IN_PROGRESS = "In Progress"
#     COMPLETED = "Completed"
#     CANCELLED = "Cancelled"
#
#
# # --- LINK TABLES (Many-to-Many) ---
#
# class ServiceBlogLink(SQLModel, table=True):
#     """
#     Junction table for Many-to-Many relationship between Services and BlogPosts.
#     Powers the 'Related Services' and 'Related Reading' sections for SEO.
#     """
#     service_id: UUID = Field(foreign_key="services.id", primary_key=True)
#     blog_id: UUID = Field(foreign_key="blog_posts.id", primary_key=True)
#
#
# # --- MIXINS ---
#
# class BaseMixin(SQLModel):
#     """
#     Standard audit and identity fields.
#     Uses server-side defaults for maximum performance and reliability.
#     """
#     id: UUID = Field(
#         default_factory=uuid4,
#         primary_key=True,
#         index=True,
#         sa_type=PG_UUID(as_uuid=True),
#         sa_column_kwargs={
#             "server_default": text("gen_random_uuid()"),
#             "nullable": False,
#         },
#     )
#     created_at: datetime = Field(
#         default_factory=lambda: datetime.now(timezone.utc),
#         sa_type=DateTime(timezone=True),
#         sa_column_kwargs={"server_default": func.now(), "nullable": False},
#     )
#     updated_at: datetime = Field(
#         default_factory=lambda: datetime.now(timezone.utc),
#         sa_type=DateTime(timezone=True),
#         sa_column_kwargs={
#             "server_default": func.now(),
#             "onupdate": func.now(),
#             "nullable": False,
#         },
#     )
#     deleted_at: Optional[datetime] = Field(
#         default=None,
#         sa_type=DateTime(timezone=True),
#         sa_column_kwargs={"nullable": True},
#     )
#
#
# # --- MODELS ---
#
# class User(BaseMixin, table=True):
#     __tablename__ = "users"
#     first_name: str = Field(alias="firstName")
#     second_name: str = Field(alias="secondName")
#     email: str = Field(unique=True, index=True)
#     phone_number: str = Field(alias="phoneNumber")
#     contact_method: str = Field(alias="contactMethod")
#
#     # Relationships
#     orders: List["Order"] = Relationship(back_populates="user")
#
#
# class Order(BaseMixin, table=True):
#     __tablename__ = "orders"
#     user_id: UUID = Field(foreign_key="users.id", index=True, alias="userId")
#     service_id: UUID = Field(foreign_key="services.id", index=True, alias="serviceId")
#     status: OrderStatus = Field(
#         default=OrderStatus.PENDING,
#         sa_column=Column(Enum(OrderStatus), nullable=False)
#     )
#
#     # Relationships
#     user: User = Relationship(back_populates="orders")
#     service: "Service" = Relationship(back_populates="orders")
#
#
# class Service(BaseMixin, table=True):
#     """
#     Represents a Service entity optimized for SEO rich results and Next.js ISR.
#     """
#     __tablename__ = "services"
#
#     # Add this to __table_args__ to define the GIN Trigram index
#     __table_args__ = (
#         Index(
#             "trgm_idx_service_name",
#             "name",
#             postgresql_using="gin",
#             postgresql_ops={"name": "gin_trgm_ops"}
#         ),
#     )
#
#     name: str = Field(index=True)
#     slug: str = Field(index=True, unique=True)  # Used for primary URL: /services/[slug]
#
#     # Provider updated to Enum for strict typing and better filtering
#     provider: ServiceProvider = Field(
#         sa_column=Column(Enum(ServiceProvider), index=True, nullable=False)
#     )
#
#     category: ServiceCategory = Field(
#         sa_column=Column(Enum(ServiceCategory), index=True, nullable=False)
#     )
#
#     # Sub-category remains a string as it varies significantly (e.g., "iTax", "TIMS", "Logbook")
#     sub_category: str = Field(alias="subCategory", index=True)
#
#     icon: str
#     description: str  # Main SEO body content
#
#     # Dedicated SEO Meta (CTR focused)
#     seo_title: str = Field(max_length=255, alias="seoTitle")
#     seo_description: str = Field(max_length=160, alias="seoDescription")
#
#     # Structured Data blocks (JSONB)
#     requirements: List[str] = Field(sa_column=Column(JSONB))  # Maps to HowTo or List schema
#     faqs: List[Dict[str, str]] = Field(sa_column=Column(JSONB))  # Maps to FAQPage schema
#     pricing: Dict[str, Any] = Field(sa_column=Column(JSONB))  # Maps to Offer schema
#
#     estimated_time: str = Field(alias="estimatedTime")
#     available: bool = Field(default=True, index=True)
#     published: bool = Field(default=False, index=True)
#
#     searchable: bool = Field(
#         default=True,
#         index=True,
#         description="Indicates if the service can appear in search results."
#
#     )
#
#     featured: bool = Field(
#         default=False,
#         index=True,
#         description="Indicates if the service is featured on the homepage or special listings."
#     )
#
#     popularity_score: Optional[float] = Field(
#         default=0.0,
#         index=True,
#         description="A computed score indicating the popularity of the service based on user interactions."
#     )
#
#     schema_type: Optional[str] = Field(
#         default="Service",
#         alias="schemaType",
#         description="Specifies the type of schema.org structured data to use for this service."
#     )
#
#     related_slugs: Optional[List[str]] = Field(
#         default=None,
#         sa_column=Column(JSONB),
#         alias="relatedSlugs",
#         description="List of slugs for related services to enhance SEO cross-linking."
#     )
#
#     # Relationships
#     orders: List["Order"] = Relationship(back_populates="service")
#     blogs: List["BlogPost"] = Relationship(
#         back_populates="services",
#         link_model=ServiceBlogLink
#     )
#
#
# class BlogPost(BaseMixin, table=True):
#     """
#     Editorial content model. Uses a foreign key for Authors to build authority (E-E-A-T).
#     """
#     __tablename__ = "blog_posts"
#
#     title: str
#     slug: str = Field(index=True, unique=True)
#     category: str  # "Guides" | "News" | "Taxes"
#     excerpt: str = Field(max_length=250)
#
#     # Relationship to Author (Source of Truth)
#     author_id: UUID = Field(foreign_key="authors.id", index=True)
#     author: "Authors" = Relationship(back_populates="posts")
#
#     # SEO & Visuals
#     image: Dict[str, str] = Field(sa_column=Column(JSONB))  # {url: "", alt: ""}
#     seo_title: str = Field(max_length=60, alias="seoTitle")
#     seo_description: str = Field(max_length=160, alias="seoDescription")
#
#     # Content & Semantic Data
#     content: Dict[str, Any] = Field(sa_column=Column(JSONB))  # Supports modular rich text
#     faqs: List[Dict[str, str]] = Field(sa_column=Column(JSONB))
#     tags: List[str] = Field(sa_column=Column(JSONB))
#
#     # Many-to-Many: Connects Blogs to the Services they explain
#     services: List["Service"] = Relationship(
#         back_populates="blogs",
#         link_model=ServiceBlogLink
#     )
#
#
# class Authors(BaseMixin, table=True):
#     """
#     Author profiles to satisfy Google's Experience/Expertise requirements.
#     """
#     __tablename__ = "authors"
#
#     name: str
#     bio: Optional[str] = None
#     profile_image: Optional[str] = Field(alias="profileImage")
#     email: Optional[str] = None
#     social_links: Optional[Dict[str, str]] = Field(
#         default=None, sa_column=Column(JSONB), alias="socialLinks"
#     )
#
#     # Back-reference for "More articles by this author"
#     posts: List["BlogPost"] = Relationship(back_populates="author")
#


from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from uuid import UUID, uuid4
from enum import Enum as PyEnum

from sqlalchemy import DateTime, func, text, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID as PG_UUID, JSONB
from sqlmodel import Field, SQLModel, Column, Relationship, Index

# --- DIALECT ADAPTATION ---
# This ensures SQLite (testing) uses JSON and Postgres (prod) uses JSONB
EffectiveJSON = JSON().with_variant(JSONB, "postgresql")


# --- ENUMS ---


class ServiceCategory(str, PyEnum):
    TRANSPORT = "Transport & Motoring"
    CIVIL_REG = "Civil Registration"
    TAXATION = "Taxation & KRA"
    BUSINESS = "Business & Industry"
    EDUCATION = "Education & Training"
    HEALTH = "Health Services"
    LEGAL = "Legal & Public Safety"
    LANDS = "Lands & Housing"
    IMMIGRATION = "Immigration & Foreign Affairs"


class ServiceProvider(str, PyEnum):
    KRA = "Kenya Revenue Authority"
    NTSA = "National Transport and Safety Authority"
    DCI = "Directorate of Criminal Investigations"
    BRS = "Business Registration Service"
    HELB = "Higher Education Loans Board"
    SHA = "Social Health Authority"
    IMMIGRATION = "Department of Immigration"
    LANDS = "Ministry of Lands"
    CRS = "Civil Registration Services"


class OrderStatus(str, PyEnum):
    PENDING = "Pending"
    PAID = "Paid"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


# --- LINK TABLES ---


class ServiceBlogLink(SQLModel, table=True):
    __tablename__ = "service_blog_links"
    service_id: UUID = Field(foreign_key="services.id", primary_key=True)
    blog_id: UUID = Field(foreign_key="blog_posts.id", primary_key=True)


# --- MIXINS ---


class BaseMixin(SQLModel):
    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True,
        index=True,
        sa_type=PG_UUID(as_uuid=True),
        sa_column_kwargs={
            # We use a lambda for server_default to handle Postgres specifically
            # without breaking the SQLite compiler during metadata creation.
            "server_default": text("gen_random_uuid()")
            if "postgresql" in str(EffectiveJSON)
            else None,
            "nullable": False,
        },
    )
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


# --- MODELS ---


class User(BaseMixin, table=True):
    __tablename__ = "users"
    first_name: str = Field(alias="firstName")
    second_name: str = Field(alias="secondName")
    email: str = Field(unique=True, index=True)
    phone_number: str = Field(alias="phoneNumber")
    contact_method: str = Field(alias="contactMethod")

    orders: List["Order"] = Relationship(back_populates="user")


class Order(BaseMixin, table=True):
    __tablename__ = "orders"
    user_id: UUID = Field(foreign_key="users.id", index=True, alias="userId")
    service_id: UUID = Field(foreign_key="services.id", index=True, alias="serviceId")
    status: OrderStatus = Field(
        default=OrderStatus.PENDING, sa_column=Column(Enum(OrderStatus), nullable=False)
    )

    user: User = Relationship(back_populates="orders")
    service: "Service" = Relationship(back_populates="orders")


class Service(BaseMixin, table=True):
    __tablename__ = "services"

    __table_args__ = (
        Index(
            "trgm_idx_service_name",
            "name",
            postgresql_using="gin",
            postgresql_ops={"name": "gin_trgm_ops"},
        ),
    )

    name: str = Field(index=True)
    slug: str = Field(index=True, unique=True)
    provider: ServiceProvider = Field(
        sa_column=Column(Enum(ServiceProvider), index=True, nullable=False)
    )
    category: ServiceCategory = Field(
        sa_column=Column(Enum(ServiceCategory), index=True, nullable=False)
    )
    sub_category: str = Field(alias="subCategory", index=True)
    icon: str
    description: str
    seo_title: str = Field(max_length=255, alias="seoTitle")
    seo_description: str = Field(max_length=160, alias="seoDescription")

    # Switched to EffectiveJSON for cross-dialect compatibility
    requirements: List[str] = Field(sa_column=Column(EffectiveJSON))
    faqs: List[Dict[str, str]] = Field(sa_column=Column(EffectiveJSON))
    pricing: Dict[str, Any] = Field(sa_column=Column(EffectiveJSON))

    estimated_time: str = Field(alias="estimatedTime")
    available: bool = Field(default=True, index=True)
    published: bool = Field(default=False, index=True)
    searchable: bool = Field(default=True, index=True)
    featured: bool = Field(default=False, index=True)
    popularity_score: Optional[float] = Field(default=0.0, index=True)
    schema_type: Optional[str] = Field(default="Service", alias="schemaType")

    related_slugs: Optional[List[str]] = Field(
        default=None, sa_column=Column(EffectiveJSON), alias="relatedSlugs"
    )

    orders: List["Order"] = Relationship(back_populates="service")
    blogs: List["BlogPost"] = Relationship(
        back_populates="services", link_model=ServiceBlogLink
    )


class BlogPost(BaseMixin, table=True):
    __tablename__ = "blog_posts"

    title: str
    slug: str = Field(index=True, unique=True)
    category: str
    excerpt: str = Field(max_length=250)

    author_id: UUID = Field(foreign_key="authors.id", index=True)
    author: "Authors" = Relationship(back_populates="posts")

    image: Dict[str, str] = Field(sa_column=Column(EffectiveJSON))
    seo_title: str = Field(max_length=60, alias="seoTitle")
    seo_description: str = Field(max_length=160, alias="seoDescription")
    content: Dict[str, Any] = Field(sa_column=Column(EffectiveJSON))
    faqs: List[Dict[str, str]] = Field(sa_column=Column(EffectiveJSON))
    tags: List[str] = Field(sa_column=Column(EffectiveJSON))

    services: List["Service"] = Relationship(
        back_populates="blogs", link_model=ServiceBlogLink
    )


class Authors(BaseMixin, table=True):
    __tablename__ = "authors"

    name: str
    bio: Optional[str] = None
    profile_image: Optional[str] = Field(alias="profileImage")
    email: Optional[str] = None
    social_links: Optional[Dict[str, str]] = Field(
        default=None, sa_column=Column(EffectiveJSON), alias="socialLinks"
    )

    posts: List["BlogPost"] = Relationship(back_populates="author")
