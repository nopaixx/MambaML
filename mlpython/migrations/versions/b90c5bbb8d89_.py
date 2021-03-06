"""empty message

Revision ID: b90c5bbb8d89
Revises: 9a956aa63d1f
Create Date: 2019-06-24 18:35:21.092766

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b90c5bbb8d89'
down_revision = '9a956aa63d1f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('project', sa.Column('cloud', sa.String(length=100), nullable=True))
    op.add_column('project', sa.Column('machine_type', sa.String(length=100), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('project', 'machine_type')
    op.drop_column('project', 'cloud')
    # ### end Alembic commands ###
