# Technical Test Application

## Instructions to run application

- Clone the repo from [https://github.com/rob-bowen/front-end-test.git](https://github.com/rob-bowen/front-end-test.git) or unzip this archive.
- Change into the root directory, alongside the docker-compose.yml file.
- Run `docker-compose build`
- Run `docker-compose up`
- The project will now be running at [http://localhost:8000](http://localhost:8000/). The project will be running in a live reloading development environment, with changes made to the files being available after a short pause.
- If on attempting to hit the endpoint, you get an nginx error (502 - Bad Gateway), give it a moment before trying the endpoint again.

## Running an extra commands on the client application container (If required).

If you wish to run any commands on the client application's container then you can run `docker-compose exec client bash` to get a command prompt inside the container.
