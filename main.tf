terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}

variable "app" {
  type    = string
  default = "sleekdom"
}

variable "stage" {
  type    = string
  default = "development"

  validation {
    condition     = contains(["development", "production"], var.stage)
    error_message = "Allowed values for stage are \"development\" or \"production\"."
  }
}

provider "aws" {
  profile = "default"
  region  = var.region
}

resource "aws_cognito_user_pool_domain" "domain" {
  domain       = "${var.app}-${var.stage}"
  user_pool_id = aws_cognito_user_pool.pool.id
}
