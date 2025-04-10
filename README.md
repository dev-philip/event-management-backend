# EventAppBackend

Course Project for CIS4004

DD Endpoint : // "host": "event-app-db-project.ctjcr9a8iebf.us-east-1.rds.amazonaws.com",

## how to start PM2

`pm2 start npm --name eventapp -- start`

## PM start application on system startup

1. Save the PM2 Process List: `pm2 save`
2. Generate and Run the Startup Script: `pm2 startup`
3. Copy and paste the command into your terminal and execute it from step 2.
4. Reboot : `sudo reboot`
5. Verify : `pm2 status`

## Remove init script via :

`pm2 unstartup systemd`

Writing init configuration in /etc/systemd/system/pm2-ubuntu.service

## HOW TO RUN THIS APPLICATION

1. Download NVM (Node version Manager) from this link `https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe`
2. when Installed successfully open cmd and run this command `nvm install 20.9.0` It will install node version 20.9.0 on your system
3. To confirm it was installed use the commmand `nvm ls` this will list all the version of node you have on your system and the one activated will have an (\* asterick in front if it).
4. Clone repository `https://github.com/dev-philip/event-app-backend.git`
5. Create a new file in the root directory called `.env`
6. Navigate to the root folder and run this command `npm install` then run `npm start`. this will start the backend server for the application

# Create migrations

npx knex migrate:make create_admin_user_table

# Run migrations

npx knex migrate:up <migration_name>

npx knex migrate:up 20240309180054_create_users_table.ts
npx knex migrate:down 20240309180059_create_rso_table.ts

npx knex migrate:latest
npx knex migrate:rollback
npx knex migrate:status

# Run seed data (if you have seed files)

npx knex seed:run

npx knex migrate:down 20240317012804_create_category_table.ts

## how to read codeploy log

cd /opt/codedeploy-agent/deployment-root/deployment-logs/

sudo touch codedeploy-agent-deployments.log

nano /opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log

sudo rm /opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log

npm install 2>/tmp/npm_error.log
After running the deployment, check the /tmp/npm_error.log file for any error messages that might provide clues to the issue

## Create user Migration

npx knex migrate:make create_users_table

## Create RSO Migration

npx knex migrate:make create_rso_table

## Create university Migration

npx knex migrate:make create_university_table
npx knex migrate:make create_rsomember_table

npx knex migrate:up 20240317012804_create_category_table.ts
npx knex migrate:up 20240317014359_create_comment_table.ts

Download Redis for Windows
github.com/tporadowski/redis/releases

## Set up start script on Linux

1. Create start up script to run at startup
   `sudo nano /usr/local/bin/my_startup_script.sh`

2. Add the necessary commands to this script. For example:
   `
   #!/bin/bash
   echo "Server started at $(date)" >> /var/log/startup.log

# Add more commands here

`

3. Make sure the script is executable:
   `sudo chmod +x /usr/local/bin/my_startup_script.sh`

4. Create a systemd Service Unit: Create a new service file in /etc/systemd/system/ called my_startup_script.service
   `sudo nano /etc/systemd/system/my_startup_script.service`

5. Add the following content to the service file:

`[Unit]
Description=My Startup Script
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/my_startup_script.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
`

6. Enable and Start the Service:
   `sudo systemctl daemon-reload`
7. Enable the service to start at boot.
   `sudo systemctl enable my_startup_script.service`
8. Start the service immediately (optional).
   `sudo systemctl start my_startup_script.service`
