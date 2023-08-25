resource "aws_alb" "alb" {
  name                       = "${local.env}-${local.service_name}-alb"
  drop_invalid_header_fields = true
  security_groups            = ["${aws_security_group.ecs_alb_https_sg.id}"]
  subnets                    = data.terraform_remote_state.vpc.outputs.public_subnets

  tags = {
    Name = "${local.env}-${local.service_name}-alb"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_alb_target_group" "ecs_task_target_group" {
  name        = "${local.env}-${local.service_name}-tg"
  port        = local.container_port
  vpc_id      = data.terraform_remote_state.vpc.outputs.id
  target_type = "ip"
  protocol    = "HTTP"

  lifecycle {
    create_before_destroy = true
  }

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 60
    timeout             = 30
    unhealthy_threshold = "3"
    healthy_threshold   = "3"
  }

  tags = {
    Name = "${local.env}-${local.service_name}-tg"
  }
}

module "alb_acm" {
  source            = "../acm"
  domain_name       = "${local.sub_domain}.${local.root_domain}"
  aws_region        = "us-west-2"
  zone_id           = data.aws_route53_zone.root.zone_id
  tags = {
    Name = "${local.env}-${local.domain}-alb"
  }
}

resource "aws_alb_listener" "alb_https_listener" {
  load_balancer_arn = aws_alb.alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = module.alb_acm.arn

  lifecycle {
    create_before_destroy = true
  }

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_task_target_group.arn
  }
}

resource "aws_alb_listener" "alb_http_listener" {
  load_balancer_arn = aws_alb.alb.arn
  port              = 80
  protocol          = "HTTP"
  lifecycle {
    create_before_destroy = true
  }

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_task_target_group.arn
  }
}

resource "aws_alb_listener_rule" "ecs_alb_listener_rule" {
  listener_arn = aws_alb_listener.alb_https_listener.arn
  priority     = 100
  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_task_target_group.arn
  }

  condition {
    host_header {
      values = ["${local.sub_domain}.${local.root_domain}"]
    }
  }
}

