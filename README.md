😎

---

# Node Auth Starter

Welcome to **Node Auth Starter**, a comprehensive template for creating robust authentication systems using Node.js, Express.js, and Pug, with the power of TypeScript. This project facilitates user registration, authentication, and password recovery, backed by MongoDB and Mongoose for database management. It's equipped to handle authentication with JWT for secure sessions, plus Mailtrap for email testing.

## Features

- **User Registration and Authentication**: Complete setup including Google OAuth.
- **Password Recovery**: Secure process allowing users to reset their passwords.
- **JWT Session Management**: Server-side JWT for secure and stateless session management.
- **TypeScript**: Project written in TypeScript for better developer experience and maintainability.
- **Pug Templating**: Use Pug for dynamic HTML rendering.
- **Email Integration**: Test email functionality using Mailtrap.
- **MongoDB with Mongoose**: Robust database management with Mongoose.
- **Responsive Design**: Works great on both desktop and mobile devices.
- **OAuth**: Local authentication implementing a use example of OAuth standard.
- **Middlewares**: Example of how to use middlewares to validate forms.

## Prerequisites

Ensure you have the following installed on your development machine:

- Node.js (v14.x or later)
- npm (v6.x or later)

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/javibueno21/useless_project_backend
   cd useless_project_backend
   ```

2. Install NPM packages:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following contents:

   ```
    SERVER_PORT=3000
    MONGOOSE_CONNECTION_URL=mongodb://<your-database-url>:27017/<your-db-name>
    JWT_SECRET=<your-jwt-secret>
    MAILTRAP_HOST=<mailtrap-host>
    MAILTRAP_PORT=<mailtrap-port>
    MAILTRAP_USER=<mailtrap-user>
    MAILTRAP_PASS=<mailtrap-password>
    OAUTH_LOCAL_SECRET=<your-oauth-local-secret>
    OAUTH_LOCAL_ISSUER=<your-domain>
    OAUTH_LOCAL_AUDIENCE=<your-audience>
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

   Visit `https://localhost:3000` to see the application in action.

## Project Structure

- **/src**: TypeScript source files.
- **/views**: Pug templates.
- **/public**: Static files like stylesheets and images.
- **/config**: Configuration files.
- **/controllers**: Express route controllers.
- **/models**: Database models (Mongoose).
- **/middlewares**: Express route middlewares

## Contributing

Contributions make the open source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Javier Rodriguez Bueno - javibueno21

Project Link: [https://github.com/javibueno21/useless_project_backend](https://github.com/javibueno21/useless_project_backend)
