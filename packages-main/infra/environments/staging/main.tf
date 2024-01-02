terraform {
  required_version = "= 1.6.6"
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

module "app_secrets" {
  source = "../../modules/secrets"
  # variables
  secrets = {
    "NEON_HOST"        = var.neon_host
    "NEON_DB_NAME"     = var.neon_db_name
    "NEON_USER_NAME"   = var.neon_user_name
    "NEON_PASSWORD"    = var.neon_password
    "NEON_ENDPOINT_ID" = var.neon_endpoint_id
  }
}

resource "google_service_account" "main_service_account" {
  account_id   = "main-service-account"
  display_name = "service account for github actions"
}

module "artifact_registry_for_container_image" {
  source = "../../modules/artifact_registry"
  # variables
  region        = var.region
  repository_id = var.artifact_registry_repository_id
}

module "cloud_run_service_main" {
  source = "../../modules/cloud_run_service"
  # variables
  project_id            = var.project_id
  region                = var.region
  name                  = var.cloud_run_service_name
  service_account_email = google_service_account.main_service_account.email
  container_image_path  = var.cloud_run_service_container_image_path
  secret_names = {
    "NEON_HOST"        = module.app_secrets.secrets["NEON_HOST"]
    "NEON_DB_NAME"     = module.app_secrets.secrets["NEON_DB_NAME"]
    "NEON_USER_NAME"   = module.app_secrets.secrets["NEON_USER_NAME"]
    "NEON_PASSWORD"    = module.app_secrets.secrets["NEON_PASSWORD"]
    "NEON_ENDPOINT_ID" = module.app_secrets.secrets["NEON_ENDPOINT_ID"]
  }

  # other
  depends_on = [module.artifact_registry_for_container_image]
}

####################### NOTE: 簡単なIAM類は直接mainに書いちゃう

# NOTE: 以下はステージング環境では行わない
# # Cloud Runを未認証で外部公開する
# resource "google_cloud_run_service_iam_policy" "noauth" {
#   location    = var.region
#   project     = var.project_id
#   service     = var.cloud_run_service_name
#   policy_data = data.google_iam_policy.noauth_policy.policy_data
# }

resource "google_project_iam_member" "artifact_registry_reader" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.main_service_account.email}"
}

resource "google_project_iam_member" "secret_manager_secret_accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.main_service_account.email}"
}

resource "google_project_iam_member" "service_account_token_creator" {
  project = var.project_id
  role    = "roles/iam.serviceAccountTokenCreator"
  member  = "serviceAccount:${google_service_account.main_service_account.email}"
}
