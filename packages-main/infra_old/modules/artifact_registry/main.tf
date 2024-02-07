resource "google_artifact_registry_repository" "main" {
  description   = "Save docker images for Cloud Run"
  format        = "DOCKER"
  repository_id = var.repository_id
  location      = var.region
}
