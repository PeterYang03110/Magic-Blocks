resource "aws_security_group" "ecs_alb_https_sg" {
  name        = "${local.env}-${local.service_name}-alb-https-sg"
  description = "Security group for ALB to cluster"
  vpc_id      = data.terraform_remote_state.vpc.outputs.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "${local.env}-${local.service_name}-alb-https-sg"
    Environment = local.env
  }
}

resource "aws_security_group" "ecs_task_sg" {
  name   = "${local.env}-${local.service_name}-task-sg"
  vpc_id = data.terraform_remote_state.vpc.outputs.id

  ingress {
    from_port   = local.container_port
    to_port     = local.container_port
    protocol    = "TCP"
    cidr_blocks = ["${data.terraform_remote_state.vpc.outputs.cidr_block}"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "${local.env}-${local.service_name}-task-sg"
    Project     = local.cluster_name
    environment = local.env
  }
}