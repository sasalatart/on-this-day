terraform {
  required_version = ">= 0.12.24"

  backend "remote" {
    organization = "on-this-day"

    workspaces {
      name = "on-this-day"
    }
  }
}

provider "heroku" {
  email   = var.heroku_email
  api_key = var.heroku_api_key
}

resource "random_id" "app_salt" {
  byte_length = 4
}

resource "heroku_app" "app" {
  name   = "onthisday-${random_id.app_salt.dec}"
  region = "us"
}

resource "heroku_addon" "mongodb" {
  app  = heroku_app.app.name
  plan = "mongolab:sandbox"
}
