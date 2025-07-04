# Puul Challenge - Ezequiel Bello

1. Start the database

Run the following script to start the database using Docker:

    ./start-database.sh

> Note: This script is designed to run on Unix-like systems (Linux or macOS). On Windows, you may need to adapt it or run it within WSL (Windows Subsystem for Linux).

This command will launch the database container with the default configuration.

2. Install dependencies

Install the project's dependencies with:

    npm install

3. Generate Prisma Client

Generate the Prisma Client code based on the current schema:

    npx prisma generate

This step ensures that your application has the necessary client code to interact with the database.

4. Apply Prisma migrations

Run the defined migrations to set up the database schema:

    npx prisma migrate deploy

This will ensure the database schema matches the models defined in Prisma.

5. Start the development server

Launch the server in development mode:

    npm run start:dev

The server will be listening on the port specified in your `.env` file.

6. Import the Postman collection

To test the available endpoints, follow these steps:

    - Open Postman.
    - Click the "Import" button.
    - Select the `postman_collection.json` file located in the project root.
    - Once imported, you can start making requests to the API endpoints.

## Additional Notes

- Make sure Docker is running before executing `./start-database.sh`.
- The `.env` file is provided solely for demo and testing purposes.
