import os
from mlpython.app import celery

@celery.task
def add_together(x, y):
    return x + y
