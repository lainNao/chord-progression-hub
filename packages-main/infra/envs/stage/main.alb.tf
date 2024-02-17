####################################################
# ALB Security Group
####################################################
resource "aws_security_group" "alb" {
  name        = "${local.env}-integrated-alb"
  description = "${local.env} alb rule based routing"
  vpc_id      = aws_vpc.this.id
  egress {
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    env = local.env
  }
}

resource "aws_security_group_rule" "alb_http" {
  from_port         = 80
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  to_port           = 80
  type              = "ingress"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "alb_https" {
  from_port         = 443
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  to_port           = 443
  type              = "ingress"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_lb" "this" {
  name               = "${local.env}-integrated-alb"
  load_balancer_type = "application"
  security_groups = [
    aws_security_group.alb.id
  ]
  subnets = [
    aws_subnet.public_1a.id,
    aws_subnet.public_1b.id
  ]
}


# NOTE: httpはhttpsにリダイレクト
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.this.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = data.aws_acm_certificate.host_domain_wc_acm.arn

  # NOTE: 他に作ったaws_lb_listener_ruleのいずれにも合致しない場合のフォールバック
  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Fallback Error: 503 Service Temporarily Unavailable"
      status_code  = "503"
    }
  }
}

####################################################
# Route53 record for ALB
####################################################
# TODO: サブドメインじゃなくてもアクセスできるようにする
resource "aws_route53_record" "a_record_for_en_subdomain" {
  name    = aws_route53_zone.en_subdomain.name
  type    = "A"
  zone_id = aws_route53_zone.en_subdomain.zone_id
  alias {
    evaluate_target_health = true
    name                   = aws_lb.this.dns_name
    zone_id                = aws_lb.this.zone_id
  }
}

resource "aws_route53_record" "a_record_for_ja_subdomain" {
  name    = aws_route53_zone.ja_subdomain.name
  type    = "A"
  zone_id = aws_route53_zone.ja_subdomain.zone_id
  alias {
    evaluate_target_health = true
    name                   = aws_lb.this.dns_name
    zone_id                = aws_lb.this.zone_id
  }
}
