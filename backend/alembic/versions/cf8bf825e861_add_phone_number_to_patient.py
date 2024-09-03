"""Add phone_number to patient

Revision ID: cf8bf825e861
Revises: f6a5beb15e39
Create Date: 2024-08-29 10:24:13.417897

"""
from typing import Sequence

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'cf8bf825e861'
down_revision: str | None = 'f6a5beb15e39'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('patient', sa.Column('phone_number', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    op.alter_column('rxitem', 'expiration',
               existing_type=sa.DATE(),
               nullable=False)
    op.drop_column('rxitem', 'drug_class')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('rxitem', sa.Column('drug_class', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.alter_column('rxitem', 'expiration',
               existing_type=sa.DATE(),
               nullable=True)
    op.drop_column('patient', 'phone_number')
    # ### end Alembic commands ###