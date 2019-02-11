# MambaML

https://docs.docker.com/registry/

https://docs.docker.com/registry/introduction/

https://docs.docker.com/registry/deploying/

# Prepare you local docker registry with your images

# mypython image

sudo docker pull ubuntu:16.04

sudo docker tag ubuntu:16.04 localhost:5000/mypython

sudo docker push localhost:5000/mypython

sudo docker image remove ubuntu:16.04

sudo docker image remove localhost:5000/mypython

# myweb image

sudo docker pull ubuntu:16.04

sudo docker tag ubuntu:16.04 localhost:5000/myweb

sudo docker push localhost:5000/myweb

sudo docker image remove ubuntu:16.04

sudo docker image remove localhost:5000/myweb


# Start and remove remove the container registry and rm registry, use docker container rm.

sudo docker run -d -p 5000:5000 --restart=always --name registry registry:2

sudo docker container stop registry && sudo docker container rm -v registry






