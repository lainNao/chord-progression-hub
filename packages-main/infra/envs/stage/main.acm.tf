####################################################
# Import Host domain Wildcard ACM
####################################################

data "aws_acm_certificate" "host_domain_wc_acm" {
  domain = var.domain
}
