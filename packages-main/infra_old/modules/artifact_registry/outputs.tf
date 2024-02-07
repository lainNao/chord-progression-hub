output "info" {
  value = {
    "name"          = google_artifact_registry_repository.main.name
    "location"      = google_artifact_registry_repository.main.location
    "repository_id" = google_artifact_registry_repository.main.repository_id
  }
}
