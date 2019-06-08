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
