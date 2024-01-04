variable "project_id" {
  type        = string
  description = "The project id to create Workload Identity Pool"
}

variable "service_account_name" {
  type        = string
  description = "The service account name to create Workload Identity Pool"
}

variable "github_repository" {
  type        = string
  description = "GitHub repository name"
}
