from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from ..config import DevelopmentConfig
from flask_cors import CORS
from ..celery_tasks import make_celery
import os

app = Flask(__name__)
CORS(app, intercept_exceptions=False,  resources={r"/*": {"origins": "*"}})
app.config.from_object(DevelopmentConfig)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

broker = os.environ['rabbitmq_ampq']
backend = os.environ['redis_backend']

app.config.update(
    CELERY_BROKER_URL=broker,
    CELERY_RESULT_BACKEND=backend
)
celery = make_celery(app)

