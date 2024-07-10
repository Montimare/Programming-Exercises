# How to start our project on the internet

- Open [http://montilab.duckdns.org:3000/](http://montilab.duckdns.org:3000/)

> Note: Website may be temporarily down for maintenance that is not connected to this Project.

# How to start our project locally

## Linux

1. [Install Docker.](https://docs.docker.com/desktop/install/linux-install/)
2. Start Docker (on some machines it starts with: `sudo systemctl start docker`).
3. Navigate to the root folder of the Project.
4. Run `sudo docker compose up -d --build database` .
5. Run `sudo docker compose up -d --build frontend` .
6. Wait for the Databse to finish building.

> You can check the status of the database by running `sudo docker ps` .
>
> - **`Up 30 seconds (health: starting)`** indicates that you need to wait a bit longer.
>
> - **`Up 40 seconds (healthy)`** indicates that the container is ready to be used.
>
> This process usually takes 40 seconds on our testing machine.

7. After the Databse finished building you can start the backend using `sudo docker compose up -d --build backend` .
8. Open [http://localhost:3000/](http://localhost:3000/) in your browser.

### Possible Issues

If the backend is started too early it will be in a state that won't connect to the database. You can check this by opening [http://localhost:8000/](http://localhost:8000/) . If no site is being displayed and your browser throws an error (usually about the connection being reset) then you need to restart the backend container manually.

To restart your backend container manually:

1. Run `sudo docker compose down backend` .

> You can check the status of the database by running `sudo docker ps` .
>
> - **`Up 30 seconds (health: starting)`** indicates that you need to wait a bit longer.
>
> - **`Up 40 seconds (healthy)`** indicates that the container is ready to be used.
>
> This process usually takes 40 seconds on our testing machine.

2. Run `sudo docker compose up -d --build backend` .

## Windows

1. Install Docker Desktop.
2. Start Docker.
3. In Powershell: Navigate to the root folder of the Project.
4. Run `docker compose up -d --build database` .
5. Run `docker compose up -d --build frontend` .
6. Wait for the Databse to finish building.

> You can check the status of the database by running `docker ps` .
>
> - **`Up 30 seconds (health: starting)`** indicates that you need to wait a bit longer.
>
> - **`Up 40 seconds (healthy)`** indicates that the container is ready to be used.
>
> This process usually takes 40 seconds on our testing machine.

7. After the Databse finished building you can start the backend using `docker compose up -d --build backend` .
8. Open [http://localhost:3000/](http://localhost:3000/) in your browser.

### Possible Issues

If the backend is started too early it will be in a state that won't connect to the database. You can check this by opening [http://localhost:8000/](http://localhost:8000/) . If no site is being displayed and your browser throws an error (usually about the connection being reset) then you need to restart the backend container manually.

To restart your backend container manually:

1. Run `docker compose down backend` .

> You can check the status of the database by running `docker ps` .
>
> - **`Up 30 seconds (health: starting)`** indicates that you need to wait a bit longer.
>
> - **`Up 40 seconds (healthy)`** indicates that the container is ready to be used.
>
> This process usually takes 40 seconds on our testing machine.

2. Run `docker compose up -d --build backend` .
