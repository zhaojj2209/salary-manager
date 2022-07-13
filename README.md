# Salary Manager

This project uses Express.js and Sequelize with PostgreSQL as the backend, and React as the frontend.

## Setting environment variables
In the `client` and `server` directories, clone `.env.example`, then rename the copy of the file to `.env`. Update the environment variables in `.env` as necessary.

The environment variables for the backend are as follows:
- `PORT`: Port for the backend to listen to. Default: 8080
- `DOMAIN`: Domain for the backend API (make sure this is the same localhost port as `PORT`). Default: http://localhost:8080
- `DEV_DATABASE`: Name of the database table used for development. Default: dev-users
- `DEV_DATABASE`: Name of the database table used for testing. Default: test-users
- `DATABASE`: Name of the database table used for production. Default: users
- `USERNAME`: Your PostgreSQL username.
- `PASSWORD`: Your PostgreSQL password.

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