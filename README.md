Bank transaction

This is a small webApp for play with the fullstack.
The backend is done in java (springboot and maven)
The frontend is React

Installation:
go to bankApp and: $mvn clean package && mvn -e spring-boot:run
the server willle be listenning in localhost:8080/

in other terminal, go to bankview and: $npm install && $npm start

Enjoy :)

Added docker image for the service available in:
https://hub.docker.com/r/zetarules/bank-service

for pull: docker pull zetarules/bank-service
for run service: sudo docker run -p 8000:8080 bank-service (8000 por is where call the front end)

