from mlpython.app import db
from flask import request
from flask import jsonify
from ..token import Token
from ..users import User
import sys


class Project(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    json = db.Column(db.String(65000))
    frontendVersion = db.Column(db.String(10))
    backendVersion = db.Column(db.String(10))
    user_id = db.Column(
        db.Integer, db.ForeignKey('user.id')
    )
    user = db.relationship('User')


    def serialize(self):
        model={}
        model['name'] = self.name
        model['json'] = self.json
        model['user_id'] = self.user_id
        model['frontendVersion'] = self.frontendVersion
        model['backendVersion'] = self.backendVersion

        return jsonify(model)

    @classmethod
    def create(cls, name, json, user_id, frontendVersion, backendVersion):
        model = cls()
        model.name = name
        model.json = json
        model.user_id = user_id
        model.frontendVersion = frontendVersion
        model.backendVersion = backendVersion
        db.session.add(model)
        db.session.commit()
        return model

    @classmethod
    def update(cls, model, name, json, user_id, frontendVersion, backendVersion):
        
        model.name = name
        model.json = json
        model.user_id = user_id
        model.frontendVersion = frontendVersion
        model.backendVersion = backendVersion
#        db.session.add(model)
        db.session.commit()
        return model

    @classmethod
    def security_check(cls, project, userLogged, action):
        # TODO given action project and user return if can do
        return True


