####################################################
# Application Security Group
####################################################

resource "aws_security_group" "app" {
  name        = "${local.env}-app"
  description = "Security Group for Application"
  vpc_id      = aws_vpc.this.id
  tags = {
    Name = "${local.env}-app"
  }
}

resource "aws_security_group_rule" "app_from_this" {
  security_group_id = aws_security_group.app.id
  type              = "ingress"
  description       = "Allow from This"
  from_port         = 0 # NOTE: 0だと全ポート
  to_port           = 0 # NOTE: 0だと全ポート
  protocol          = "-1"
  self              = true
}

resource "aws_security_group_rule" "app_from_alb" {
  security_group_id        = aws_security_group.app.id
  type                     = "ingress"
  description              = "Allow from ALB"
  from_port                = 0 # NOTE: 0だと全ポート
  to_port                  = 0 # NOTE: 0だと全ポート
  protocol                 = "-1"
  source_security_group_id = aws_security_group.alb.id
}

resource "aws_security_group_rule" "app_to_any" {
  security_group_id = aws_security_group.app.id
  type              = "egress"
  description       = "Allow to Any"
  from_port         = 0 # NOTE: 0だと全ポート
  to_port           = 0 # NOTE: 0だと全ポート
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
}
