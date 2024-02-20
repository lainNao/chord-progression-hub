output "vercel_project" {
  value     = vercel_project.with_git
  sensitive = true
}

output "vercel_deployment" {
  value = vercel_deployment.main
}

output "vercel_project_domain" {
  value     = vercel_project_domain.main
  sensitive = true
}
