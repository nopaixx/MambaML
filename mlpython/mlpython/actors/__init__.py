from mlpython.app import db
from flask import request
from flask import jsonify
from ..token import Token
from ..users import User
import sys
import json


class Actor(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    friendly_name = db.Column(db.String(255))
    type = db.Column(db.String(80))
    frontendVersion = db.Column(db.String(10))
    backendVersion = db.Column(db.String(10))
    python_code = db.Column(db.String(25000))
    depen_code = db.Column(db.String(25000))
    n_input_ports = db.Column(db.Integer())
    n_output_ports = db.Column(db.Integer())
    parameters = db.Column(db.String(25000))

    def serialized(self, xjson=True):
        model={
            "id":  self.id,
            "friendly_name": self.friendly_name,
            "type": self.type,
            "frontendVersion": self.frontendVersion,
            "backendVersion": self.backendVersion,
            "python_code": self.python_code,
            "depen_code": self.depen_code,
            "n_input_ports": self.n_input_ports,
            "n_output_ports": self.n_output_ports,
            "parameters": self.parameters
                }
        return json.dumps(model)

    @classmethod
    def security_check(cls, actor, userLogged, action):
        return True

    @classmethod
    def create(cls, type, frontendVersion, backendVersion,
              python_code, dependencies_code, n_input_ports, n_output_ports,
              parameters, friendly_name):

        model = cls()
        model.type = type
        model.frontendVersion = frontendVersion
        model.backendVersion = backendVersion
        model.python_code = python_code
        model.n_input_ports = n_input_ports
        model.n_output_ports = n_output_ports
        model.depen_code = dependencies_code
        model.parameters = parameters
        model.friendly_name = friendly_name
        db.session.add(model)
        db.session.commit()
        return model

    @classmethod
    def update(cls, model, type, frontendVersion, backendVersion,
              python_code, dependencies_code, n_input_ports, n_output_ports,
              parameters, friendly_name):

        model.type = type
        model.frontendVersion = frontendVersion
        model.backendVersion = backendVersion
        model.python_code = python_code
        model.depen_code = dependencies_code
        model.n_input_ports = n_input_ports
        model.n_output_ports = n_output_ports
        model.parameters = parameters
        model.friendly_name = friendly_name
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
                            n_output_ports, 
                            parameters,
                            friendly_name):
        
        actor = cls.query.filter(cls.friendly_name == friendly_name, 
                                 cls.frontendVersion==frontendVersion, 
                                 cls.backendVersion==backendVersion
                                 ).first()
        if actor is None:
            cls.create(type, frontendVersion, backendVersion, python_code,
                      dependencies_code, n_input_ports, n_output_ports, parameters,
                      friendly_name)


    @classmethod
    def set_initial_data(cls):
        Actor.create_if_not_exist(
                'Python Script', #TYPE Python Script o DataSet por ahora
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
                5,
                '{}', #parameter JSON
                'Python Module-Python Script' # friendlyname-> Categoria-subcategorya-subcategory-nombrecaja
                )

        Actor.create_if_not_exist(
                'Python Script',
                'V1',
                'V1',
                """def %ID(input1=None):
    left, right = train_test_split(
    input1, test_size=:PARAM1, random_state=:PARAM2)
    return left, right
                """,
                """import numpy as np
from sklearn.model_selection import train_test_split
                """,
                1,
                2,
                """[{param_name:':PARAM1',
                   param_friend_name: 'test_split',
                   param_value: 0.1,
                   param_type: float,
                   param_list_values: "",
                   param_rec: True,
                   param_help: 'Esta parametros indica tal....',
                   param_url: 'https://www.google.com?q=test_split sklearn'
                   },
                   {
                   param_name:':PARAM2',
                   param_friend_name: 'Random State',
                   param_value: 123,
                   param_type: int,
                   param_list_values: "",
                   param_rec: True
                   param_help:'Random reproducible state'
                   param_url: 'https://www.google.com?q=random state sklearn'
                   }
                   ]""",
                'Tratamiento de Datos-Manipulacion Filas-Split')


#           'def %ID(input_1, input_2, input_3, input_4, input_5):\
#                    output_1 = None\
#                    output_2 = None\
#                    output_3 = None\
#                    output_4 = None\
#                    output_5 = None\
#                    return output_1, output_2, output_3, output_4, output_5\
#                '
