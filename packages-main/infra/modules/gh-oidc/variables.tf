variable "project_id" {
  type        = string
  description = "The project id to create Workload Identity Pool"
}

variable "service_account_email" {
  type        = string
  description = "Service Account email to grant access to"
}

variable "github_repository" {
  type        = string
  description = "GitHub repository name"
}
