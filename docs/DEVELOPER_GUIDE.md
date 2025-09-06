# Developer Guide

Welcome, contributor! This guide provides all the information you need to get started with developing and contributing to the **CV Optimizado - STAR + ATS** project.

## 1. Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- A text editor or IDE (e.g., VS Code).
- A simple local web server. The project is configured to run without a complex build step.

### Running the Project Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/eversonfilipe/resume-star-updater-project.git
    cd resume-star-updater-project
    ```

2.  **Set up your API Key:**
    The application requires a Google Gemini API key to function. For local development, it's recommended to handle this securely. While the app UI allows you to enter a key, you may want a more permanent solution during development.
    - Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    - You can enter it directly into the application's UI once it's running.

3.  **Run the development server:**
    Since this project uses ES Modules and `importmap`, you don't need `npm install` or a bundler like Webpack/Vite. You just need a simple local server to serve the `index.html` file.

    A common and easy way is using Python's built-in server:
    ```bash
    # If you have Python 3
    python -m http.server

    # If you have Python 2
    python -m SimpleHTTPServer
    ```
    Alternatively, you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

4.  **Open in Browser**: Navigate to `http://localhost:8000` (or the port your server is running on) in your browser.

## 2. Codebase Overview

### Folder Structure

- `components/`: Contains all reusable React components. Each component should be self-contained in its own file (e.g., `Header.tsx`).
- `services/`: Houses logic for interacting with external APIs. `geminiService.ts` is the interface to the Google Gemini API.
- `docs/`: All project-related documentation resides here.
- `App.tsx`: The main application component that manages state and renders different steps of the UI.
- `index.tsx`: The root file that mounts the React application to the DOM.

### Key Technologies & Conventions

- **React**: We use functional components and hooks (`useState`, `useEffect`, `useCallback`). Keep components small and focused on a single responsibility.
- **TypeScript**: All new code should be written in TypeScript. Use interfaces or types to define props and state for type safety.
- **Tailwind CSS**: Use utility classes directly in your JSX for styling. Avoid writing custom CSS files unless absolutely necessary. Adhere to the design system defined in `tailwind.config` inside `index.html`.
- **Component Naming**: Use PascalCase for component file names and component functions (e.g., `PrimaryButton.tsx`).
- **Commits**: Follow conventional commit messaging (e.g., `feat: Add new button component`, `fix: Correct API error handling`).

## 3. How to Contribute

Please see our [Contributing Guidelines](./CONTRIBUTING.md) for detailed instructions on how to submit bug reports, feature requests, and pull requests.

### Common Development Tasks

#### Adding a New Component

1.  Create a new file in the `components/` directory (e.g., `NewComponent.tsx`).
2.  Write the component logic using React and TypeScript.
3.  Style it using Tailwind CSS utility classes.
4.  Import and use it in a parent component, like `App.tsx` or another component.

#### Modifying an API Call

1.  Open `services/geminiService.ts`.
2.  Locate the function you need to change (`extractExperiencesFromResume` or `generateFinalResume`).
3.  Modify the prompt, model parameters, or response handling as needed.
4.  Ensure you handle potential errors gracefully.
