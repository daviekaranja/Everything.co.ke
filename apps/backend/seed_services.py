from sqlmodel import Session, create_engine, select

from app.core.config import settings
from app.lib.db.models import Service  # Ensure these are imported from your project

# The list we built together
from app.lib.data import services


# Replace with your actual database URL
DATABASE_URL = settings.database_url
engine = create_engine(DATABASE_URL)

#
# def seed_services():
#     with Session(engine) as session:
#         print(f"🚀 Starting seed: Processing {len(services)} services...")
#
#         for item in services:
#             # Check if service exists by slug (our unique SEO key)
#             statement = select(Service).where(Service.slug == item["slug"])
#             existing_service = session.exec(statement).first()
#
#             if existing_service:
#                 # Update existing record with the latest SEO data
#                 print(f"🔄 Updating: {item['name']}")
#                 for key, value in item.items():
#                     setattr(existing_service, key, value)
#             else:
#                 # Insert new record
#                 print(f"✨ Adding New: {item['name']}")
#                 new_service = Service.model_validate(item)
#                 session.add(new_service)
#
#         session.commit()
#         print("✅ Seeding complete!")


def seed_services():
    with Session(engine) as session:
        print(f"🚀 Starting seed: Processing {len(services)} services...")

        for item in services:
            try:
                # Check if service exists by slug
                statement = select(Service).where(Service.slug == item["slug"])
                existing_service = session.exec(statement).first()

                if existing_service:
                    print(f"🔄 Updating: {item['name']}")
                    for key, value in item.items():
                        # We use a helper to map camelCase keys to snake_case if necessary
                        # but setattr usually works fine if the model is configured right
                        setattr(existing_service, key, value)
                else:
                    print(f"✨ Adding New: {item['name']}")
                    # FIX: Use unpacking instead of model_validate
                    new_service = Service(**item)
                    session.add(new_service)

                session.commit()  # Commit per-item so one failure doesn't roll back everything

            except Exception as e:
                session.rollback()
                print(f"❌ Failed to seed '{item.get('name')}': {e}")
                continue  # Skip the failing one and move to the next

        print("✅ Seeding process finished!")


if __name__ == "__main__":
    seed_services()
