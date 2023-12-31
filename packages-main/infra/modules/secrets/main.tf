resource "google_secret_manager_secret" "secret" {
  for_each = var.secrets
  # 以下をfor_each分回す

  secret_id = each.key
  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "secret_version" {
  for_each = var.secrets
  # 以下をfor_each分回す

  secret      = google_secret_manager_secret.secret[each.key].id
  secret_data = each.value
}
