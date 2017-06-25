#!/bin/sh

# bunch of commands to run on a new vm instance

sudo apt-get -y install redis-server npm git
sudo npm install -g n
sudo n stable
sudo npm install -g npm react-scripts
git clone https://github.com/prak5190/redis-app.git
cd redis-app
npm install
cd public && npm install && npm build && cd ..
npm start
