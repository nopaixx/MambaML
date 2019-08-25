from mlpython.app import app, db
from flask_restful import abort, Resource
from flask import request
from ..config import Config
import requests
import sys
import json


@app.route('/predict', methods=['GET'])
def predict():
        predict_request = {
                'auth':'TOKENGENERATEDFROMODEL23123123123',
                'data':{
                    'campo1':'valor1',
                    'campo2':'valor2'
                    }
                }

        #nothing to request
        # request.args.get('page', Query.DEFAULT_PAGE)
        return json.dumps(project.serialize()), 200

