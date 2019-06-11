from ..celery_tasks.tasks import add_together
from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from ..users import User
from flask import request
import requests
import sys

@app.route('/test_task_add', methods=['GET'])
def task_add():
    result = add_together.delay(23, 42)
    # result.wait()
    while not result.ready():
        print("NOT READEY")
        print(result)

    return  '', 200
