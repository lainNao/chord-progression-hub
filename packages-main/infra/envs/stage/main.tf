terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "1.1.0"
    }
  }
}

terraform {
  required_version = "= 1.6.6"
  cloud {
    organization = "chord-progression-hub"

    workspaces {
      name = "stage"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}
