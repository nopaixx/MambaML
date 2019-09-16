$(aws ecr get-login --no-include-email --region us-west-2)
docker build -t backend .
docker tag backend:latest 680777440142.dkr.ecr.us-west-2.amazonaws.com/backend:latest
docker push 680777440142.dkr.ecr.us-west-2.amazonaws.com/backend:latest
aws ecs update-service ---cluster mambaml-cluster --service mambaml-service --region us-west-2
