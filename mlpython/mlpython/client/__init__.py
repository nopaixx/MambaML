from mlpython.app import db
import sys

class Client(db.Model):
    # human readable name, not required

    client_id = db.Column(db.String(40), primary_key=True)
    # public or confidential
    # client_type = db.Column(db.String(40), default = 'public')

    _redirect_uris = db.Column(db.Text)
    _default_scopes = db.Column(db.Text)
    

    @property
    def allowed_grant_types(self):
        """Default client grant types."""
        return ['password', 'refresh_token']

    @property
    def client_type(self):
        return 'public'

    #@property
    #def redirect_uris(self):
    #    if self._redirect_uris:
    #        return self._redirect_uris.split()
    #    return []

    @property
    def default_redirect_uri(self):
        return ''
        # return self.redirect_uris[0]

    @property
    def default_scopes(self):
        if self._default_scopes:
            return self._default_scopes.split()
        return []

    @staticmethod
    def get_client(client_id):
        print("getclient",file=sys.stderr)
        client = Client.query.filter(Client.client_id==client_id).first()    
        return client

    @classmethod
    def set_client(cls):
        # adebug set as enviroment variable for SaaS
        main_client = 'mambamlclient'

        client = cls.query.filter(Client.client_id==main_client).first()
        if client:
            return None
        else:
            cls.create(main_client)
        return None

    @classmethod
    def create(cls, client_id):
        model = cls()
        model.client_id = client_id
        db.session.add(model)
        db.session.commit()
        return model
