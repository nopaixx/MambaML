from setuptools import setup

setup(
    name='mlpython',
    packages=['mlpython'],
    include_package_data=True,
    install_requires=[
        'flask',
        'SQLAlchemy',
        'Flask-OAuthlib',
    ],
)
