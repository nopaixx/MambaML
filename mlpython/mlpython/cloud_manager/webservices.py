from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from ..projects import Project
from ..users import User
from flask import request
import requests
import sys
import json


@app.route('/cloud_manager/run_machine', methods=['POST','GET'])
# @provider.require_oauth()
def cloud_manager_run_machine():
        # userLogged = User.get_authorized()
        # if not userLogged:
        #        return '', 401
        #nothing to request
        # request.args.get('page', Query.DEFAULT_PAGE)
        project_id = request.args.get('project_id')
        machine_type = request.args.get('machine_type')
        cloud = request.args.get('cloud') #aws, gcc, azure
        print(project_id)
        # return '', 200
        project = Project.query.filter(Project.id == project_id).first()
        print(project)
        if project:
            project.run_machine(machine_type, cloud)
            return 'OK', 200

        return 'Not Found', 404 

@app.route('/cloud_manager/terminate_machine', methods=['POST','GET'])
# @provider.require_oauth()
def cloud_manager_terminate_machine():
        # userLogged = User.get_authorized()
        # if not userLogged:
        #        return '', 401
        #nothing to request
        # request.args.get('page', Query.DEFAULT_PAGE)
        project_id = request.args.get('project_id')
        print(project_id)
        # return '', 200
        project = Project.query.filter(Project.id == project_id).first()
        print(project)
        if project:
            project.terminate_machine()
            return 'OK', 200

        return 'Not Found', 404


@app.route('/cloud_manager/hibernate_machine', methods=['POST','GET'])
# @provider.require_oauth()
def cloud_manager_hibernate_machine():
        # userLogged = User.get_authorized()
        # if not userLogged:
        #        return '', 401
        #nothing to request
        # request.args.get('page', Query.DEFAULT_PAGE)
        project_id = request.args.get('project_id')
        print(project_id)
        # return '', 200
        project = Project.query.filter(Project.id == project_id).first()
        print(project)
        if project:
            project.hibernate_machine()
            return 'OK', 200

        return 'Not Found', 404


