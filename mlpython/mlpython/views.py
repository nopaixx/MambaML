from mlpython.app import app
import mlpython.oauth
#from .app import app

@app.route('/')
def index():
    return 'Hellowww World!'
