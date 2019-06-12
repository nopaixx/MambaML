from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from . import Project
from ..users import User
from flask import request
import requests
import sys
import json


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
        json = request.form.get('json')
        frontendVersion = request.form.get('frontendVersion')
        backendVersion = request.form.get('backendVersion')
        project = Project.create(name, json, userLogged.id, 
                                frontendVersion, backendVersion)
        return project.serialize(), 200

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
            json = request.form.get('json')
            frontendVersion = request.form.get('frontendVersion')
            backendVersion = request.form.get('backendVersion')

            upd_project = Project.update(project, name, json, 
                                         userLogged.id,
                                         frontendVersion, backendVersion)
            return upd_project.serialize(), 200

        return 'Forbidden', 403

@app.route('/projects/get', methods=['GET'])
@provider.require_oauth()
def get_project():
        userLogged = User.get_authorized()
        print(userLogged.username,"get project")
        if not userLogged:
                return '', 401
        #nothing to request
        id = request.form.get('id')
        project = Project.query.filter(Project.id == id).first()        
        if project:
            if Project.security_check(project, userLogged, 'GET'):
                return project.serialize(), 200
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
@provider.require_oauth()
def run_simul():
        userLogged = User.get_authorized()
        print(userLogged.username,"get project")
        if not userLogged:
                return '', 401
        id = request.form.get('id')
        project = Project.query.filter(Project.id == id).first()

        if project:
            if Project.security_check(project, userLogged, 'RUN'):
                project.run()
                return project.serialize, 200

            return 'Forbidden', 403
        return 'Not Found', 404


