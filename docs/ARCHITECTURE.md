# Application Architecture

This document provides a high-level overview of the technical architecture for the **CV Optimizado - STAR + ATS** application.

## 1. Core Philosophy

The application is designed as a **fully client-side, single-page application (SPA)**. This architectural choice prioritizes user privacy and security, as no user data (resume content or API keys) is ever sent to or stored on a third-party server controlled by the application owner. All logic, state management, and API calls to the Google Gemini API happen directly within the user's browser.

## 2. Technology Stack

- **Frontend Framework**: **React (v19)** with **TypeScript** for building a type-safe, component-based user interface.
- **AI Integration**: **Google Gemini API** via the `@google/genai` SDK for all AI-powered text processing and generation.
- **Styling**: **Tailwind CSS** for a utility-first CSS framework that allows for rapid, responsive UI development.
- **Animations**: **Framer Motion** for creating fluid animations and transitions, enhancing the user experience.
- **Module Loading**: The project uses modern ES Modules with an `importmap` to load dependencies directly from a CDN, simplifying the development setup without a complex build step.

## 3. Project Structure

The codebase is organized into a modular structure to ensure a clear separation of concerns:

```
/
├── components/       # Reusable React components (e.g., buttons, inputs, forms)
├── services/         # Modules for external API interactions (e.g., geminiService.ts)
├── docs/             # Project documentation (guides, architecture, etc.)
├── App.tsx           # Main application component, manages state and UI flow
├── index.tsx         # Entry point for the React application
├── index.html        # The single HTML page for the SPA
└── metadata.json     # Application metadata
```

## 4. State Management

State management is handled locally within React components using hooks.

- **Global State**: The root `App.tsx` component acts as the primary state container. It manages the application's overall state, including the current step in the workflow (`currentStep`), the raw resume text, extracted experiences, the final optimized resume, loading states, and any errors. State is passed down to child components via props.
- **Component State**: Individual components manage their own UI-specific state. For example, `ApiKeyInput.tsx` manages the visibility of the API key, and `OptimizedResume.tsx` manages its "copied" state.
- **State Updates**: `useCallback` is used for handler functions to prevent unnecessary re-renders, optimizing performance.

## 5. Data Flow

The application follows a unidirectional data flow, typical of React applications, organized into three main steps:

1.  **Step 1: Input & Extraction**
    - The user pastes their resume into `<ResumeInput />` and provides their Gemini API key in `<ApiKeyInput />`.
    - `App.tsx` triggers `extractExperiencesFromResume()` in `geminiService.ts`.
    - The service sends the resume text to the Gemini API, requesting it to extract job titles and companies in a structured JSON format.
    - The extracted experiences are returned to `App.tsx` and stored in the state, advancing the UI to Step 2.

2.  **Step 2: Detail (STAR Method)**
    - The `<StarForm />` component renders a form for each extracted experience.
    - The user fills in the Situation, Task, Action, and Result for each role. User input updates the `experiences` state in `App.tsx`.
    - Once all fields are complete, the user clicks "Generate Final Resume".

3.  **Step 3: Result**
    - `App.tsx` calls `generateFinalResume()` in `geminiService.ts`, passing the original resume and the user-detailed STAR experiences.
    - The service constructs a detailed prompt instructing the Gemini API to rewrite the experience section of the resume while preserving all other sections.
    - The AI-generated, fully optimized resume text is returned to `App.tsx`, stored in state, and displayed in the `<OptimizedResume />` component.

## 6. Security

- **API Key Handling**: The user's Google Gemini API key is stored exclusively in the browser's `localStorage`. It is only read from `localStorage` to be used for API calls made directly from the client to Google's servers.
- **Data Privacy**: Resume content is held in memory (React state) and is never persisted outside of the user's browser session, ensuring complete privacy.
