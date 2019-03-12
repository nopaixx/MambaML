
FROM localhost:5000/myweb as build-stage

WORKDIR /app

COPY *.* /app/

RUN apt-get update -y && \
    apt-get install -y npm

RUN npm install -g @angular/cli

RUN ng serve

