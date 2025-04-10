# add nodejs to yum
curl -sL https://rpm.nodesource.com/setup_lts.x | bash -
yum install nodejs -y #default-jre ImageMagick

# install pm2 module globaly
npm install -g pm2
pm2 update

# delete existing bundle
cd /home/ubuntu
rm -rf event-app-backend









#end of new approach


# Clean up old Artifact
#sudo rm -rf /home/ubuntu/event-app-backend

#This command is used to change the ownership of the /home/ubuntu/event-app-backend directory and all its contents recursively
#sudo chown -R $(whoami) /home/ubuntu/event-app-backend