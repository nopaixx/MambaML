from celery import Celery
import os
broker = os.environ['rabbitmq_ampq']
backend = os.environ['redis_backend']


app = Celery('tasks', broker=broker, backend=backend)


@app.task
def add(x, y):
    return x + y
