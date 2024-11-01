
# API

This is an Express.js API built with TypeScript, providing a RESTful service structure with linting, formatting, and API documentation.

## Table of Contents
- [Getting Started](#getting-started)
- [Scripts](#scripts)

## Getting Started

### Prerequisites
- Node.js (version 16 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clonehttps://github.com/je-martinez/tech-bytes-pulumi.git
   ```
2. Navigate to the project directory:
   ```bash
   cd api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with any necessary environment variables.

### Development

To start the development server with automatic reload on changes, run:
```bash
npm run dev
```

## Scripts

| Command            | Description                                             |
|--------------------|---------------------------------------------------------|
| `npm run dev`      | Start the development server with `ts-node-dev`.        |
| `npm run build`    | Compile TypeScript to JavaScript and prepare for prod.  |
| `npm start`        | Run the built project using Node.js.                    |
| `npm run lint`     | Run ESLint to check code quality.                       |
| `npm run format`   | Format the codebase with Prettier.                      |

### Build

To build the project for production, compile TypeScript and prepare static files:
```bash
npm run build
```

### Run

After building, you can start the compiled code with:
```bash
npm start
```

## API Documentation

This project uses `swagger-jsdoc` and `swagger-ui-express` to generate and serve API documentation.

To view the API documentation:
1. Start the server (`npm run dev` or `npm start`).
2. Open your browser and navigate to `http://localhost:<PORT>/api-docs`.
