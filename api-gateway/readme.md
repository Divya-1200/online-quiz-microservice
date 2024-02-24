docker build -t api-gateway .

docker run -d -p 80:80 api-gateway