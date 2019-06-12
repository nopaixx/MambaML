from mlpython.app import db
from flask import request
from flask import jsonify
from ..token import Token
from ..users import User
import sys
import json


class Actor(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(80))
    frontendVersion = db.Column(db.String(10))
    backendVersion = db.Column(db.String(10))
    python_code = db.Column(db.String(25000))
    depen_code = db.Column(db.String(25000))
    n_input_ports = db.Column(db.Integer())
    n_output_ports = db.Column(db.Integer())
   
    def serialized(self, xjson=True):
        model={
            "id":  self.id,
            "type": self.type,
            "frontendVersion": self.frontendVersion,
            "backendVersion": self.backendVersion,
            "python_code": self.python_code,
            "depen_code": self.depen_code,
            "n_input_ports": self.n_input_ports,
            "n_output_ports": self.n_output_ports
                }
#        model['id'] = self.id
#        model['type'] = self.type
#        model['frontendVersion'] = self.frontendVersion
#        model['backendVersion'] = self.backendVersion
#        model['python_code'] = self.python_code
#        model['dependencies_code'] = self.dependencies_code
#        model['n_input_ports'] = self.n_input_ports
#        model['n_output_ports'] = self.n_output_ports
        print(model, "EL MODELO!QQ")
        x = {
          "name": "John",
          "age": 30,
          "city": "New York"
        }
        return json.dumps(model)

    @classmethod
    def security_check(actor, userLogged, action):
        return True

    @classmethod
    def create(cls, type, frontendVersion, backendVersion,
              python_code, dependencies_code, n_input_ports, n_output_ports):

        model = cls()
        model.type = type
        model.frontendVersion = frontendVersion
        model.backendVersion = backendVersion
        model.python_code = python_code
        model.n_input_ports = n_input_ports
        model.n_output_ports = n_output_ports
        model.depen_code = dependencies_code
        db.session.add(model)
        db.session.commit()
        return model

    @classmethod
    def update(cls, model, type, frontendVersion, backendVersion,
              python_code, dependencies_code, n_input_ports, n_output_ports):

        model.type = type
        model.frontendVersion = frontendVersion
        model.backendVersion = backendVersion
        model.python_code = python_code
        model.depen_code = dependencies_code
        model.n_input_ports = n_input_ports
        model.n_output_ports = n_output_ports
#        db.session.add(model)
        db.session.commit()
        return model


    @classmethod
    def create_if_not_exist(cls, 
                            type, 
                            frontendVersion, 
                            backendVersion, 
                            python_code, 
                            dependencies_code, 
                            n_input_ports,
                            n_output_ports):
        
        actor = cls.query.filter(cls.type == type, 
                                 cls.frontendVersion==frontendVersion, 
                                 cls.backendVersion==backendVersion
                                 ).first()
        if actor is None:
            cls.create(type, frontendVersion, backendVersion, python_code,
                      dependencies_code, n_input_ports, n_output_ports)


    @classmethod
    def set_initial_data(cls):
        Actor.create_if_not_exist(
                'Python Module-Python Script',
                'V1',
                'V1',
                """def %ID(input_1=None, input_2=None, input_3=None, input_4=None, input_5=None):
    output_1 = None
    output_2 = None
    output_3 = None
    output_4 = None
    output_5 = None
    return output_1, output_2, output_3, output_4, output_5
                """,
                '',
                5,
                5
                )

        Actor.create_if_not_exist(
                'Data Transformation-Sample and Split-Basic Split Data',
                'V1',
                'V1',
                """def %ID(input1=None):
    left, right = train_test_split(
    input1, test_size=%ID_%P1, random_state=%ID_%P2)
    return left, right
                """,
                """import numpy as np
from sklearn.model_selection import train_test_split
                """,
                1,
                2)


#           'def %ID(input_1, input_2, input_3, input_4, input_5):\
#                    output_1 = None\
#                    output_2 = None\
#                    output_3 = None\
#                    output_4 = None\
#                    output_5 = None\
#                    return output_1, output_2, output_3, output_4, output_5\
#                '
