####################################################
# ECS Cluster
####################################################

resource "aws_ecs_cluster" "this" {
  name = "${local.env}-app-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

####################################################
# ECS IAM Role
####################################################

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Service = "ecs-tasks.amazonaws.com" }
        Action    = "sts:AssumeRole"
      }
    ]
  })
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
    "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
  ]
}

####################################################
# ECS Task Container Log Groups
####################################################

resource "aws_cloudwatch_log_group" "main" {
  name              = "/ecs/main"
  retention_in_days = 30
}

# resource "aws_iam_role_policy" "kms_decrypt_policy" {
#   name = "${local.env}_ecs_task_execution_role_policy_kms"
#   role               = aws_iam_role.ecs_task_execution_role.id
#   policy = jsonencode({
#     Version   = "2012-10-17"
#     Statement = [
#       {
#         "Effect": "Allow",
#         "Action": [
#           "kms:Decrypt"
#         ],
#           data.aws_ssm_parameter.database_password.arn
#         ]
#       }
#     ]
#   })
# }

####################################################
# ECR data source
####################################################

# TODO refactor
data "external" "ecr_image_newest" {
  program = [
    "aws", "ecr", "describe-images",
    "--repository-name", aws_ecr_repository.main.name,
    "--query", "{\"tags\": to_string(sort_by(imageDetails,& imagePushedAt)[-1].imageTags)}",
  ]
}

locals {
  ecr_image_newest_tags = jsondecode(data.external.ecr_image_newest.result.tags)
}


####################################################
# ECS Task Definition
####################################################
resource "aws_ecs_task_definition" "main" {
  family                   = "main"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  # TODO: 戻す等する
  container_definitions    = <<EOL
[
  {
    "name": "${local.env}",
    "image": "nginx:1.14",
    "portMappings": [
      {
        "containerPort": 80,
        "hostPort": 80
      }
    ]
  }
]
EOL
  # container_definitions    = jsonencode([
  #   {
  #     name             = local.env
  #     image            = "${aws_ecr_repository.main.repository_url}:${local.ecr_image_newest_tags[0]}"
  #     portMappings     = [{ containerPort : 3000 }]
  #     logConfiguration = {
  #       logDriver = "awslogs"
  #       options   = {
  #         awslogs-region : local.region
  #         awslogs-group : aws_cloudwatch_log_group.main.name
  #         awslogs-stream-prefix : "ecs"
  #       }
  #     }
  #   }
  # ])
}



####################################################
# ECS Cluster Service
####################################################

resource "aws_ecs_service" "main" {
  name                               = "${local.env}-main"
  cluster                            = aws_ecs_cluster.this.id
  platform_version                   = "LATEST"
  task_definition                    = aws_ecs_task_definition.main.arn
  desired_count                      = 1
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  propagate_tags                     = "SERVICE"
  enable_execute_command             = true
  launch_type                        = "FARGATE"
  health_check_grace_period_seconds  = 60
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }
  network_configuration {
    assign_public_ip = true
    subnets = [
      aws_subnet.public_1a.id,
    ]
    security_groups = [
      aws_security_group.alb.id,
    ]
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.main.arn
    container_name   = local.env
    container_port   = 80 # NOTE: 3000だったのでNext.jsなら3000になるかも
  }
}

resource "aws_lb_target_group" "main" {
  name                 = "${local.env}-service-tg-main"
  vpc_id               = aws_vpc.this.id
  target_type          = "ip"
  port                 = 80
  protocol             = "HTTP"
  deregistration_delay = 60
  health_check { path = "/api/healthcheck" }
}

resource "aws_lb_listener_rule" "main" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 1
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }
  condition {
    host_header {
      values = [var.domain]
    }
  }
}


####################################################
# ALB maintenance HTML
# NOTE: メンテしたい時にコメントアウト外して使えるかな？
# TODO: aws_lb_listener側でやるのとの違いは？
####################################################

# locals {
#   maintenance_body = <<EOF
#   <!doctype html> <title>メンテナンス中</title> <style> body { text-align: center; padding: 150px; } h1 { font-size: 50px; } body { font: 20px Helvetica, sans-serif; color: #333; } article { display: block; text-align: left; width: 650px; margin: 0 auto; } a { color: #dc8100; text-decoration: none; } a:hover { color: #333; text-decoration: none; } </style> <article> <h1>只今メンテナンス中です</h1> <div> <p>システムの改修を行なっております。ご不便をおかけいたしますが今しばらくお待ちください。</p> <p>&mdash; 開発チーム</p> </div> </article>
# EOF
# }

# resource "aws_lb_listener_rule" "maintenance" {
#   listener_arn = aws_lb_listener.https.arn
#   priority = 100
#   action {
#     type = "fixed-response"
#     fixed_response {
#       content_type = "text/html"
#       message_body = local.maintenance_body
#       status_code = "503"
#     }
#   }
#   condition {
#     path_pattern {
#       values = ["*"]
#     }
#   }
# }
