# logs.tf

# Set up CloudWatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "mambaml_log_group" {
  name              = "/ecs/mambaml-app"
  retention_in_days = 30

  tags = {
    Name = "cb-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "cb_mambaml_stream" {
  name           = "mambaml-log-stream"
  log_group_name = aws_cloudwatch_log_group.mambaml_log_group.name
}

