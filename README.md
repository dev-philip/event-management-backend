# EventAppBackend

Course Project for CIS4004

## HOW TO RUN THIS APPLICATION

1. Download NVM (Node version Manager) from this link `https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe`
2. when Installed successfully open cmd and run this command `nvm install 20.9.0` It will install node version 20.9.0 on your system
3. To confirm it was installed use the commmand `nvm ls` this will list all the version of node you have on your system and the one activated will have an (\* asterick in front if it).
4. Clone repository
5. Create a new file in the root directory called `.env` and `config.json`. It will contains all the credentials to run the project like MYSQL connection. You get that from the admin or you can create yours.
6. Navigate to the root folder and run this command `npm install` then run `npm start`. this will start the backend server for the application

## how to start PM2 on linux server

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

## Create user Migration

npx knex migrate:make create_users_table

## Create university Migration

npx knex migrate:make create_university_table

npx knex migrate:up 20240317012804_create_category_table.ts

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
