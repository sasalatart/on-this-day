variable "heroku_email" {
  type        = string
  description = "Heroku account email corresponding to the supplied API Key"
  default     = "sa.salatart@gmail.com"
}

variable "heroku_api_key" {
  type = string
}

variable "heroku_app_name" {
  type    = string
  default = "otd-history"
}
