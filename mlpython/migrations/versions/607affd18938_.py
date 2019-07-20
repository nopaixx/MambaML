"""empty message

Revision ID: 607affd18938
Revises: 9f2dade7275f
Create Date: 2019-07-08 19:25:21.513170

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '607affd18938'
down_revision = '9f2dade7275f'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('status__project', 'status',
           # existing_type=sa.VARCHAR(length=10),
           type_=sa.String(length=10000),
           existing_nullable=True)
    pass


def downgrade():
    pass
