from flask import Flask
#from flask.ext.sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
import mlpython.views
from mlpython.app import app
from .client import Client
from .users import User
from .token import Token


if __name__ == '__main__':
    app.run()
