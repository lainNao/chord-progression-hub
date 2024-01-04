# Workload Identity Pool 設定
resource "google_iam_workload_identity_pool" "mypool" {
  provider                  = google-beta
  project                   = var.project_id
  workload_identity_pool_id = "mypool"
  display_name              = "mypool"
  description               = "GitHub Actions で使用"
}

# Workload Identity Provider 設定
resource "google_iam_workload_identity_pool_provider" "myprovider" {
  provider                           = google-beta
  project                            = var.project_id
  workload_identity_pool_id          = google_iam_workload_identity_pool.mypool.workload_identity_pool_id
  workload_identity_pool_provider_id = "myprovider"
  display_name                       = "myprovider"
  description                        = "GitHub Actions で使用"

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
  }

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

# サービスアカウントの IAM Policy 設定と GitHub リポジトリの指定
resource "google_service_account_iam_member" "terraform_sa" {
  service_account_id = var.service_account_name
  role               = "roles/iam.serviceAccountViewer"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.mypool.name}/attribute.repository/${var.github_repository}"
}
