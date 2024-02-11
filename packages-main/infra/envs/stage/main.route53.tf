####################################################
# Route53 Host Zone
####################################################
data "aws_route53_zone" "host_domain" {
  name = var.domain
}

resource "aws_route53_zone" "en_subdomain" {
  name = "en.${var.domain}"
}

resource "aws_route53_zone" "ja_subdomain" {
  name = "ja.${var.domain}"
}

####################################################
# Create NS record
####################################################

resource "aws_route53_record" "ns_record_for_en_subdomain" {
  name    = aws_route53_zone.en_subdomain.name
  type    = "NS"
  zone_id = data.aws_route53_zone.host_domain.id
  records = [
    aws_route53_zone.en_subdomain.name_servers[0],
    aws_route53_zone.en_subdomain.name_servers[1],
    aws_route53_zone.en_subdomain.name_servers[2],
    aws_route53_zone.en_subdomain.name_servers[3],
  ]
  ttl = 172800
}

resource "aws_route53_record" "ns_record_for_ja_subdomain" {
  name    = aws_route53_zone.ja_subdomain.name
  type    = "NS"
  zone_id = data.aws_route53_zone.host_domain.id
  records = [
    aws_route53_zone.ja_subdomain.name_servers[0],
    aws_route53_zone.ja_subdomain.name_servers[1],
    aws_route53_zone.ja_subdomain.name_servers[2],
    aws_route53_zone.ja_subdomain.name_servers[3],
  ]
  ttl = 172800
}
