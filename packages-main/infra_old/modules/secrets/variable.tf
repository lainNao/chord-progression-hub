variable "secrets" {
  description = "Secrets."
  type        = map(string)

  /* constraints: required below keys
    NEON_HOST
    NEON_DB_NAME
    NEON_USER_NAME
    NEON_PASSWORD
    NEON_ENDPOINT_ID
  */
  validation {
    condition     = contains(keys(var.secrets), "NEON_HOST") && contains(keys(var.secrets), "NEON_DB_NAME") && contains(keys(var.secrets), "NEON_USER_NAME") && contains(keys(var.secrets), "NEON_PASSWORD") && contains(keys(var.secrets), "NEON_ENDPOINT_ID")
    error_message = "The secrets map must contain the keys 'NEON_HOST', 'NEON_DB_NAME', 'NEON_USER_NAME', 'NEON_PASSWORD', and 'NEON_ENDPOINT_ID'."
  }
}
