from mlpython.app import db
from datetime import datetime, timedelta

class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(
        db.String(40), db.ForeignKey('client.client_id'),
        nullable=False,
    )
    client = db.relationship('Client')

    user_id = db.Column(
        db.Integer, db.ForeignKey('user.id')
    )
    user = db.relationship('User')

    # currently only bearer is supported
    token_type = db.Column(db.String(40))

    access_token = db.Column(db.String(255), unique=True)
    refresh_token = db.Column(db.String(255), unique=True)
    expires = db.Column(db.DateTime)
    _scopes = db.Column(db.Text)

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self

    @property
    def scopes(self):
        if self._scopes:
            return self._scopes.split()
        return []

    @staticmethod
    def bearer_token(access_token=None, refresh_token=None):
        
        if access_token:
            return Token.query.filter_by(access_token=access_token).first()
        if refresh_token:
            return Token.query.filter_by(refresh_token=refresh_token).first()
        return None

    @staticmethod
    def save(token, request, *args, **kwargs):
        """Creates a new token per client and user."""
        
        tokens = Token.query.filter_by(
            client_id=request.client.client_id, user_id=request.user.id)

        # Make sure there is only one token for every client and user.
        [db.session.delete(t) for t in tokens]

        expires_in = token.pop('expires_in')+9999999999
        expires = datetime.utcnow() + timedelta(seconds=expires_in)

        tok = Token(
            access_token=token['access_token'],
            refresh_token=token['refresh_token'],
            token_type=token['token_type'],
            expires=expires,
            client_id=request.client.client_id,
            user_id=request.user.id)

        db.session.add(tok)
        db.session.commit()
