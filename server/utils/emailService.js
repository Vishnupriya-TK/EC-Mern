import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import ejs from 'ejs';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // For self-signed certificates in development
  },
});

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.error('Error with email configuration:', error);
  } else {
    console.log('Email server is ready to take our messages');
  }
});

/**
 * Send password reset email
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email address
 * @param {string} options.name - Recipient name
 * @param {string} options.resetUrl - Password reset URL
 * @returns {Promise<Object>} - Result of the email sending operation
 */
export const sendResetEmail = async ({ email, name, resetUrl }) => {
  try {
    // Read the EJS template
    const templatePath = path.join(__dirname, '../templates/emails/reset-password.ejs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    // Compile the template with data
    const html = ejs.render(template, {
      name,
      resetUrl,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@example.com',
      appName: process.env.APP_NAME || 'E-Commerce App',
      currentYear: new Date().getFullYear(),
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'E-Commerce App'}" <${process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com'}>`,
      to: email,
      subject: 'Password Reset Request',
      html,
      text: `Hello ${name},\n\nYou are receiving this email because you (or someone else) has requested a password reset for your account.\n\nPlease click on the following link to reset your password:\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

/**
 * Send password reset confirmation email
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email address
 * @param {string} options.name - Recipient name
 * @returns {Promise<Object>} - Result of the email sending operation
 */
export const sendPasswordResetConfirmation = async ({ email, name }) => {
  try {
    // Read the EJS template
    const templatePath = path.join(__dirname, '../templates/emails/password-changed.ejs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    // Compile the template with data
    const html = ejs.render(template, {
      name,
      appName: process.env.APP_NAME || 'E-Commerce App',
      supportEmail: process.env.SUPPORT_EMAIL || 'support@example.com',
      currentYear: new Date().getFullYear(),
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'E-Commerce App'}" <${process.env.EMAIL_FROM_ADDRESS || 'noreply@example.com'}>`,
      to: email,
      subject: 'Your Password Has Been Changed',
      html,
      text: `Hello ${name},\n\nThis is a confirmation that the password for your account has been successfully changed.\n\nIf you did not make this change, please contact our support team immediately.\n`,
    });

    console.log('Password change confirmation sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password change confirmation:', error);
    throw new Error('Failed to send password change confirmation');
  }
};

export default {
  sendResetEmail,
  sendPasswordResetConfirmation,
};
