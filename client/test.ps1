$DockerRG = ""
$Region = ""
$RegistryName = ""
$AppPlanName = ""
$AppName = ""
$ImageName = ""

az group create --name $DockerRG --location $Region
az acr create -n $RegistryName -g $DockerRG --sku Standard --admin-enabled true
az appservice plan create -n $AppPlanName -g $DockerRG --is-linux
az webapp create -n $AppName -g $DockerRG -p $AppPlanName -i $ImageName

#source: https://azuredevopslabs.com/labs/vstsextend/docker/