from . import Actor
from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from ..projects import Project
from ..users import User
from flask import request
from flask import jsonify
import requests
import sys
import json


@app.route('/actors/allactors', methods=['GET'])
@provider.require_oauth()
def allactors():
        userLogged = User.get_authorized()
        print(userLogged.username,"create project")
        if not userLogged:
                return '', 401
        frontendVersion = request.args.get('frontendVersion')
        backendVersion = request.args.get('backendVersion')
        actors = Actor.query.filter(Actor.frontendVersion==frontendVersion,
                Actor.backendVersion==backendVersion).all()

        print("EL ACTOR", actors)
        # return actors.serialized(), 200
        actors_list = []
        print("INITTTTTTTTTTTTTTT")
        for actor in actors:
            actors_list.append(actor.serialized())
      #  print(actors_list, 'LISTOF ACTORS')
#        return '', 200
        return json.dumps(actors_list), 200


@app.route('/actors/create', methods=['POST'])
@provider.require_oauth()
def create_actor():
        userLogged = User.get_authorized()
        print(userLogged.username,"create project")
        if not userLogged:
                return '', 401
        #nothing to request
        # request.args.get('page', Query.DEFAULT_PAGE)

        type = request.form.get('type')
        python_code = request.form.get('python_code')
        dependencies_code = request.form.get('depen_code')

        frontendVersion = request.form.get('frontendVersion')
        backendVersion = request.form.get('backendVersion')

        n_input_ports = request.form.get('n_input_ports')
        n_output_ports = request.form.get('n_output_ports')

        friendly_name = request.form.get('friendly_name')
        parameters = request.form.get('parameters')
        outputs = request.form.get('outputs')
        actor = Actor.create( type, frontendVersion, backendVersion,
              python_code, dependencies_code, n_input_ports, n_output_ports,
              parameters, friendly_name, outputs)

        return actor.serialized(), 200


@app.route('/actors/update', methods=['PUT', 'POST'])
@provider.require_oauth()
def update_actor():
        userLogged = User.get_authorized()
        print(userLogged.username,"update project")
        if not userLogged:
                return '', 401
        #nothing to request
        id = request.form.get('id')

        actor= Actor.query.filter(Actor.id == id).first()
        if not actor:
            return 'Not Found', 404

        if Actor.security_check(actor, userLogged, 'PUT'):
            type = request.form.get('type')
            python_code = request.form.get('python_code')
            dependencies_code = request.form.get('depen_code')
    
            frontendVersion = request.form.get('frontendVersion')
            backendVersion = request.form.get('backendVersion')

            n_input_ports = request.form.get('n_input_ports')
            n_output_ports = request.form.get('n_output_ports')

            friendly_name = request.form.get('friendly_name')
            parameters = request.form.get('parameters')
            outputs = request.form.get('outputs')
            upd_actor= Actor.update(actor, type, frontendVersion, 
                    backendVersion, python_code, dependencies_code,
                    n_input_ports, n_output_ports, parameters, 
                    friendly_name, outputs)

            return json.dumps(upd_actor.serialized()), 200
#            return "OK", 200

        return 'Forbidden', 403







