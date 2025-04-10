#!/usr/bin/env bash


cd /home/ubuntu/event-app-backend
sudo cp -a /home/ubuntu/event-app-backend/tmpappconfig/. /home/ubuntu/event-app-backend/
npm install
npm start:prod

#Stop pm2 Process
#pm2 stop all

#add configuration files from tmpappconfig which are config.json and .env file
#sudo cp -a /home/ubuntu/event-app-backend/tmpappconfig/. /home/ubuntu/event-app-backend/

#delete tmp folder
#sudo rm -rf /home/ubuntu/event-app-backend/tmpappconfig

#remove node module 
#sudo rm -rf /home/ubuntu/event-app-backend/node_modules

#This command is used to change the ownership of the /home/ubuntu/event-app-backend directory and all its contents recursively
#sudo chown -R $(whoami) /home/ubuntu/event-app-backend
#sudo chown -R ubuntu /home/ubuntu/event-app-backend


#ls > /tmp/outputola.txt 2>/tmp/errorola.txt

#pwd > /tmp/outputola2.txt 2>/tmp/errorola2.txt

#
#cd /home/ubuntu/event-app-backend npm install > /tmp/diroutputola.txt 2>/tmp/direrrorola.txt


#ls > /tmp/outputola.txt 2>/tmp/errorola.txt

#install npm modules
#npm install > /tmp/nmpinstalloutputola.txt 2>/tmp/npminstallerrorola.txt
#npm --prefix /home/ubuntu/event-app-backend install > /tmp/nmpinstalloutputola.txt 2>/tmp/npminstallerrorola.txt
#npm --prefix /home/ubuntu/event-app-backend install 2>/tmp/npm_error.log

#Stop pm2 Process
#pm2 stop all > /tmp/pm2outputola.txt 2>/tmp/pm2errorola.txt
