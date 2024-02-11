# alb

# ecs

# network
output "aws_internet_gateway" {
  value = aws_internet_gateway.this
}
output "aws_subnet" {
  value = {
    public_1a  = aws_subnet.public_1a
    public_1b  = aws_subnet.public_1b
    private_1a = aws_subnet.private_1a
    private_1b = aws_subnet.private_1b
  }
}
output "aws_eip" {
  value = aws_eip.nat_1a
}
output "aws_nat_gateway" {
  value = aws_nat_gateway.nat_1a
}
output "aws_route_table" {
  value = aws_route_table.private_1a
}
output "aws_route_table_association" {
  value = aws_route_table_association.private_1a
}

# route53
output "aws_route53_zone" {
  value = {
    en_subdomain = aws_route53_zone.en_subdomain
    ja_subdomain = aws_route53_zone.ja_subdomain
  }
}
output "aws_route53_record" {
  value = {
    ns_record_for_en_subdomain = aws_route53_record.ns_record_for_en_subdomain
    ns_record_for_ja_subdomain = aws_route53_record.ns_record_for_ja_subdomain
  }
}

# vpc
output "aws_vpc" {
  value = aws_vpc.this
}