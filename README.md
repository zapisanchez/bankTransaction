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

for pull: docker pull zetarules/bank-service:0.0.1-SNAPSHOT

for run service: sudo docker run -p 8080:8080 bank-service (8080 por is where call the front end)

Added docker image for the client available in:
https://hub.docker.com/r/zetarules/react-client
for pull: docker pull zetarules/react-client:0.0.1-SNAPSHOT

for run: docker run -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --rm react-client

