$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t backend .
docker tag backend:latest 680777440142.dkr.ecr.us-east-1.amazonaws.com/backend:latest
docker push 680777440142.dkr.ecr.us-east-1.amazonaws.com/backend:latest
aws ecs update-service --cluster mambaml-cluster --service mambaml-service --region us-east-1
