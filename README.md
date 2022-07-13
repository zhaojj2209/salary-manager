# Salary Manager

This project uses Express.js and Sequelize with PostgreSQL as the backend, and React as the frontend.

## Setting environment variables
In the `client` and `server` directories, clone `.env.example`, then rename the copy of the file to `.env`. Update the environment variables in `.env` as necessary.

The environment variables for the backend are as follows:
- `PORT`: Port for the backend to listen to. Default: 8080
- `DEV_DB_NAME`: Name of the database table used for development. Default: dev-users
- `TEST_DB_NAME`: Name of the database table used for testing. Default: test-users
- `DB_NAME`: Name of the database table used for production. Default: users
- `DB_HOST`: Name of the database host. Default: localhost
- `DB_PORT`: Port for the database to listen to. Default: 5432
- `DB_USERNAME`: Your PostgreSQL username.
- `DB_PASSWORD`: Your PostgreSQL password.

The environment variables for the frontend are as follows:
- `REACT_APP_BACKEND_URL`: The backend URL. Set this to be the same as the backend environment variable `DOMAIN`.

## Running/testing the backend

Before running the server, ensure that the databases have been created in PostgreSQL.
From the root project directory:
```
cd server
yarn # install dependencies
yarn start # run server
yarn test # testing
```

## Running/testing the frontend

From the root project directory:
```
cd client
yarn # install dependencies
yarn start # run server
yarn test # testing
```

## Running using Docker
In the root directory, clone `.env.example`, then rename the copy of the file to `.env`. Update the environment variables in `.env` as necessary.

The environment variables for Docker are as follows:
- `DB_PORT`: Port for the database to listen to. Default: 5432
- `DB_NAME`: Name of the database table used. Default: users
- `DB_USERNAME`: Your PostgreSQL username.
- `DB_PASSWORD`: Your PostgreSQL password.

Then, run the following command from the root project directory:
```
docker-compose up -d
```
If the backend does not connect to the database, wait for the database to finish setting up, then restart the backend container.