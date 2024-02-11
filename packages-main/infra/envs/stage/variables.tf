# aws
variable "domain" {
  description = "Domain of the environment."
  type        = string
}
variable "route53_zone_id" {
  description = "Route53 zone id."
  type        = string
}

# neon
variable "neon_host" {
  description = "Neon host."
  type        = string
}

variable "neon_db_name" {
  description = "Neon db name."
  type        = string
}

variable "neon_user_name" {
  description = "Neon user name."
  type        = string
}

variable "neon_password" {
  description = "Neon password."
  type        = string
}

variable "neon_endpoint_id" {
  description = "Neon endpoint id."
  type        = string
}
