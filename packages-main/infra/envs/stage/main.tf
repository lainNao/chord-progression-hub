terraform {
  required_version = "= 1.6.6"
  cloud {
    organization = "chord-progression-hub"

    workspaces {
      name = "stage"
    }
  }
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "1.1.0"
    }
  }
}
