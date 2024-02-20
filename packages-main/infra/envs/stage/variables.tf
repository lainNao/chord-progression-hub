# meta
variable "domain" {
  sensitive = true

}

# vercel
variable "vercel_api_token" {
  sensitive = true
}

# neon
variable "neon_host" {
  sensitive = true

}
variable "neon_db_name" {
  sensitive = true
}
variable "neon_user_name" {
  sensitive = true
}
variable "neon_password" {
  sensitive = true
}
variable "neon_endpoint_id" {
  sensitive = true
}
