- az group create --name DockerRG --location <region>
- az acr create -n <unique-acr-name> -g DockerRG --sku Standard --admin-enabled true
- az appservice plan create -n myappserviceplan -g DockerRG --is-linux
- az webapp create -n <unique-appname> -g DockerRG -p myappserviceplan -i elnably/dockerimagetest
source: https://azuredevopslabs.com/labs/vstsextend/docker/