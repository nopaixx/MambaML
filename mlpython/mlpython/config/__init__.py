import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'secret1234'
    # SQLALCHEMY_DATABASE_URI = "mysql://mambaml:mambaml@mysql_db/mambadb"
    SQLALCHEMY_DATABASE_URI = "postgres://mambaml:mambaml@postgres/mambadb"
    REDIS_SERVER = os.environ.get('redis_backend','None')

class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
