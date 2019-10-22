from flask_oauthlib.provider import OAuth2Provider
from flask_oauthlib.provider import OAuth2RequestValidator
from mlpython.app import app
from ..users import User
from ..client import Client
from ..token import Token
import sys

provider = OAuth2Provider()


class RequestValidator(OAuth2RequestValidator):
    def __init__(self):
        self._usergetter = User.get_user
        self._clientgetter = Client.get_client
        self._tokengetter = Token.bearer_token
        self._tokensetter = Token.save


provider.init_app(app)
provider._validator = RequestValidator()


@app.route('/token', methods=['POST','GET'])
@provider.token_handler
#@crossdomain(origin='*') 
def access_token(*args, **kwargs):
    return None
