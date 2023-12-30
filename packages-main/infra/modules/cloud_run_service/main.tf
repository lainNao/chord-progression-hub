resource "google_cloud_run_v2_service" "main" {
  name     = var.name
  location = var.region

  template {
    service_account = var.service_account_email

    containers {
      image = var.container_image_path
      ports {
        container_port = 8080
      }

      # env {
      #   name  = "DATABASE_URL"
      #   value = "..."
      # }

      resources {
        limits = {
          cpu    = "1000m" # 1 vCPU
          memory = "512Mi"
        }
      }
    }
  }
}
