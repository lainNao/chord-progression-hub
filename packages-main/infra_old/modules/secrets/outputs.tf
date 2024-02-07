/*
output like this: 

{
  "NEON_HOST" = {
    "secret_id" = "projects/xxxx/secrets/NEON_HOST",
    "version" = "1",
  },
  ...
}
*/
output "secrets" {
  value = {
    for k, v in google_secret_manager_secret_version.secret_version : k => {
      secret_id = google_secret_manager_secret.secret[k].id
      version   = v.version
    }
  }
}

