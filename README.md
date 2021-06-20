# HotelManagementSystem-Docker-K8s

The project this repository contains is, in essence, a hotel management system. Tourism is an absolutely booming industry, and we plan to capitalize on that popularity and make the entire accommodation arrangement process of vacations and tours easier. The management system will serve as a database of hotels, one that a user can use to book hotels and rooms online and in general, plan their stays at hotels. The functionalities include booking rooms, checking in and checking out and dropping reviews after styas at various hotels. The main objective of the project was DevOps.

The implementation makes use of the following technologies:

- NodeJS, used for the implementation of the backend and the server logic of the web application.
- MySQL, as database to store records for the web applications.
- Kubernetes, for container orchestration and ensuring high availability and scalability.
- Docker, for creating, deploying and running the web application using containers.
- Shell, for automating the creation and deployment of the web application.
- ReactJS, used for handling the web application’s View layer and UI.

### The project structure is as donated by the diagrams below:

![Cloud](https://user-images.githubusercontent.com/85986662/122259218-5f832a00-ceeb-11eb-8350-8826a6b13623.png)

### The database structure is as donated the ER diagram below;

![ER](https://user-images.githubusercontent.com/85986662/122259326-80e41600-ceeb-11eb-8e71-9a5c6291d896.png)

### A few screenshots of the running system:

![295](https://user-images.githubusercontent.com/85986662/122261627-07015c00-ceee-11eb-90a6-9c1eed4451c3.PNG)

![296](https://user-images.githubusercontent.com/85986662/122261649-09fc4c80-ceee-11eb-8bce-47c6a7dae591.PNG)

![297](https://user-images.githubusercontent.com/85986662/122261668-0ec10080-ceee-11eb-95f1-d29c25adb394.PNG)

![298](https://user-images.githubusercontent.com/85986662/122261685-11235a80-ceee-11eb-8b83-5477ef1be0b2.PNG)

# Directory Structure

Also present in directory_struct.txt
.
├── client
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── nginx
│   │   └── default.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── Components
│   │   ├── bookroom.component.js
│   │   ├── checkin.component.js
│   │   ├── checkout.component.js
│   │   ├── landing.component.js
│   │   ├── login.component.js
│   │   ├── review.component.js
│   │   └── signup.component.js
│   ├── Constants
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── resort.jpg
│   └── setupTests.js
├── database
│   ├── Dockerfile
│   └── init
│   └── 01.sql
├── deploy.sh
├── directory_struct.txt
├── docker-compose.yml
├── k8s
│   ├── client-cluster-ip-service.yml
│   ├── client-deployment.yml
│   ├── database-persistent-volume-claim.yml
│   ├── ingress-service.yml
│   ├── mysql-cluster-ip-service.yml
│   ├── mysql-deployment.yml
│   ├── server-cluster-ip-service.yml
│   └── server-deployment.yml
├── nginx
│   ├── default.conf
│   └── Dockerfile.dev
├── README.md
└── server
├── Dockerfile
├── Dockerfile.dev
├── index.js
├── keys.js
├── package.json
└── package-lock.json

11 directories, 49 files

# Usage

## Requirements

- GNU Make (available in your package manager of preference)

If you wish to play with it without locally installing Postgres and
Node you can take advantage of `docker` and `docker-compose` which
would help you build the container images and setup a working
environment for you:

- Docker: https://docs.docker.com/engine/installation/
- Docker Compose: https://docs.docker.com/compose/install/

If you want to try this out within a Kubernetes environment this is
all you need:

- Kubectl: https://kubernetes.io/docs/tasks/tools/install-kubectl/
- Minikube: https://kubernetes.io/docs/tasks/tools/install-minikube/

## Usage with Docker

Once `docker` and `docker-compose` are installed run `docker-compose up --build`.

This will trigger the pulling and building of the necessary images and
will use `docker-compose` to setup the app and the MySQL
containers.

Once the Postgres MySQL starts up (note that it may take a few
minutes until it starts accepting connections the first time) it will automatically
run the database migrations using the .sql scripts in `init` directory.

After everything is up and running you can start using the app
running on port `localhost:3050` in browser of your choice.

The MySQL database data directory is setup to be mounted in the
`data/db` directory at the root of the project. In case you want to
start afresh just issue `rm -rf data`.

## Usage with Minikube + Kubernetes

### (OPTIONAL STEP; images have already been pushed to the docker hub public repository https://hub.docker.com/repository/docker/waleedakramkhann/hotelclient)

1. Create an image for `client` and push it to dockerhub:
   1.1. Move to `client` directory `cd client/`
   1.2. Build the image with Dockerfile `docker build -t <hub-user>/hotelclient .`
   Note that we are inside `client` directory. `<hub-user>/hotelclient` would be name of our image
   1.3. You can check your newly built image using `docker images`
   1.4. Push the images to Dockerhub `docker push <hub-user>/hotelclient`

### (OPTIONAL STEP; images have already been pushed to the docker hub public repository https://hub.docker.com/repository/docker/waleedakramkhann/hotelserver)

2. Create an image for `server` and push it to dockerhub:
   2.1. Move to `server` directory `cd server/`
   2.2. Build the image with Dockerfile `docker build -t <hub-user>/hotelserver .`
   Note that we are inside `server` directory. `<hub-user>/hotelserver` would be name of our image
   2.3. You can check your newly built image using `docker images`
   2.4. Push the images to Dockerhub `docker push <hub-user>/hotelserver`

### (OPTIONAL STEP; images have already been pushed to the docker hub public repository https://hub.docker.com/repository/docker/waleedakramkhann/hoteldb)

3. Create an image for `database` and push it to dockerhub:
   2.1. Move to `database` directory `cd database/`
   2.2. Build the image with Dockerfile `docker build -t <hub-user>/hoteldb .`
   Note that we are inside `database` directory. `<hub-user>/hoteldb` would be name of our image
   2.3. You can check your newly built image using `docker images`
   2.4. Push the images to Dockerhub `docker push <hub-user>/hoteldb`

### You can either follow these steps or run bash deploy.sh

4. Start the `minikube` via `minikube start`.

5. Enable the Ingress controller:
   5.1. Enable the NGINX Ingress controller using `minikube addons enable ingress`
   5.2. Verify that the NGINX Ingress controller is running `kubectl get pods -n ingress-nginx`
   _Add screenshot here_

6. Generate an Opqaue Secret to hold password for MySQL database server
   6.1 Generate an opaque secret using `kubectl create secret generic mysqlpassword --from-literal MYSQLPASSWORD=<your-password>`
   6.2 Verify that the secret has been generated using `kubectl get secrets`
7. Create all deployments and services using `kubectl apply -f k8s`
8. Confirm that all pods are up and running using `kubectl get pods`
   _add screenshot here_
9. Get the name (\$POD) of MySQL pod using `kubectl get pod -l component=mysql -o name`
10. Get the password (\$PASSWORD) for MySQL database server using `kubectl get secrets mysqlpassword -grep MYSQLPASSWORD | grep -v f:s | awk -F '"' '{print$4}' | base64 --decode`
11. Initialize the database using `kubectl -n default exec -i $POD -- mysql -u root -p$PASSWORD < ~HotelManagementSystem-Docker-K8s/database/init/01.sql`
12. Get the IP address ($IP-ADDRESS) and port ($PORT) using `kubectl get ingress`
    _add screenshot here_
13. After everything is up and running you can start using the app running on port `$IP-ADDRESS:$PORT` in browser of your choice.
