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
