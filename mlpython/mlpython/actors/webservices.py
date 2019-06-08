from . import Actor
from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from . import Project
from ..users import User
import requests
import sys

@app.route('/actors/allactors', methods=['GET'])
@provider.require_oauth()
def allactors():
        userLogged = User.get_authorized()
        print(userLogged.username,"create project")
        if not userLogged:
                return '', 401
        frontendVersion = request.data['frontendVersion']
        backendVersion = request.data['backendVersion']
        actors = Actor.query.filter(Actor.frontendVersion==frontendVersion,
                                    Actor.backendVersion==backendVersion).all()
        actors_list=[]
        for actor in actors:
            actors_list.append(actor.serialized())
        return actors_list, 200
