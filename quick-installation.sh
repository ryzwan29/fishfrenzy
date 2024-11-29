#!bin/bash

clear
echo -e "\033[1;32m
██████╗ ██╗   ██  ███████╗  ███████╗  ███████╗  
██╔══██╗ ██╗ ██║  ██║   ██║ ██║   ██║ ██║   ██║
██████╔╝  ████║   ██║   ██║ ██║   ██║ ██║   ██║
██╔══██╗   ██╔╝   ██║   ██║ ██║   ██║ ██║   ██║
██║  ██║   ██║    ███████║  ███████║  ███████║
╚═╝  ╚═╝   ╚═╝    ╚══════╝  ╚══════╝  ╚══════╝
\033[0m"
echo -e "\033[1;34m==================================================\033[1;34m"
echo -e "\033[1;34m@Ryddd | Testnet, Node Runer, Developer, Retrodrop\033[1;34m"

sleep 4

# Update package
echo -e "\033[1;32Update & Upgrade package...\033[0m"
sudo apt update && sudo apt upgrade -y
sudo apt install git -y

# Install Nodejs
echo -e "\033[0;32mInstall Nodejs via nvm-list...\033[0m"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm list-remote
read -p "Select your Node.js version: " NODEJS_USER
nvm install $NODEJS_USER

# Clone github repository
echo -e "\033[0;32mClone github repository...\033[0m"
git clone https://github.com/ryzwan29/fishfrenzy.git
cd fishfrenzy

# Install depedencies
echo -e "\033[0;32mInstalling requirements depedencies...\033[0m"
npm install
