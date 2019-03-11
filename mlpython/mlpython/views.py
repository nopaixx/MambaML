from mlpython.app import app
#from .app import app

@app.route('/')
def index():
    return 'Hellowww World!'
