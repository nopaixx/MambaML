"""empty message

Revision ID: 235b031d74a0
Revises: 701c03df6934
Create Date: 2019-10-20 15:29:50.806651

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '235b031d74a0'
down_revision = '701c03df6934'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('company', sa.Column('api_token', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('company', 'api_token')
    # ### end Alembic commands ###
