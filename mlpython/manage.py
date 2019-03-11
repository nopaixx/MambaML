import os
from  mlpython.config import DevelopmentConfig
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from mlpython.app import app, db


app.config.from_object(DevelopmentConfig)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

 #usage 
 #python manage.py db init
 #python manage.py db migrate
 #python manage.py db upgrade