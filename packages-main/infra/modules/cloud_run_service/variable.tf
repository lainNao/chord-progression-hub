variable "project_id" {
  description = "Google Cloud Project ID. You can change this value to switch environments."
  type        = string
}

variable "region" {
  description = "Region to deploy to."
  type        = string
}

variable "name" {
  description = "Cloud Run service name."
  type        = string
}

variable "container_image_path" {
  description = "Container image path"
  type        = string
}

variable "service_account_email" {
  description = "Service account email."
  type        = string
}

variable "secret_names" {
  description = "Secret manager secret names to be injected into the container."
  type = map(object({
    secret_id = string
    version   = string
  }))

  /* constraints: required keys below
    NEON_HOST
    NEON_DB_NAME
    NEON_USER_NAME
    NEON_PASSWORD
    NEON_ENDPOINT_ID
  */
  validation {
    condition     = contains(keys(var.secret_names), "NEON_HOST") && contains(keys(var.secret_names), "NEON_DB_NAME") && contains(keys(var.secret_names), "NEON_USER_NAME") && contains(keys(var.secret_names), "NEON_PASSWORD") && contains(keys(var.secret_names), "NEON_ENDPOINT_ID")
    error_message = "All required keys (NEON_HOST, NEON_DB_NAME, NEON_USER_NAME, NEON_PASSWORD, NEON_ENDPOINT_ID) must be present in the secrets map."
  }
}
