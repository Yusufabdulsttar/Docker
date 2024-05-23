# My Dockerized Node.js Application

This project is a simple Node.js application containerized with Docker, along with Nginx, Redis, MongoDB, and Mongo Express services. Below are the details and instructions to set up and run the project.

## Project Structure

- `My-App/`: Directory containing the Node.js application.
- `Dockerfile`: Dockerfile to build the Node.js application image.
- `docker-compose.yml`: Docker Compose file to orchestrate the services.

## Services

1. **Node.js Application (`my-app`)**
   - A simple Node.js application serving an HTML page.
   - Docker image pushed to Docker Hub.

2. **Nginx**
   - Acts as a web server and reverse proxy for the Node.js application.

3. **MongoDB**
   - Database service to store application data.

4. **Mongo Express**
   - Web-based MongoDB admin interface.

5. **Redis**
   - In-memory data structure store for caching and message brokering.

## Setup Instructions

### Prerequisites

- Docker installed on your system.
- Docker Compose installed on your system.

### Steps to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/Yusufabdulsttar/Docker.git && cd Docker/ 
2. Start the services using Docker Compose:
   ```bash
   docker-compose up

### Accessing the Services

- **Node.js Application**: Open your browser and navigate to [http://localhost](http://localhost).
  - Nginx will redirect the request to the Node.js application.

- **Mongo Express**: Open your browser and navigate to [http://localhost:8081](http://localhost:8081).
  - You can manage your MongoDB instance through this interface.

- **Redis**:
  - To set a value in Redis: Open your browser and navigate to [http://localhost/set](http://localhost/set).
    - This will print "hello yusuf" and set some value in Redis.
  - To get the value from Redis: Open your browser and navigate to [http://localhost/data](http://localhost/data).
    - This will display "hello yusuf" and the value stored in Redis.

## Watchtower
We use a container named Watchtower to monitor if the `my-app` image on Docker Hub has changed. If a new version of the image is detected, Watchtower will automatically pull the new image and replace the existing container with the updated image.

To run Watchtower, use the following command:
```bash
docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_POLL_INTERVAL=30 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower my-app 
```

### This command runs Watchtower with the following options:

- -d: Run the container in detached mode.
- --name watchtower: Name the container "watchtower".
- -e WATCHTOWER_TRACE=true: Enable trace logging for more detailed output.
- -e WATCHTOWER_POLL_INTERVAL=30: Set the poll interval to 30 seconds.
- -v /var/run/docker.sock:/var/run/docker.sock: Mount the Docker socket to allow Watchtower to communicate with the Docker daemon.
- containrrr/watchtower: The Watchtower image.
- my-app: The name of the container to monitor for updates.
