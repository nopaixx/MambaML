from mlpython.app import app
import mlpython.oauth
import mlpython.users.webservices
import mlpython.projects.webservices
import mlpython.tasks.webservices
import mlpython.actors.webservices
import mlpython.companys.webservices
import mlpython.cloud_manager.webservices
import mlpython.status_project
# import mlpython.predict.webservices
#from .app import app

@app.route('/')
def index():
    return 'Hellowww World! 3'
