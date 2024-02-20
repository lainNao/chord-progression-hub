provider "vercel" {
  api_token = var.vercel_api_token
  team      = "cph-team"
}

resource "vercel_project" "with_git" {
  name      = local.app_name
  framework = "nextjs"
  # password_protectionは料金が高い
  vercel_authentication = {
    deployment_type = "standard_protection" # all_deploymentsは料金が高い
  }
  git_repository = {
    type = "github"
    repo = "lainNao/chord-progression-hub"
  }
  environment = [{
    target = ["production", "preview"]
    key    = "FOO"
    value  = "bar"
  }]
}

data "vercel_project_directory" "app" {
  path = "../../../app"
}

# resource "vercel_deployment" "main" {
#   project_id  = vercel_project.with_git.id
#   files       = data.vercel_project_directory.app.files
#   path_prefix = data.vercel_project_directory.app.path
#   production  = local.env == "production"
# }

resource "vercel_project_domain" "main" {
  project_id = vercel_project.with_git.id
  domain     = var.domain
}
