from mlpython.app import app
#from .app import app

@app.route('/')
def index():
    return 'Hello World!'
