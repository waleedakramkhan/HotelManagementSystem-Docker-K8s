#!/bin/bash

echo "Checking Kubernetes status..."

minikube status

if (( $? != 0 )); then
	echo "Kubernetes is NOT running! :("
	# exit 1
    echo "Starting Kubernetes..."

    minikube start

    if (( $? != 0 )); then
        echo "Kubernetes startup FAILED! :("
        exit 1
    fi

    echo "Kubernetes startup SUCCESSFUL! :)"
else
	echo "Kubernetes status check SUCCESSFUL! :)"
fi

echo "Enabling minikube ingress..."

minikube addons enable ingress

if (( $? != 0 )); then
	echo "Ingress addon enabling FAILED! :("
	exit 1
fi

echo "Ingress addon enabled SUCCESSFULLY! :)"

echo "Starting Kubernetes clean up..."

kubectl delete -f k8s

if (( $? != 0 )); then
	echo "Kubernetes clean up FAILED! :("
	exit 1
fi

echo "Kubernetes clean up SUCCESSFUL! :)"

kubectl delete secret mysqlpassword

echo "Enter password to create an opqaue secret for MySQL server."
password=""
echo -n "Enter Password: "
read -s password
kubectl create secret generic mysqlpassword --from-literal MYSQLPASSWORD=$password
echo "Opqaue secret for MySQL server created SUCCESSFUL! :)."

echo "Building Kubernetes deployments and services..."

kubectl apply -f k8s

if (( $? != 0 )); then
	echo "Kubernetes builds FAILED! :("
	exit 1
fi

echo "Kubernetes builds SUCCESSFUL! :)"

# echo "Initializing the database..."

# POD=$(kubectl get pod -l component=mysql -o name)

# PASSWORD=$(kubectl get secrets mysqlpassword -grep MYSQLPASSWORD | grep -v f:s | awk -F '"' '{print$4}' | base64 --decode)

# kubectl -n default exec -i $POD -- mysql -u root -p$PASSWORD < /home/lordvader/Desktop/itcc/project/hotelmanagementsystem/database/init/01.sql

# if (( $? != 0 )); then
# 	echo "Database initialization FAILED! :("
# 	exit 1
# fi

# echo "Database initialization SUCCESSFUL!. App is ready to use. :)"

echo "App is ready to use. :)"

echo "Go to http://192.168.99.100/"

x-www-browser http://192.168.99.100/