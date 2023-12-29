variable "account_id" {
  description = "The ID of the GCP account to use for the Artifact Registry Service Account"
  type        = string

  validation {
    condition     = can(regex("^[a-z](?:[-a-z0-9]{4,28}[a-z0-9])$", var.account_id))
    error_message = "The account_id must be 6-30 characters long, and must start with a lowercase letter and contain only lowercase letters, numbers, and hyphens."
  }
}

variable "display_name" {
  description = "The display name of service account."
  type        = string
}
