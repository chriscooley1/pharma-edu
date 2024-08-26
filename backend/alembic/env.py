from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context
from decouple import config as decouple_config  # Renaming to avoid confusion
from models import SQLModel  # Make sure this import points to your actual models

# Load the DATABASE_URL from the .env file using decouple
DATABASE_URL = decouple_config("DATABASE_URL")

# This is the Alembic Config object, which provides access to the values within the .ini file in use.
alembic_config = context.config
alembic_config.set_main_option("sqlalchemy.url", DATABASE_URL)

# Interpret the config file for Python logging.
if alembic_config.config_file_name is not None:
    fileConfig(alembic_config.config_file_name)

# Add your model's MetaData object here for 'autogenerate' support
target_metadata = SQLModel.metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL and not an Engine, though an Engine is acceptable here as well.
    By skipping the Engine creation, we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the script output.
    """
    url = alembic_config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine and associate a connection with the context.
    """
    connectable = engine_from_config(
        alembic_config.get_section(alembic_config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
