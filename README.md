# Astria Image Generation GUI

A React-based graphical user interface for generating and managing images, inspired by tools like Midjourney and Ideogram.ai. This project includes a gallery view with infinite scrolling, responsive layouts, and a streamlined API for image generation and management.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Layouts**: Fully responsive design optimized for both mobile and desktop devices.
- **Infinite Scrolling**: Smooth scrolling for loading gallery images and prompts.
- **Gallery and Prompt Views**: Allows users to view prompts with metadata, like images, and copy prompt metadata.
- **Masonry Layout**: Image gallery with a clean, grid-based layout.
- **Deep Links**: Supports deep linking to prompts and images, allowing easy sharing.
- **API Integration**: Easily integrates with external APIs for image generation and management using Axios.
- **Like and Download Options**: Users can like images and download prompts directly from the interface.

## Demo

Check out the live version at: [https://astria.ai/imagine](https://astria.ai/imagine) (URL can be customized upon deployment).

## Installation

To get a local copy up and running, follow these steps.

### Prerequisites

- **Node.js** and **npm**
- **Git**

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/astriaai/imagine.git
    cd imagine
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add your API key:
   
   ```plaintext
   VITE_APP_ASTRIA_API_KEY=your_api_key_here
   ```

## Usage

After installation, you can run the project locally with:

```bash
npm start
```

The app should now be running on `http://localhost:3000/imagine`.

## Project Structure

The project follows this folder structure for maintainability:

```plaintext
src/
├── components/        # Reusable components 
├── pages/             # Main pages
├── services/          # API calls (Axios instances and API functions)
├── styles/            # CSS stylesheets or styled components
├── utils/             # Utility functions
└── types/             # TypeScript types and interfaces
```

## Deployment

This project can be deployed to GitHub Pages or any other static site hosting service.

### GitHub Pages Deployment

1. Install `gh-pages`:
   
   ```bash
   npm install gh-pages --save-dev
   ```

2. Deploy the app:

   ```bash
   npm run build
   npm run deploy
   ```

The app should now be live on GitHub Pages!

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add YourFeature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.