from celery import Celery
import os
broker = os.environ['rabbitmq_ampq']
backend = os.environ['redis_backend']


app = Celery('tasks', broker=broker, backend=backend)
