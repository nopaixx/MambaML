import os
from mlpython.app import celery
from ..projects import Project
import json

class CodeRun():

    def __init__(str_code, box_id):
        self.str_code = str_code
        self.status = 'INIT'
        self.inputs = []
        self.outputs = []
        self.box_id = box_id
    def runed():
        return False
    def run(inputs):
        self.status = 'RUN'

    def get_outputs():
        return self.outputs

@celery.task
def run_celery_project(project_id):
    project = Project.query.filter(Project.id == project_id).first()
    print("START CELERY TASK")
    if project:
        json_wf = project.json
        d_json = json.loads(json_wf)
        print(type(d_json))
        print(d_json)

        for x in range(len(d_json['nodes'])):
            print(d_json['nodes']['node'+str(x+1)]['type'])
            box_type = d_json['nodes']['node'+str(x+1)]['type']
            if (box_type[0:7] == 'Dataset'):
                print("ES UN DATASET")
            elif (box_type == ('Python Module-Python Script')):
                # O ES UN ENDPOINT
                node_name = d_json['nodes']['node'+str(x+1)]['properties']['payload']['id']
                python_code = d_json['nodes']['node'+str(x+1)]['properties']['payload']['code']
                n_inputs = d_json['nodes']['node'+str(x+1)]['properties']['payload']['ninput']
                n_outpus = d_json['nodes']['node'+str(x+1)]['properties']['payload']['nouts']
                print(python_code, node_name, n_inputs, n_outputs)
    return None


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
