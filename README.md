# Email Engine Core

A Node.js-based email client core system connecting to Outlook and managing email data using MySQL.

## Setup Instructions

1. Clone the repository.
2. Run `db.sql` file in the root directory.
3. Update the required environment variables in `.env` file in the root directory.
4. Run `docker-compose up --build` to start the application.
5. Access the application at `http://localhost:3000`.

## Environment Variables

- `MYSQL_HOST`: MySQL host (default: `localhost`).
- `MYSQL_USER`: MySQL user (default: `root`).
- `MYSQL_PASSWORD`: MySQL password.
- `MYSQL_DATABASE`: MySQL database name (default: `email_engine`).
- `OUTLOOK_CLIENT_ID`: Outlook OAuth client ID.
- `OUTLOOK_CLIENT_SECRET`: Outlook OAuth client secret.
- `OUTLOOK_CALLBACK_URL`: Outlook OAuth callback URL.
