from mlpython.app import db
from flask import request
from flask import jsonify 
from ..token import Token
import sys


class User(db.Model):
  
    id = db.Column(db.Integer, primary_key=True)
    pwd = db.Column(db.String(80))
    username = db.Column(db.String(50), unique=True)
    firstName = db.Column(db.String(30))
    lastName = db.Column(db.String(30))

    def serialize(self):
    	
    	model={}
    	model['username'] = self.username
    	model['firstName'] = self.firstName
    	model['lastName'] = self.lastName

    	return jsonify(model)

    def validate_password(self, password):
        # check if password is ok
        # TODO PASSWORD ENCRYPTION
        if self.pwd == password:
        	return True
        return False

    @classmethod
    def set_initial_data(cls):
        admin_user = cls.query.filter(cls.username=='admin').first()
        if admin_user is None:
            cls.create('admin','admin','admin user','admin lastname')
        return admin_user

    
    @classmethod
    def create(cls, pwd, username, firstname, lastname):
        model = cls()
        model.pwd = pwd
        model.username = username
        model.firstname = firstname
        model.lastname = lastname
        db.session.add(model)
        db.session.commit()
        return model

    # @provider.usergetter
    @staticmethod
    def get_user(username, password, client, request,
             *args, **kwargs):
        # client: current request client
        #if not client.has_password_credential_permission:
            #return None
        print(username, file=sys.stderr)
        user = User.get_user_by_username(username)
        if not user.validate_password(password):
            return None
        # parameter `request` is an OAuthlib Request object.
        # maybe you will need it somewhere
        return user

    @staticmethod
    def get_user_by_username(username):
        # alquemist query return user or return none
        print(db.session, file=sys.stderr)
        # query = db.session.query(User).filter(username = username)

        query = User.query.filter_by(username=username)
        print(query,file=sys.stderr)
        user = query.first()

        return user

    @staticmethod
    def get_authorized():
        """Returns the currently authorized user."""
        
        access_token = request.oauth.headers.get('Authorization').split(' ')[1]
        token = Token.query.filter_by(access_token=access_token).first()
        print(token.user,file=sys.stderr)
        return token.user
