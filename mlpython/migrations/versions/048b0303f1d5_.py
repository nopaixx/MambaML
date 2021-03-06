"""empty message

Revision ID: 048b0303f1d5
Revises: 879b7af95652
Create Date: 2019-06-12 00:43:10.813076

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '048b0303f1d5'
down_revision = '879b7af95652'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('company_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'user', 'company', ['company_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_column('user', 'company_id')
    # ### end Alembic commands ###
