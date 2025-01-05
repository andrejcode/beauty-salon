# Beauty Salon

Welcome to the Beauty Salon! This project is a monorepo containing both the client and server components of a web application for a beauty salon. Users can book appointments, view their appointment history, and access specific functionalities depending on their role (user or admin).

---

## Table of Contents

1. [Features](#features)
2. [Future Features](#future-features)
3. [Technologies](#technologies)
   - [Server](#server)
   - [Client](#client)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Instructions](#instructions)
5. [Docker](#docker)
6. [Inspiration](#inspiration)

---

## Features

- Create an account for authentication.
- Book appointments for various services.
- View upcoming and past appointments.
- Cancel appointments.
- Admin can view all upcoming appointments.

---

## Future Features

- **Payments:**

  - Enable users to pay for appointments in advance to reduce cancellations.

- **Admin Enhancements:**

  - Update salon services, employee and other database tables.
  - View insights on revenue and employee performance.

- **Employee Improvements:**
  - We currently assume that all employees can perform all services. To enhance this functionality, we need to assign specific service categories to employees. This will ensure that only employees qualified to perform a particular service are displayed during the booking process.

---

## Technologies

### Server:

| **Technology**   | **Purpose**                 |
| ---------------- | --------------------------- |
| TypeScript       | Programming Language        |
| Express.js       | Backend Framework           |
| PostgreSQL       | Database                    |
| TypeORM          | Object Relational Mapper    |
| Vitest           | Testing Framework           |
| ESLint, Prettier | Linting and Code Formatting |

### Client:

| **Technology**     | **Purpose**                 |
| ------------------ | --------------------------- |
| TypeScript         | Programming Language        |
| React              | Frontend Framework          |
| Vite               | Build Tool                  |
| Playwright, Vitest | Testing Frameworks          |
| ESLint, Prettier   | Linting and Code Formatting |

---

## Getting Started

### Prerequisites:

- Node.js and npm installed.
- Docker (optional but recommended).

### Instructions:

1. Clone the repository.
2. Navigate to the project directory: `cd beauty-salon`
3. Install dependencies: `npm install`
4. Create a PostgreSQL database.
5. Setup `.env` file in `server` based on `.env.example`.

#### Server:

- Navigate to the server folder: `cd server`.
- Seed the database: `npm run seed`.
- Run the development server: `npm run dev`.

#### Client:

- Navigate to the client folder: `cd client`.
- Run the development server: `npm run dev`.

---

## Docker

To start the application with Docker:

1. Start the application:

   ```bash
   docker compose up
   ```

2. Seed the database:

   ```bash
   docker compose exec api npm run seed
   ```

3. If issues arise, rebuild the images:

   ```bash
   docker compose build
   docker compose up
   ```

4. Perform both operations together:

   ```bash
   docker compose up --build
   ```

Visit the app at [http://localhost:3001](http://localhost:3001).

---

## Inspiration

The web app is inspired by the features and design elements found in the following websites:

1. [Palast of Beauty](https://palast-of-beauty.de/)
2. [Salonized Booking Widget](https://salonized.com/en/features/booking-widget)

---

We hope you enjoy using the Beauty Salon application!
