# FROM localhost:5000/mypython:latest
FROM python:3.7


EXPOSE 8081

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev && \
    apt-get install python-mysqldb

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

# RUN pip install -e .
COPY . /app

# ENTRYPOINT [ "python" ]
# CMD python manage.py db upgrade ; \
#    python initial_data.py ; \ 
#    flask run --host=0.0.0.0 --port=8081

