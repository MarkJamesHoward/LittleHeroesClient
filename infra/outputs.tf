output "static_web_app_url" {
  value = azurerm_static_web_app.main.default_host_name
}

output "azure_client_id" {
  value = azuread_application.github_deploy.client_id
}

output "azure_tenant_id" {
  value = data.azuread_client_config.current.tenant_id
}

output "azure_subscription_id" {
  value = data.azurerm_subscription.current.subscription_id
}
