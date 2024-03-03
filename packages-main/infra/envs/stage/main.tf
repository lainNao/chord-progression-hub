terraform {
  required_version = "= 1.6.6"
  cloud {
    organization = "chord-progression-hub"

    workspaces {
      name = "stage"
    }
  }
}
