import os
from mlpython.app import celery
from ..projects import Project
import json
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

def c_run_str_code(inputs, str_code):
    return 'RUNED'
    global ret
    ret = []
    print("START RUNNING CLIENT CODE")
    LOC = str_code
    print("END RUN CLIENT CODE")    
    exec(LOC)
    return ret


class InputPort():

    def __init__(self, name, numport, parentBox):
        self.name = name
        self.numport = numport
        self.parentBox = parentBox


class BoxCode():

    def __init__(self, str_code, box_id, n_inputs, n_outputs):
        self.str_code = str_code
        self.inputs = []
        self.outputs = []
        self.box_id = box_id
        self.status = 'INIT'

    def isRunned(self):
        return self.status == 'RUNNED'    

    def getStatus(self):
        return self.status
 
    def setStatus(self, status):
        self.status = status
        return self.status

    def run(self):
        print("Start running", self.box_id)
        if self.isRunned():
            return True
       
        self.setStatus('RUNNING')

        myinputs = []

        for i_input in self.inputs:
            i_input.parentBox.run()
            myinputs.append(i_input.parentBox.outputs[i_input.numport])

        out = c_run_str_code(myinputs, self.str_code)

        for p_out in out:
            self.outputs.append(p_out)

        self.setStatus('RUNNED')
        print("End running", self.box_id)
        return self.isRunned()


@celery.task
def run_celery_project(project_id):
    project = Project.query.filter(Project.id == project_id).first()
    print("START CELERY TASK")
    if project:
        json_wf = project.json
        d_json = json.loads(json_wf)
        print(type(d_json))
        print(d_json)
        allboxes = []
        for x in range(len(d_json['nodes'])):
            print(d_json['nodes']['node'+str(x+1)]['type'])
            box_type = d_json['nodes']['node'+str(x+1)]['type']
            if (box_type[0:7] == 'Dataset'):
                print("ES UN DATASET")
                node_name = d_json['nodes']['node'+str(x+1)]['id']
                # TODO OK for now special case for dataset!
                import numpy as np
                from sklearn.linear_model import LinearRegression
                X = np.array([[1, 1], [1, 2], [2, 2], [2, 3]])
                box = BoxCode("", node_name, 0, 1)
                box.setStatus('RUNNED')
                box.outputs.append(X)
                # for now dummy data on dataset
                allboxes.append(box)


            elif (box_type == ('Python Module-Python Script')):
                # O ES UN ENDPOINT
                node_name = d_json['nodes']['node'+str(x+1)]['id']
                python_code = d_json['nodes']['node'+str(x+1)]['properties']['payload']['code']
                n_inputs = d_json['nodes']['node'+str(x+1)]['properties']['payload']['ninput']
                n_outputs = d_json['nodes']['node'+str(x+1)]['properties']['payload']['nouts']
                box = BoxCode(python_code, node_name, n_inputs, n_outputs)
                allboxes.append(box)
                print(python_code, node_name, n_inputs, n_outputs)

        # TODO do it better
        def getboxby_name(box_name):
            for x in allboxes:
                if x.box_id == box_name:
                    return x
            return None
        # TODO do it better
        def getportid_to_index(portid):
            return portid.split('port')[1]

        for x in range(len(d_json['links'])):
            print(d_json['links']['link'+str(x+1)])
            orig_box_id = d_json['links']['link'+str(x+1)]['from']['nodeId']
            orig_input_port = d_json['links']['link'+str(x+1)]['from']['portId']
            
            dest_box_id = d_json['links']['link'+str(x+1)]['to']['nodeId']
            dest_input_port = d_json['links']['link'+str(x+1)]['to']['portId']

            # need locate dest_box
            dest_box = getboxby_name(dest_box_id)
            dest_id = getportid_to_index(dest_input_port)

            # need locate orig_box
            orig_box = getboxby_name(orig_box_id)
            orig_id = getportid_to_index(orig_input_port)
            
            input_port = InputPort(orig_input_port, int(orig_id)-1, orig_box)
            dest_box.inputs.append(input_port)


        # now select one untrained box and train until allboxes trained
        # TODO IN random way
        pendingTrain = True
        while pendingTrain:
            pendingTrain=False
            for x in allboxes:
                if x.isRunned()==False:
                    x.run()
                    pendingTrain=True

            print("BOX_ID-->",box_id)
        print("ALLBOXES TRAINED --->", allboxes)
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