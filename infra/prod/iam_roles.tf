data "aws_iam_policy_document" "ecs_task_policy" {
  statement {
    sid     = "AllowECSAndTaskAssumeRole"
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["ecs.amazonaws.com", "ecs-tasks.amazonaws.com","application-autoscaling.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "task_ecs_role" {
  name               = "${local.env}-${local.service_name}-task-ecs-rl"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_policy.json
}

data "aws_iam_policy_document" "task_policy" {
  statement {
    sid    = "AllowReadToResourcesInListToTask"
    effect = "Allow"
    actions = [
      "ecs:*",
      "ecr:*"
    ]
    
    resources = ["*"]
  }
statement {
    sid    = "AllowAccessToSSM"
    effect = "Allow"
    actions = [
      "ssm:GetParameters"
    ]
    resources = [
      "${data.aws_ssm_parameter.dd_dog.arn}"
    ]
  }

  statement {
    sid    = "AllowDecrypt"
    effect = "Allow"
    actions = [
      "kms:Decrypt"
    ]
    resources = ["${data.aws_kms_key.kms_key.arn}"]
  }
}

resource "aws_iam_role_policy" "task_ecs_policy" {
  name   = "${local.env}-${local.service_name}-task-ecs-pl"
  role   = aws_iam_role.task_ecs_role.id
  policy = data.aws_iam_policy_document.task_policy.json
}

data "aws_iam_policy_document" "auto_scale_policy" {
 statement {
    sid     = "AllowAutoScalingAssumeRole"
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["application-autoscaling.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_autoscale_role" { 
  name = "${local.env}-${local.service_name}-auto-scaling-task-ecs-policy"
  assume_role_policy = data.aws_iam_policy_document.auto_scale_policy.json
}

data "aws_kms_key" "kms_key" {
  key_id = "alias/${local.env}-kms-key"
}

data "aws_ssm_parameter" "dd_dog" {
  name = "${local.env}-data-dog-api-key"
}