# E-Commerce Backend

This is the backend server for the E-Commerce application built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- Password reset functionality
- Product management
- Order processing
- User management (admin)
- Email notifications

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- SMTP email service (e.g., Gmail, SendGrid, Mailtrap)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the server root directory and configure the environment variables (see `.env.example` for reference)
4. Start the development server:
   ```bash
   npm start
   ```

## Email Configuration

This application uses Nodemailer for sending emails. To set up the email service:

1. Create an account with an email service provider (e.g., Gmail, SendGrid, Mailtrap for testing)
2. Update the following environment variables in your `.env` file:

```
# Email Configuration
EMAIL_HOST=your-smtp-host
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USERNAME=your-email@example.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM_NAME="Your App Name"
EMAIL_FROM_ADDRESS=noreply@example.com

# Frontend URL (used in emails)
FRONTEND_URL=http://localhost:3000

# Support Email (used in emails)
SUPPORT_EMAIL=support@example.com
```

### For Gmail SMTP

If you're using Gmail, you'll need to:
1. Enable "Less secure app access" in your Google Account settings, or
2. Use an App Password if you have 2FA enabled
3. Set `EMAIL_HOST=smtp.gmail.com` and `EMAIL_PORT=587`

### For Development/Testing

For development, you can use Mailtrap (https://mailtrap.io/) which captures emails in a staging environment.

## API Documentation

[API documentation will be available at /api-docs when the server is running]

## Environment Variables

See `.env.example` for a list of all required environment variables.

## License

MIT
