from mlpython.app import app, db
from ..oauth import provider
from flask_restful import abort, Resource
from ..projects import Project
import sys

@app.route('/task/status', methods=['GET'])
@provider.require_oauth()
def task_status():
    task_id = request.args.get('page', Query.DEFAULT_PAGE)

    # TODO OK at this moment this method train de model
    # but only need only return status
    return "DONE", 200
    
