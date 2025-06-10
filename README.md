# Puul Challenge - Ezequiel Bello

## Setup Steps

1. Start the database

Run the following script to start the database using Docker:

    ./start-database.sh

This command will launch the database container with the default configuration.

2. Install dependencies

Install the project's dependencies with:

    npm install

3. Apply Prisma migrations

Run the defined migrations to set up the database schema:

    npx prisma migrate deploy

This will ensure the database schema matches the models defined in Prisma.

4. Start the development server

Launch the server in development mode:

    npm run start:dev

The server will be listening on the port specified in your `.env` file.

5. Import the Postman collection

To test the available endpoints, follow these steps:

    - Open Postman.
    - Click the "Import" button.
    - Select the `postman_collection.json` file located in the project root.
    - Once imported, you can start making requests to the API endpoints.

## Additional Notes

- Make sure Docker is running before executing `./start-database.sh`.
- The `.env` file is provided solely for demo and testing purposes.
