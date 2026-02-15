variable "resource_group_name" {
  default = "rg-littleheroes"
}

variable "location" {
  default = "newzealandnorth"
}

variable "app_name" {
  default = "littleheroesclient"
}

variable "static_web_app_location" {
  description = "Location for Static Web App (limited regions: westus2, centralus, eastus2, westeurope, eastasia)"
  default     = "eastasia"
}

variable "github_repo" {
  default = "MarkJamesHoward/LittleHeroesClient"
}
