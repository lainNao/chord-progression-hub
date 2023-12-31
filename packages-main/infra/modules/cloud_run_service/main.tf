resource "google_cloud_run_v2_service" "main" {
  name     = var.name
  location = var.region

  template {
    service_account = var.service_account_email

    execution_environment = "EXECUTION_ENVIRONMENT_GEN2"

    scaling {
      min_instance_count = 0
      max_instance_count = 1
    }

    containers {
      image = var.container_image_path

      ports {
        container_port = 8080
      }

      resources {
        cpu_idle          = true
        startup_cpu_boost = false # 本番ではtrueにする？
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }

      # secretsをfor_eachで回してenvに追加
      dynamic "env" {
        for_each = var.secret_names

        content {
          name = env.key
          value_source {
            secret_key_ref {
              secret  = env.value.secret_id
              version = env.value.version
            }
          }
        }
      }
    }
  }
}
