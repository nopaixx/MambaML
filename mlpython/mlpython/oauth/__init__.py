from flask_oauthlib.provider import OAuth2Provider
from flask_oauthlib.provider import OAuth2RequestValidator
from users import User


provider = OAuth2Provider()


class RequestValidator(OAuth2RequestValidator):
    def __init__(self):
        self._usergetter = User.find_with_password
        self._clientgetter = Client.find
        self._tokengetter = Token.find
        self._tokensetter = Token.save


provider.init_app(app)
provider._validator = RequestValidator()
