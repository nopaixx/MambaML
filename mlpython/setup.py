from setuptools import setup

setup(
    name='mambaml',
    packages=['service'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
