locals {
  cluster_name    = "frontend"
  desired_task_count = "2"
  memory             = 1024
  cpu                = 512
  region          = "us-east-1"
  root_domain     = "app.fief.gg"
  service_name    = "web-app"
  domain          = local.root_domain
  www_domain      = "www.app.fief.gg"
  origin_id       = "web-app"
  project         = "fief"
  env             = "prod"
  version         = "2.7.1"
  container_port  = "8080"
}

locals {
  task_definition = jsonencode([
    {
      name      = "${local.env}-${local.service_name}"
      image     = "${aws_ecr_repository.repo.repository_url}:${local.version}"
      essential = true,
      dockerLabels = {
        "com.datadoghq.ad.instances" : "[{\"host\":\"%%host%%\"}]",
        "com.datadoghq.ad.check_names" : "[\"${local.service_name}\"]",
      },
      portMappings : [
        { containerPort = 8080 }
      ],
        logConfiguration = {
        logDriver = "awsfirelens"
        secretOptions = [{
          name = "apiKey",
          valueFrom = "${data.aws_ssm_parameter.dd_dog.arn}"
        }]
        options = {
          Name             = "datadog"
          "dd_service"     = "${local.env}-${local.service_name}"
          "Host"           = "http-intake.logs.datadoghq.com"
          "dd_source"      = "${local.env}-${local.service_name}"
          "dd_message_key" = "log"
          "dd_tags"        = "project:${local.env}-${local.service_name}"
          "TLS"            = "on"
          "provider"       = "ecs"
        }
      }
    },
    {
      name      = "datadog-agent"
      image     = "datadog/agent:latest"
      essential = false
       portMappings : [{
        "hostPort" : 8126,
        "protocol" : "tcp",
        "containerPort" : 8126
        }
      ]
      secrets = [{
          "name"      = "DD_API_KEY",
          "valueFrom" = "${data.aws_ssm_parameter.dd_dog.arn}"
      }]
      environment = [
        {
          name  = "ECS_FARGATE"
          value = "true"
        },
        {
          name  = "DD_APM_ENABLED"
          value = "true"
        },
        {
          name  = "DD_SERVICE"
          value = local.service_name
        },
        {
          name  = "DD_ENV"
          value = local.env
        },
        {
          name  = "DD_SITE",
          value = "datadoghq.com"
        }
      ]
    },
    {
      name      = "log_router"
      image     = "public.ecr.aws/aws-observability/aws-for-fluent-bit:stable"
      essential = false
      firelensConfiguration = {
        type = "fluentbit"
        options = {
          "enable-ecs-log-metadata" = "true"
        }
      }
    }, 
  ])
}
