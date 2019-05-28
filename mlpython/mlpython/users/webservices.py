from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from . import User
import sys

@app.route('/user/myuser', methods=['POST','GET'])
@provider.require_oauth()
def myuser():
	userLogged = User.get_authorized()
	print(userLogged.username,"AQQUI")
	if not userLogged:
		return '', 401
	#nothing to request
	# request.args.get('page', Query.DEFAULT_PAGE)
	return userLogged.serialize(), 200
