terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 3.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "azuread" {}

provider "github" {
  owner = split("/", var.github_repo)[0]
}

data "azurerm_subscription" "current" {}
data "azuread_client_config" "current" {}

# -------------------------------------------------------
# Reference existing Resource Group (created by API terraform)
# -------------------------------------------------------
data "azurerm_resource_group" "main" {
  name = var.resource_group_name
}

# -------------------------------------------------------
# Azure Static Web App (Free tier)
# -------------------------------------------------------
resource "azurerm_static_web_app" "main" {
  name                = var.app_name
  location            = var.static_web_app_location
  resource_group_name = data.azurerm_resource_group.main.name
  sku_tier            = "Free"
  sku_size            = "Free"
}

# -------------------------------------------------------
# Azure AD App Registration & Service Principal (for GitHub Actions OIDC)
# -------------------------------------------------------
resource "azuread_application" "github_deploy" {
  display_name = "${var.app_name}-github-deploy"
  owners       = [data.azuread_client_config.current.object_id]
}

resource "azuread_service_principal" "github_deploy" {
  client_id = azuread_application.github_deploy.client_id
  owners    = [data.azuread_client_config.current.object_id]
}

resource "azuread_application_federated_identity_credential" "github_master" {
  application_id = azuread_application.github_deploy.id
  display_name   = "github-actions-master"
  description    = "GitHub Actions deploying from master branch"
  audiences      = ["api://AzureADTokenExchange"]
  issuer         = "https://token.actions.githubusercontent.com"
  subject        = "repo:${var.github_repo}:ref:refs/heads/master"
}

# -------------------------------------------------------
# Role Assignment - Contributor on Resource Group
# -------------------------------------------------------
resource "azurerm_role_assignment" "github_deploy_contributor" {
  scope                = data.azurerm_resource_group.main.id
  role_definition_name = "Contributor"
  principal_id         = azuread_service_principal.github_deploy.object_id
}

# -------------------------------------------------------
# GitHub Actions Secrets (OIDC credentials)
# -------------------------------------------------------
resource "github_actions_secret" "azure_client_id" {
  repository      = split("/", var.github_repo)[1]
  secret_name     = "AZURE_CLIENT_ID"
  plaintext_value = azuread_application.github_deploy.client_id
}

resource "github_actions_secret" "azure_tenant_id" {
  repository      = split("/", var.github_repo)[1]
  secret_name     = "AZURE_TENANT_ID"
  plaintext_value = data.azuread_client_config.current.tenant_id
}

resource "github_actions_secret" "azure_subscription_id" {
  repository      = split("/", var.github_repo)[1]
  secret_name     = "AZURE_SUBSCRIPTION_ID"
  plaintext_value = data.azurerm_subscription.current.subscription_id
}

# -------------------------------------------------------
# Store Static Web App deployment token as GitHub secret
# -------------------------------------------------------
resource "github_actions_secret" "swa_deployment_token" {
  repository      = split("/", var.github_repo)[1]
  secret_name     = "AZURE_STATIC_WEB_APPS_API_TOKEN"
  plaintext_value = azurerm_static_web_app.main.api_key
}
