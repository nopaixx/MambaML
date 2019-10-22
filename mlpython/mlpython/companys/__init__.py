from mlpython.app import db
from flask import request
from flask import jsonify
from ..token import Token
from ..users import User
import sys
import json


class Company(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    legal_name = db.Column(db.String(280))
    comercial_name = db.Column(db.String(280))
    logo = db.Column(db.String(1000))
    cif = db.Column(db.String(50))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(10))
    admin_name = db.Column(db.String(50))
    aws_key = db.Column(db.String(255))
    aws_secret = db.Column(db.String(255))
    api_token = db.Column(db.String())

    def serialize(self):
        model={}
        model['id'] = self.id
        model['legal_name'] = self.legal_name
        model['comercial_name'] = self.comercial_name
        model['logo'] = self.logo
        model['cif'] = self.cif
        model['phone'] = self.phone
        model['email'] = self.email
        model['admin_name'] = self.admin_name
        model['api_token'] = self.api_token

        return jsonify(model)

    @classmethod
    def create(cls, legal_name, comercial_name, 
               logo, cif, phone, email, admin_name, aws_key,
               aws_secret):
        model = cls()
        model.legal_name = legal_name
        model.comercial_name = comercial_name
        model.logo = logo
        model.cif = cif
        model.phone = phone
        model.email = email
        model.admin_name = admin_name
        model.aws_key = aws_key
        model.aws_secret = aws_secret
        model.api_token = 'API_LONG_TOKEN_123456789'
        db.session.add(model)
        db.session.commit()
        return model

    @classmethod
    def update(cls, model, legal_name, comercial_name, 
             logo, cif, phone, email, admin_name):

        model.legal_name = legal_name
        model.comercial_name = comercial_name
        model.logo = logo
        model.cif = cif
        model.phone = phone
        model.email = email
        model.admin_name = admin_name
        db.session.commit()
        return model

    @classmethod
    def security_check(cls, company, userLogged, action):
        # TODO given action project and user return if can do
        return True

    @classmethod
    def set_initial_data(cls):
        com = cls.query.filter(cls.cif =='CIF').first()
        ret = None
        if com is None:
            ret = cls.create('Demo legal name', 'Demo comercial name',
                             'http://logo.jpg', 'CIF', '666666 phone', 
                             'aaa@aaa.es', 'Nombre admin',
                              'AKIAZ5AL7LOHLBOLNV44',
                              'jKULMjOzJ91rlXb/5R3hLr2MxJStH4zxKIWR/xiq')
        return ret
