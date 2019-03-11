from mlpython.app import db

class User(db.Model):
  
    id = db.Column(db.Integer, primary_key=True)
    hashpw = db.Column(db.String(80))
    email = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(30))
    phone = db.Column(db.String(15))


