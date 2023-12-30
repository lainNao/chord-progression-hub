terraform {
  cloud {
    organization = "chord-progression-hub"

    workspaces {
      name    = "staging"
      project = "chord-progression-hub"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

module "service_account_for_cloud_run" {
  source = "../../modules/service_account"
  # variables
  account_id   = "sa-for-cloud-run"
  display_name = "service account for cloud run"
}

module "artifact_registry_for_container_image" {
  source = "../../modules/artifact_registry"
  # variables
  region        = var.region
  repository_id = var.artifact_registry_repository_id
}

module "main_cloud_run_service" {
  source = "../../modules/cloud_run_service"
  # variables
  project_id            = var.project_id
  region                = var.region
  name                  = var.cloud_run_service_name
  service_account_email = module.service_account_for_cloud_run.info.email
  container_image_path  = var.cloud_run_service_container_image_path
  # other
  depends_on = [module.artifact_registry_for_container_image]
}

####################### NOTE: 現状IAM類は直接mainに書いちゃう

# NOTE: 以下はステージング環境では行わない
# # Cloud Runを未認証で外部公開する
# resource "google_cloud_run_service_iam_policy" "noauth" {
#   location    = var.region
#   project     = var.project_id
#   service     = var.cloud_run_service_name
#   policy_data = data.google_iam_policy.noauth_policy.policy_data
# }
