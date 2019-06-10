"""empty message

Revision ID: 9892ef7aff16
Revises: 4fb1dbb77e88
Create Date: 2019-06-08 22:18:23.989462

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9892ef7aff16'
down_revision = '4fb1dbb77e88'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('actor', sa.Column('depen_code', sa.String(length=25000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('actor', 'depen_code')
    # ### end Alembic commands ###