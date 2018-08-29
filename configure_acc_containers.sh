#git pull, 
docker exec fa24 sh -c "cd /notebooks/VIST_DemoWeb_mTURK"
docker exec fa24 git pull origin master  
docker exec fa24 sh -c "cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server"

docker exec 1b9e cd /notebooks/VIST_DemoWeb_mTURK
docker exec 1b9e git pull origin master  
docker exec 1b9e cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server

docker exec 05c9 sh -c "cd /notebooks/VIST_DemoWeb_mTURK"
docker exec 05c9 git pull origin master 
docker exec -it 05c9 sh -c "cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server"

docker exec 10f6 cd /notebooks/VIST_DemoWeb_mTURK
docker exec 10f6 git pull origin master 
docker exec 10f6 cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server

docker exec 699e cd /notebooks/VIST_DemoWeb_mTURK
docker exec 699e git pull origin master 
docker exec 699e cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server

docker exec d596 cd /notebooks/VIST_DemoWeb_mTURK
docker exec d596 git pull origin master 
docker exec d596 cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server

docker exec 82c1 cd /notebooks/VIST_DemoWeb_mTURK
docker exec 82c1 git pull origin master 
docker exec 82c1 cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server

docker exec 5c8e cd /notebooks/VIST_DemoWeb_mTURK
docker exec 5c8e git pull origin master 
docker exec 5c8e cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server

docker exec 7d2c cd /notebooks/VIST_DemoWeb_mTURK
docker exec 7d2c git pull origin master 
docker exec 7d2c cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server

docker exec 5d80 cd /notebooks/VIST_DemoWeb_mTURK
docker exec 5d80 git pull origin master 
docker exec 5d80 cd /notebooks/VIST_DemoWeb_mTURK/webstorm_server


#install nodemon
docker exec fa24 npm install nodemon
docker exec 1b9e npm install nodemon
docker exec 05c9 npm install nodemon
docker exec 10f6 npm install nodemon
docker exec 699e npm install nodemon
docker exec d596 npm install nodemon
docker exec 82c1 npm install nodemon
docker exec 5c8e npm install nodemon
docker exec 7d2c npm install nodemon
docker exec 5d80 npm install nodemon

cd webstorm_server 
npm install nodemon 

