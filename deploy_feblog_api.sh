#!/bin/bash
cd /root/feblog/feblog-api

echo '##########START##########'
echo
echo '1. git pull origin master...'
git pull origin master

echo
echo
echo '#########################'
echo
echo "2. npm run build..."
# 节约服务器资源， 本地打好包到dist目录
rm -rf dist/*
npm i
npm run build

echo
echo
echo '#########################'
echo
echo "3. pm2 start ..."
# pm2 start npm --name "my-nuxt" -- run start
pm2 restart all
echo
echo
echo '#########################'
echo
echo "4. configuration nginx..."

sudo rm -rf /etc/nginx/conf.d/feblog_api.conf
cd /root/feblog/feblog-api
sudo cp -r nginx/* /etc/nginx/conf.d/
sudo nginx -t
sudo nginx -s reload

echo '###########END###########'


