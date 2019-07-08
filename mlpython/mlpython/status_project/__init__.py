from mlpython.app import db
from flask import request
from flask import jsonify
from ..token import Token
from ..users import User
import sys
import json
import boto3


class Status_Project(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.String(80))
    task = db.Column(db.String(80))
    status = db.Column(db.String(10000))
    error = db.Column(db.String(10000))

    @classmethod
    def create(cls, project_id, task, status):
        model=cls()
        model.project_id = project_id
        model.task = task
        model.status = status
        db.session.add(model)
        db.session.commit()

    def serialize():
        model={}
        model['id'] = self.id
        model['project_id'] = self.project_id
        model['task'] = self.task
        model['status'] = self.status
        model['error'] = self.error

        return model

