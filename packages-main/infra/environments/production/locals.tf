# local 定義
locals {
  github_repository = "lainNao/chord-progression-hub"

  # api 有効化用
  services = toset([                       # Workload Identity 連携用
    "iam.googleapis.com",                  # IAM
    "cloudresourcemanager.googleapis.com", # Resource Manager
    "iamcredentials.googleapis.com",       # Service Account Credentials
    "sts.googleapis.com",                  # Security Token Service API
    "artifactregistry.googleapis.com",     # Artifact Registry
    "secretmanager.googleapis.com",        # Secret Manager
  ])
}
