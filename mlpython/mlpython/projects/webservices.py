from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from . import Project
from ..users import User
from flask import request
import requests
import sys

@app.route('/projects/create', methods=['POST'])
@provider.require_oauth()
def create():
        userLogged = User.get_authorized()
        print(userLogged.username,"create project")
        if not userLogged:
                return '', 401
        #nothing to request
        # request.args.get('page', Query.DEFAULT_PAGE)
        name = request.data['name']
        json = request.data['json']
        frontendVersion = request.data['frontendVersion']
        backendVersion = request.data['backendVersion']
        project = Project.create(name, json, userLogged.id, 
                                frontendVersion, backendVersion)
        return project.serialize(), 200

@app.route('/projects/update', methods=['PUT', 'POST'])
@provider.require_oauth()
def update():
        userLogged = User.get_authorized()
        print(userLogged.username,"update project")
        if not userLogged:
                return '', 401
        #nothing to request
        id = request.data['id']
        project = Project.query().filterby(Project.id == id).first()
        if Project.security_check(project, userLogged, 'PUT'):
            name = request.data['name']
            json = request.data['json']
            frontendVersion = request.data['frontendVersion']
            backendVersion = request.data['backendVersion']

            upd_project = Project.update(project, name, json, 
                                         userLogged.id,
                                         frontendVersion, backendVersion)
            return upd_project.serialize(), 200

        return 'Forbidden', 403

@app.route('/projects/get', methods=['GET'])
@provider.require_oauth()
def get():
        userLogged = User.get_authorized()
        print(userLogged.username,"get project")
        if not userLogged:
                return '', 401
        #nothing to request
        id = request.data['id']
        project = Project.query().filterby(Project.id == id).first()        
        if project:
            if Project.security_check(project, userLogged, 'GET'):
                return project.serialize(), 200
            return 'Forbiddedn', 403

        return 'Not found', 404

@app.route('/projects/run', methods=['POST'])
@provider.require_oauth()
def run_project():
        userLogged = User.get_authorized()
        print(userLogged.username,"get project")
        if not userLogged:
                return '', 401
        id = request.data['id']
        project = Project.query().filterby(Project.id == id).first()

        if project:
            if Project.security_check(project, userLogged, 'RUN'):
                return 'TASK_ID', 200
            
            return 'Forbidden', 403
        return 'Not Found', 404

#@app.route('/projects/task_simulation', method=['POST'])
#@provider.requiere_oauth()
#def run_simul():
        #TODO ESTA FUNCION EJECTURA Y PARSEA EL JSON DEL PROYECT
#        project_id = request.args.get('id', None )

#        project = Project.
#        return None








