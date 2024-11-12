# RateCrit

**Movies rated by real fans**

**RateCrit** is a full-stack web application for browsing, rating, and reviewing movies. The project includes a Node.js Express backend and a Vite-powered React frontend.

## Project Structure

/my-project /backend // Node.js Express backend /public // Vite public assets /src // Vite React source code .gitignore package.json // Vite frontend dependencies README.md tsconfig.json vite.config.ts

## Features

- **Frontend**: Built with React using Vite for fast development and optimized builds.
- **Backend**: Node.js with Express, handling API requests and data processing.
- **Movie Reviews**: View movie details, read overviews, check release dates, genres, and ratings.
- **Smooth UI**: Responsive and clean design with smooth animations.

## Setup Instructions

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine.
- **npm**: The package manager for Node.js (comes with Node.js).

### Backend Setup

1. Navigate to the `backend` folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install

```

3. Start the backend server:

```bash
npm run dev
```

The server should start and listen on the configured port.

### Frontend Setup

1. Go back to the project root, and install frontend dependencies:

```bash
cd ..
npm install
```

2. Start the frontend (development mode):

```bash
npm run dev
```

The Vite development server should start, and you can view the application in your browser.

### Usage

1. Navigate to the frontend URL provided by Vite to start exploring the movies.
2. Explore Movies: Browse through a variety of movies, check out their details, and read or leave reviews.
3. Rate and Review: Log in to rate and review movies (future feature).

## Environment Variables

Make sure to create `.env` files in both the `backend` and `frontend` directories if your project requires environment-specific configurations. Example:

- `backend/.env`
- `frontend/.env`

### License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

### Contributing

Contributions are welcome! Feel free to fork the project and submit pull requests.

### Contact

- Author: Izik Filossof
- Email: filossof@gmail.com
- GitHub: https://github.com/filossof
