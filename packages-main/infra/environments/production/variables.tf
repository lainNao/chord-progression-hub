# NOTE: This values are set at Terraform Cloud

# meta

variable "region" {
  description = "Region to deploy to."
  type        = string
  default     = "us-central1" # Maybe this is the easy to use region...(in terms of price) 
}

variable "project_id" {
  description = "Google Cloud Project ID. You can change this value to switch environments."
  type        = string
}

# artifact registry

variable "artifact_registry_repository_id" {
  description = "Artifact Registry id."
  type        = string
}

# cloud run

variable "cloud_run_service_name" {
  description = "Cloud Run service name."
  type        = string
}

variable "cloud_run_service_container_image_path" {
  description = "Cloud Run Service container image path. e.g. REGION-docker.pkg.dev/PROJECT_ID/ARTIFACT_REGISTRY_ID/IMAGE_NAME:IMAGE_TAG_NAME"
  type        = string
}

variable "neon_api_key" {
  description = "Neon API key."
  type        = string
}

variable "neon_project_name" {
  description = "Neon project name."
  type        = string
}

variable "neon_branch_name" {
  description = "Neon branch name."
  type        = string
}

variable "neon_role_name" {
  description = "Neon role name."
  type        = string
}

variable "neon_db_name" {
  description = "Neon db name."
  type        = string
}
