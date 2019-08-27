"""empty message

Revision ID: 701c03df6934
Revises: 583e746317ef
Create Date: 2019-08-22 23:22:12.510612

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '701c03df6934'
down_revision = '583e746317ef'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('actor', sa.Column('outputs', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('actor', 'outputs')
    # ### end Alembic commands ###