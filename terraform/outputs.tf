# outputs.tf

output "alb_hostname" {
  value = aws_alb.main.dns_name
}

output "ecr_repo" {
  value = aws_ecr_repository.backend
}
output "db_instance" {
  value = aws_db_instance.default.endpoint
}
