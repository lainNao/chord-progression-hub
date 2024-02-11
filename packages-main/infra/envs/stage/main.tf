terraform {
  required_version = "= 1.6.6"
  cloud {
    organization = "chord-progression-hub"

    workspaces {
      name = "stage"
    }
  }
}

provider "aws" {
  region  = local.region
  profile = "cph-stage"
  default_tags {
    tags = {
      env = local.env
    }
  }
}

