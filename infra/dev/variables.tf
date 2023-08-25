locals {
  cluster_name    = "frontend"
  desired_task_count = "1"
  memory             = 512
  cpu                = 256
  region          = "us-east-1"
  root_domain     = "app.fief.gg"
  sub_domain      = "dev"
  service_name    = "web-app"
  domain          = "${local.sub_domain}.${local.root_domain}"
  wildcard_domain = "*.${local.domain}"
  origin_id       = "dev-app"
  root_object     = "index.html"
  project         = "fief"
  env             = "dev"
  version         = "latest"
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
      ]
    }, 
  ])
}
