provider "aws" {
  region  = "us-west-2"
}

terraform {
  
  required_providers {
    aws = { 
      source = "hashicorp/aws"
      version = "4.37.0"
    }
  }

  backend "s3" {
    encrypt        = true
    key            = "web-app.tfstate"
    bucket         = "prod-fief-terraform-state"
    dynamodb_table = "prod-fief-terraform-state-lock"
    region         = "us-west-2"
  }
}

locals {
  remote_state_bucket  = "prod-fief-terraform-state"
  backend_region       = "us-west-2"
  vpc_remote_state_key = "vpc.tfstate"
}

data "terraform_remote_state" "vpc" {
  backend = "s3"
  config = {
    region = local.backend_region
    bucket = local.remote_state_bucket
    key    = local.vpc_remote_state_key
  }
}
