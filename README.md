## Arpit Jain ReachIn-Box Assignment

## Role Software Developer

## 1. Environment Setup

1. Ensure you have Node.js and npm installed on your system.

2. Install the required dependencies:

   ```
   npm install express dotenv googleapis openai @azure/msal-node @microsoft/microsoft-graph-client @azure/identity
   ```

3. Set up your `.env` file in the project root with all necessary credentials:
   ```
   GMAIL_CLIENT_ID=your_gmail_client_id
   GMAIL_CLIENT_SECRET=your_gmail_client_secret
   GMAIL_REDIRECT_URI=http://localhost:8080/auth/gmail/callback
   API_KEY=your_openai_api_key
   OUTLOOK_CLIENT_ID=your_outlook_client_id
   OUTLOOK_CLIENT_SECRET=your_outlook_client_secret
   OUTLOOK_REDIRECT_URI=http://localhost:8080/auth/outlook/callback
   OUTLOOK_TENANT_ID=your_outlook_tenant_id
   ```

## 2. Running the Application

1. Start your application:

   ```
   node app.js
   ```

   (Or use `nodemon app.js` for development)

2. Your server should now be running on `http://localhost:8080`

## 3. Testing Gmail Functionality

1. Gmail Authentication:

   - Open a browser and go to `http://localhost:8080/auth`
   - You should be redirected to Google's login page
   - After successful login, you should see "Authentication successful!"

2. Process Gmail Email:
   - Send a test email to the Gmail account you've set up
   - Make a GET request to `http://localhost:8080/process-email/gmail`
   - Check the console for processing logs
   - Verify that a response email was sent and the original email was labeled

## 4. Testing Outlook Functionality

1. Outlook Authentication:

   - Open a browser and go to `http://localhost:8080/auth/outlook`
   - You should be redirected to Microsoft's login page
   - After successful login, you should see "Outlook authentication successful!"

2. Process Outlook Email:
   - Send a test email to the Outlook account you've set up
   - Make a GET request to `http://localhost:8080/process-email/outlook`
   - Check the console for processing logs
   - Verify that a response email was sent and the original email was categorized

## 5. Testing AI Functionality

1. Email Categorization:

   - Check the console logs during email processing
   - Verify that emails are being categorized correctly

2. Response Generation:
   - Review the automated responses sent by the system
   - Ensure they are contextually appropriate and professional

## 6. Error Handling and Edge Cases

1. Invalid Email Provider:

   - Make a GET request to `http://localhost:8080/process-email/invalid`
   - Verify that you receive an appropriate error response

2. No Unread Emails:

   - Process emails when there are no unread messages
   - Verify that the system handles this gracefully

3. Authentication Errors:
   - Try to process emails without proper authentication
   - Ensure the system provides appropriate error messages

## 7. Performance Testing

1. Multiple Emails:

   - Send multiple emails to both Gmail and Outlook accounts
   - Process them in quick succession
   - Monitor system performance and response times

2. Large Emails:
   - Send emails with large bodies or attachments
   - Verify that the system can handle them without timing out

## 8. Security Testing

1. Token Storage:

   - Verify that access tokens are being stored securely
   - Ensure they are not exposed in logs or responses

2. Rate Limiting:

   - Implement and test rate limiting to prevent abuse of your API endpoints

3. Input Validation:
   - Test with various types of malformed input to ensure proper validation and sanitization

Remember to monitor your API usage for both Gmail API, Microsoft Graph API, and Gemini API to avoid exceeding quotas or incurring unexpected costs.

## Overview

Gemini Email Assistant using a Node.js application that automates email processing for both Gmail and Outlook accounts. It uses gemini-pro to categorize incoming emails, generate appropriate responses, and apply labels or categories to the processed emails.

## Features

- Supports both Gmail and Outlook email providers
- AI-powered email categorization
- Automated response generation
- Email labeling and categorization
- OAuth2 authentication for secure access to email accounts

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Gmail account
- Microsoft Azure account with registered application
- Gemini API key

## Setup

1. Clone the repository:

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   # Gmail Configuration
   GMAIL_CLIENT_ID=your_gmail_client_id
   GMAIL_CLIENT_SECRET=your_gmail_client_secret
   GMAIL_REDIRECT_URI=http://localhost:8080/auth/gmail/callback

   # Outlook Configuration
   OUTLOOK_CLIENT_ID=your_outlook_client_id
   OUTLOOK_CLIENT_SECRET=your_outlook_client_secret
   OUTLOOK_TENANT_ID=your_outlook_tenant_id
   OUTLOOK_REDIRECT_URI=http://localhost:8080/auth/outlook/callback

   # OpenAI Configuration
   API_KEY=your_gemini_api_key
   ```

4. Configure OAuth 2.0 credentials:
   - For Gmail: Set up OAuth 2.0 credentials in the Google Cloud Console
   - For Outlook: Register an application in the Azure Portal and configure the necessary permissions

## Usage

1. Start the server:

   ```
   npm start
   ```

2. Authenticate your email accounts:

   - Gmail: Visit `http://localhost:8080/auth/gmail` or `http://localhost:8080/auth`
   - Outlook: Visit `http://localhost:8080/auth/outlook`

3. Process emails:
   - Gmail: `http://localhost:8080/process-email/gmail`
   - Outlook: `http://localhost:8080/process-email/outlook`

## API Endpoints

- `/auth/gmail`: Initiates Gmail authentication
- `/auth/outlook`: Initiates Outlook authentication
- `/process-email/gmail`: Processes the latest unread Gmail email
- `/process-email/outlook`: Processes the latest unread Outlook email
- `/verify-outlook-auth`: Verifies Outlook authentication status

## Why BullMQ wasn't used

by default the email processing is handled synchronously when requested hence was not needed
