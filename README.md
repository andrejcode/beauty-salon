# Beauty Salon

Welcome to the Beauty Salon! This project is a monorepo containing both the client and server components of a web application for a beauty salon. Users can book appointments, view their appointment history, leave reviews, and access specific functionalities depending on their role (user or admin).

## Features

- **User:**

  - Create an account for authentication
  - Book appointments for various services
  - View upcoming and past appointments
  - Delete appointments
  - Submit a single review
  - View reviews from other users

- **Admin:**
  - View all upcoming appointments (current functionality)
  - Future functionalities:
    - Update employee information
    - Update salon services
    - Update business hours (start/end times, off days)

## Technologies

- **Server:**

  - Programming language: TypeScript
  - Framework: Express.js
  - Database: PostgreSQL with TypeORM
  - Testing: Vitest
  - Linting/formatting: ESLint, Prettier

- **Client**:
  - Programming language: TypeScript
  - Framework: React
  - Build tool: Vite
  - Testing: Playwright
  - Linting/formatting: ESLint, Prettier

## Getting Started

### Prerequisites:

- Node.js and npm installed
- If you want to use Docker you must also install it

### Instructions:

1. Clone the repository.
2. Navigate to the project directory: `cd beauty-salon`
3. `npm install` to install the dependencies.
4. Create PostreSQL database.
5. Setup `.env` file in `server` based on `.env.example` file.

- **Server:**

  - `cd server` - navigate to server folder
  - `npm run seed` - seed the database
  - `npm run dev` - run the development server

- **Client**:
  - `cd client` - navigate to client folder
  - `npm run dev` - run the development server

## Docker

To start the application run:

`docker compose up`

Make sure to seed the database:

`docker compose exec api npm run seed`

If something goes wrong, you can rebuild the images with `docker compose build` and try `docker compose up` again. You can also perform both operations with `docker compose up --build`.

Visit http://localhost:3001 in your browser.

## Inspiration

The web app is inspired by the features and design elements found in the following two websites:

1. [Palast of Beauty](https://palast-of-beauty.de/)
2. [Salonized Booking Widget](https://salonized.com/en/features/booking-widget)

## Screenshots

<img src="screenshots/screenshot1.png" alt="Beauty Salon Homepage" width="600px" height="auto" />
