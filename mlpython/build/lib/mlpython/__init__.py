from flask import Flask
#from flask.ext.sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
import mlpython.views
from mlpython.app import app
#from ..config import Config


if __name__ == '__main__':
    app.run()