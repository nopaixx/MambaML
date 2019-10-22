from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from . import Project
from ..users import User
from flask import request
import requests
import sys
import json
from ..status_project import Status_Project


@app.route('/projects/create', methods=['POST'])
@provider.require_oauth()
def create_project():
        userLogged = User.get_authorized()
        print(userLogged.username,"create project")
        if not userLogged:
                return '', 401
        #nothing to request
        # request.args.get('page', Query.DEFAULT_PAGE)
        name = request.form.get('name')
        i_json = request.form.get('json')
        frontendVersion = request.form.get('frontendVersion')
        backendVersion = request.form.get('backendVersion')
        # return '', 200
        project = Project.create(name, i_json, userLogged.id, 
                                 frontendVersion, backendVersion)
        return json.dumps(project.serialize()), 200

@app.route('/projects/update', methods=['PUT', 'POST'])
@provider.require_oauth()
def update_project():
        userLogged = User.get_authorized()
        print(userLogged.username,"update project")
        if not userLogged:
                return '', 401
        #nothing to request
        id = request.form.get('id')
        print("IDDDDDDDDDDDDD", id)
        project = Project.query.filter(Project.id == id).first()
        if not project:
            return 'Not Found', 404
        if Project.security_check(project, userLogged, 'PUT'):
            name = request.form.get('name')
            i_json = request.form.get('json')
            frontendVersion = request.form.get('frontendVersion')
            backendVersion = request.form.get('backendVersion')

            upd_project = Project.update(project, name, i_json, 
                                         userLogged.id,
                                         frontendVersion, backendVersion)
            
            return json.dumps(upd_project.serialize()), 200

        return 'Forbidden', 403




@app.route('/projects/get', methods=['GET'])
@provider.require_oauth()
def get_project():
        userLogged = User.get_authorized()
        print(userLogged.username,"get project")
        if not userLogged:
                return '', 401
        #nothing to request
        print(request.args)
        print(request.data)
        id = request.args['id']
        project = Project.query.filter(Project.id == id).first()        
        if project:
            if Project.security_check(project, userLogged, 'GET'):
                return json.dumps(project.serialize()), 200
            return 'Forbiddedn', 403

        return 'Not found', 404


@app.route('/projects/getall', methods=['GET'])
@provider.require_oauth()
def get_allproject():
        userLogged = User.get_authorized()
        if not userLogged:
                return '', 401

        projects = Project.query.filter(Project.user_id == userLogged.id).all()

        projects_list = []
        for project in projects:
            projects_list.append(project.serialize())
      #  print(actors_list, 'LISTOF ACTORS')
#        return '', 200
        return json.dumps(projects_list), 200


@app.route('/projects/run', methods=['POST'])
@provider.require_oauth()
def run_project():
 
        userLogged = User.get_authorized()
        print(userLogged.username,"get project")
        if not userLogged:
            return '', 401
        id = request.form.get('id')
        project = Project.query.filter(Project.id == id).first()

        if project:
            if Project.security_check(project, userLogged, 'RUN'):
                return 'TASK_ID', 200
            
            return 'Forbidden', 403
        return 'Not Found', 404

@app.route('/projects/run_simul', methods=['GET'])
# @provider.require_oauth()
def run_simul():
        # userLogged = User.get_authorized()
        # print(userLogged.username,"get project")
        # if not userLogged:
        #        return '', 401
        id = request.args.get('id')
        project = Project.query.filter(Project.id == id).first()
        # if task is NOT informed run all
        task = request.args.get('task_id','ALL') 
        if project:
            # if Project.security_check(project, userLogged, 'RUN'):
            if True:
                project.run(task)
                return 'OK' , 200

            return 'Forbidden', 403
        return 'Not Found', 404

@app.route('/projects/get_status', methods=['GET'])
def get_status_project():
    #improve this function this function return a status for each box
        id = request.args.get('id')
        project_stat = Status_Project.query.filter(Status_Project.project_id == id).first()
        if project_stat:
            return json.dumps(project_stat.serialize()), 200
            # if project.status == 'PENDING':
            #    return json.dumps({'status':'PENDING',
            #            'task': project.task}), 200
            # else:
            #    return json.dumps({'status':project.status,
            #                       'error': project.error}), 200
        else:
            return json.dumps({'status':'NONE'}),200

@app.route('/projects/set_status', methods=['GET'])
def set_status_projects():
    id = request.args.get('id')
    data = request.args.get('data', None)
    stat = request.args.get('stat')
    error = request.args.get('error', None)
    task = request.args.get('task', None)

    project = Project.query.filter(Project.id == id).first()

    print("SET STATUS--------->", stat)
    if project:
        if  task is not None:
            # update particular task status
            project.update_task_status(task, stat)
        else:
            # update global project status
            project.update_status(data, stat, error)

    return 'OK', 200


@app.route('/projects/get_internal', methods=['GET'])
def get_project_internal():
        print(request.args)
        print(request.data)
        id = request.args['id']
        project = Project.query.filter(Project.id == id).first()
        if project:
            return json.dumps(project.serialize()), 200
            # return 'Forbiddedn', 403

        return 'Not found', 404


@app.route('/projects/get_endpoint', methods=['GET'])
def get_endpoint():
    userLogged = User.get_authorized()
    return userLogged.company.api_token, 200


@app.route('/projects/predict', methods=['GET'])
def predict_model():
    long_token = request.args.get('token')
    project_id = request.args.get('project_id')
    box = request.args.get('box')
    project_id = str(69)
    box = '2bbd5b59-2635-4e34-b3cc-3f2e15d86af5'
    from .runcode import run_celery_project
    from .runcode import getOutput
    #    def run_celery_project(allboxes, project_id, task, host, saver_host):
    response = True
    allboxes = None
    allboxes = run_celery_project(allboxes, project_id, box, 'http://127.0.0.1:8081', '127.0.0.1', response)
    print(allboxes, file=sys.stderr)
    ret = getOutput(allboxes, box, 0)

    return ret, 200

    # necessitamso leer el proyecto
    # necessitamos cargar las cajas
    # necessitamos buscar la caja de predecir
    # necesstiamos simplemente hacer un run
