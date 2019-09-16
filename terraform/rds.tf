
resource "aws_db_subnet_group" "default" {
  name       = "rdssubnet"
  subnet_ids = aws_subnet.private.*.id

  tags = {
    Name = "My DB subnet group"
  }
}



resource "aws_db_instance" "default" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "9.6"
  instance_class       = "db.t2.micro"
  name                 = "mambadb"
  username             = "mambaloger"
  password             = "mambapwd"
  parameter_group_name = "default.postgres9.6"
  db_subnet_group_name = aws_db_subnet_group.default.name
}
