from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from ..config import DevelopmentConfig
from flask_cors import CORS


app = Flask(__name__)
CORS(app, intercept_exceptions=False)

app.config.from_object(DevelopmentConfig)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
