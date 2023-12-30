terraform {
  cloud {
    organization = "chord-progression-hub"

    workspaces {
      name    = "shared"
      project = "chord-progression-hub"
    }
  }

  required_providers {
    neon = {
      source = "kislerdm/neon"
    }
  }

}

provider "neon" {
  api_key = var.neon_api_key
}

resource "neon_project" "default" {
  name = var.neon_project_name
}

## staging 

resource "neon_database" "staging_database" {
  project_id = neon_project.default.id
  branch_id  = neon_branch.staging_branch.id
  owner_name = neon_role.staging_branch_role.name
  name       = var.neon_db_name
}

resource "neon_branch" "staging_branch" {
  project_id = neon_project.default.id
  parent_id  = neon_project.default.default_branch_id
  name       = "staging"
}

resource "neon_role" "staging_branch_role" {
  project_id = neon_project.default.id
  branch_id  = neon_branch.staging_branch.id
  name       = var.neon_role_name
}
