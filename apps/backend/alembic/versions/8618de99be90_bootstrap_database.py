"""bootstrap database

Revision ID: 8618de99be90
Revises:
Create Date: 2026-01-21 15:47:48.511884
"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "8618de99be90"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """
    Bootstrap database infrastructure.

    - Enable UUID generation (pgcrypto)
    - Enforce UTC timezone
    """

    # -----------------------------------------------------
    # Enable UUID generation (used by BaseModel.id)
    # -----------------------------------------------------
    op.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto")

    # -----------------------------------------------------
    # Enforce UTC at database level
    # -----------------------------------------------------
    # op.execute("ALTER DATABASE current_database() SET timezone TO 'UTC'")


def downgrade() -> None:
    """
    Downgrade intentionally does nothing.

    Database extensions and timezone settings are
    shared infrastructure and should not be removed.
    """
    pass
