from mlpython.app import db
import sys


class User(db.Model):
  
    id = db.Column(db.Integer, primary_key=True)
    pwd = db.Column(db.String(80))
    username = db.Column(db.String(50), unique=True)
    firstName = db.Column(db.String(30))
    lastName = db.Column(db.String(30))

    def validatie_password(self, password):
        # check if password is ok
        # TODO PASSWORD ENCRYPTION
        if self.password == password:
        	return True
        return False

    # @provider.usergetter
    @classmethod
    def get_user(username, password, client, request,
             *args, **kwargs):
        # client: current request client
        #if not client.has_password_credential_permission:
            #return None
        print("username", file=sys.stderr)
        user = User.get_user_by_username(username)
        if not user.validate_password(password):
            return None
        # parameter `request` is an OAuthlib Request object.
        # maybe you will need it somewhere
        return user

    @classmethod
    def get_user_by_username(username):
        # alquemist query return user or return none
        print("HOLA",file=sys.stderr)
        user = User.filter(User.username == username).first()

        return user
