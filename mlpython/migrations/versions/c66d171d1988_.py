"""empty message

Revision ID: c66d171d1988
Revises: c0c91e8a8cef
Create Date: 2019-03-14 19:41:53.657208

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'c66d171d1988'
down_revision = 'c0c91e8a8cef'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_client_client_secret', table_name='client')
    op.drop_constraint('client_ibfk_1', 'client', type_='foreignkey')
    op.drop_column('client', 'is_confidential')
    op.drop_column('client', 'name')
    op.drop_column('client', 'description')
    op.drop_column('client', 'client_secret')
    op.drop_column('client', 'user_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('client', sa.Column('user_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    op.add_column('client', sa.Column('client_secret', mysql.VARCHAR(length=55), nullable=False))
    op.add_column('client', sa.Column('description', mysql.VARCHAR(length=400), nullable=True))
    op.add_column('client', sa.Column('name', mysql.VARCHAR(length=40), nullable=True))
    op.add_column('client', sa.Column('is_confidential', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True))
    op.create_foreign_key('client_ibfk_1', 'client', 'user', ['user_id'], ['id'])
    op.create_index('ix_client_client_secret', 'client', ['client_secret'], unique=True)
    # ### end Alembic commands ###