import os
import config
from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from app import app, db


app.config.from_object(config.DevelopmentConfig)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

 #usage 
 #python manage.py db init
 #python manage.py db migrate
 #python manage.py db upgrade