# Security Tips

The security and privacy of your data are a top priority. As this is a client-side application, here are some important tips to keep in mind.

## For Users

### API Key Security

- **Your Key is Stored Locally**: The Google Gemini API key you provide is stored **only in your browser's local storage**. It is never sent to, or stored on, any server other than Google's own API endpoints during requests.
- **Use on Trusted Devices**: Avoid using this application and entering your API key on public or shared computers. If you must, always ensure you log out of your Google account and clear the browser's local storage when you are finished.
- **Do Not Share Your Key**: Treat your API key like a password. Do not share it publicly or commit it to any public code repositories.
- **Monitor Usage**: Keep an eye on your Google Cloud Platform billing dashboard to monitor the usage of your API key.

### Resume Data

- **Client-Side Processing**: All resume processing happens directly in your browser. Your resume data is not saved or logged anywhere. Once you close the browser tab, the data is gone.

## For Developers

- **No Server-Side Storage**: The application is designed to be fully client-side. Do not introduce any server-side components that would store user data or API keys.
- **Environment Variables for Development**: When developing locally, use a `.env` file to store your API key and ensure `.env` is listed in your `.gitignore` file to prevent accidental commits.
- **Dependency Audits**: Regularly audit dependencies for known security vulnerabilities.
