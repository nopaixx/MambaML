import os
from mlpython.app import celery
from ..projects import Project


class CodeRun():

    def __init__(str_code, box_id):
        self.str_code = str_code
        self.status = 'INIT'
        self.inputs = []
        self.outputs = []
        self.box_id = box_id
        
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
        print(json_wf)
    return None 
