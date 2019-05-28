import os
from mlpython.config import DevelopmentConfig
from mlpython.client import Client
from mlpython.users import User
import mlpython.client as CLI
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from mlpython.app import app, db


app.config.from_object(DevelopmentConfig)

if __name__ == '__main__':
   Client.set_client()
   User.set_initial_data()

