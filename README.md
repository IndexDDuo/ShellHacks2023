# ShellHacks2023 - FBI Most Wanted Search

## Description

This project is a simple web application that allows users to search for FBI's most wanted individuals based on specific criteria such as name, field offices (location - city), race, weight, and age. It uses Vercel serverless functions to query the FBI's public API and display the results in a user-friendly manner. The application demonstrates the use of serverless architecture for building scalable and efficient web applications.

## Features

- Search for FBI's most wanted individuals using various filters.
- Serverless architecture, hosted on Vercel.
- Responsive design for optimal viewing on various devices.
- Results displayed with images, names, and descriptions.

## Technology Stack

- **Frontend**: HTML, CSS
- **Backend**: Serverless Functions on Vercel
- **API**: FBI Wanted API
- **Language**: JavaScript

## Project Structure

/project-root
/api
- search.js # Serverless function for handling search requests
/public
- index.html # Main entry point for the application
- style.css # Stylesheet for the application
vercel.json # Configuration file for Vercel deployment
README.md # This README file


## Setup and Deployment

### Prerequisites

- Node.js installed on your local machine.
- Vercel CLI installed globally (`npm i -g vercel`).

### Local Development

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Start the local development server by running `vercel dev`.
4. Open `http://localhost:3000` in your web browser to view the application.

### Deployment to Vercel

1. Ensure you're logged in to Vercel CLI (`vercel login`).
2. Run `vercel` from the root of your project directory to deploy your application.
3. Follow the prompts from the Vercel CLI to finalize your deployment.
4. Access your deployed application using the provided URL from Vercel.

## Usage

- Navigate to the deployed application URL or your local development server.
- Fill in the search criteria in the provided form.
- Click the "Search" button to submit your search.
- View the results displayed below the form.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to propose features or report bugs.

## License

This project is open source and available under the [MIT License](LICENSE).