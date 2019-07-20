"""empty message

Revision ID: 583e746317ef
Revises: 607affd18938
Create Date: 2019-07-09 22:46:17.363031

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '583e746317ef'
down_revision = '607affd18938'
branch_labels = None
depends_on = None


def upgrade():
    op.execute('ALTER TABLE status__project ALTER COLUMN project_id TYPE INTEGER USING project_id::integer')
    #op.alter_column('status__project', 'project_id',
    #       existing_type=sa.String(80),
    #       type_=sa.Integer(),
    #       existing_nullable=True)

    pass


def downgrade():
    pass
