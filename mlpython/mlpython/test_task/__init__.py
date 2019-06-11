from ..celery_tasks.tasks import add_together
from ..celery_tasks.tasks import run_str_code
from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from ..users import User
from flask import request
from celery import chain
from celery import group
import pandas as pd
import numpy as np
import requests
import sys

@app.route('/test_task_add', methods=['GET'])
def task_add():
    data = np.array([['','Col1','Col2'],
                ['Row1',1,2],
                ['Row2',3,4]])

    send=pd.DataFrame(data=data[1:,1:],
                      index=data[1:,0],
                      columns=data[0,1:])
    lista = []
    lista.append(send.to_json())
    lista.append(send.to_json())
#    result = chain(run_str_code.s(lista), run_str_code.s(), run_str_code.s())()
    enlinea1 = chain(run_str_code.s(lista), run_str_code.s(), run_str_code.s())
    enlinea2 = chain(run_str_code.s(lista), run_str_code.s(), run_str_code.s())
    group1 = group([enlinea1, enlinea2])

    enlinea3 = chain(run_str_code.s(lista), run_str_code.s(), run_str_code.s())
    enlinea4 = chain(run_str_code.s(lista), run_str_code.s(), run_str_code.s())
    group2 = group([enlinea3, enlinea3])

#    result = run_str_code.delay(23, 42)
    # result.wait()
    while not result.ready():
        print("NOT READEY")
        print(result)

    return  '', 200
