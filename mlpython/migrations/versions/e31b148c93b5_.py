"""empty message

Revision ID: e31b148c93b5
Revises: 048b0303f1d5
Create Date: 2019-06-17 19:10:35.001323

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e31b148c93b5'
down_revision = '048b0303f1d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('actor', sa.Column('friendly_name', sa.String(length=50), nullable=True))
    op.add_column('actor', sa.Column('parameters', sa.String(length=10000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('actor', 'parameters')
    op.drop_column('actor', 'friendly_name')
    # ### end Alembic commands ###
