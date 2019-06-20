from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from . import Project
from ..users import User
from flask import request
import requests
import sys
import json


@app.route('/cloud_manager/run_machine', methods=['POST'])
@provider.require_oauth()
def cloud_manager_run_machine():
        userLogged = User.get_authorized()
        if not userLogged:
                return '', 401
        #nothing to request
        # request.args.get('page', Query.DEFAULT_PAGE)
        project_id = request.form.get('project_id')
        # return '', 200
        project = Project.query.filter(Project.id == id).first()
        if project:
            project.run_machine()
            return 'OK', 200

        return 'Not Found', 404 


