import os
from mlpython.app import celery

@celery.task
def add_together(x, y):
    return x + y


@celery.task
def run_str_code(inputs):
    global ret
    ret = []

    LOC = """
import pandas as pd
def funcion_cliente_str(num): 
    print(num[0])
    return num
real_input = []
for x in inputs:
    real_input.append(pd.read_json(x))
tmp_ret = funcion_cliente_str(real_input) 
for x in tmp_ret:
    ret.append(x.to_json())
"""
    exec(LOC)
    return ret
