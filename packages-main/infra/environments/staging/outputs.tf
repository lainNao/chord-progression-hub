output "oidc_pool_name" {
  description = "Pool name"
  value       = module.oidc.pool_name
}

output "oidc_provider_name" {
  description = "Provider name"
  value       = module.oidc.provider_name
}

output "service_account_email" {
  description = " SA email"
  value       = google_service_account.main_service_account.email
}
