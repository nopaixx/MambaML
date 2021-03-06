"""empty message

Revision ID: 033ccd3f83ba
Revises: b90c5bbb8d89
Create Date: 2019-06-25 19:28:42.830104

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '033ccd3f83ba'
down_revision = 'b90c5bbb8d89'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('status__project',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.String(length=80), nullable=True),
    sa.Column('task', sa.String(length=80), nullable=True),
    sa.Column('status', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('status__project')
    # ### end Alembic commands ###
