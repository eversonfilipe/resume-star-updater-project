# CV Optimizado - STAR + ATS

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/eversonfilipe/resume-star-updater-project)

An open-source, AI-powered tool designed to help professionals optimize their resumes. This application refactors raw resume text, structuring professional experiences into the powerful STAR (Situation, Task, Action, Result) method, and ensures it is optimized for modern Applicant Tracking Systems (ATS).

![Application Screenshot Alt Text](https://via.placeholder.com/800x400.png?text=CV+Optimizer+UI)

---

## ✨ Features

- **Multi-Step Guided Process**: A clear, three-step workflow (Input -> Detail -> Result) that guides you through the optimization process.
- **AI-Powered Experience Extraction**: Automatically identifies professional roles and companies from your raw resume text using the Google Gemini API.
- **Structured STAR Method Input**: Provides a dedicated form to input the Situation, Task, Action, and Result for each job, ensuring factual accuracy and high-quality outputs.
- **ATS & Human-Friendly Output**: Generates a final resume with professionally worded, achievement-oriented bullet points that appeal to both automated systems and human recruiters.
- **Enhanced User Experience**: A clean, intuitive, and responsive interface with smooth animations powered by Framer Motion.
- **Secure & Private by Design**: All processing happens in your browser. Your resume data and API key are never sent to or stored on any server.
- **Developer-Friendly & Open Source**: The project is fully open-source, with a professionally modularized codebase and in-depth documentation (in English and Portuguese) to encourage community contributions.

## 💻 Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`@google/genai`)
- **Animations**: Framer Motion
- **Build**: Vite (as implied by the setup)

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/eversonfilipe/resume-star-updater-project.git
    cd resume-star-updater-project
    ```

2.  **Install dependencies:**
    This project uses modern web modules and does not require a separate `npm install` step if you are using a compatible local server.

3.  **Set up your API Key:**
    The application requires a Google Gemini API key to function.
    - Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    - The application provides a secure input field to enter your key, which is then stored in your browser's local storage.

4.  **Run the development server:**
    You can use a simple local server to run the `index.html` file. For example, using Python:
    ```bash
    python -m http.server
    ```
    Or with the VS Code "Live Server" extension.

## 🤝 Contributing

Contributions are welcome! Whether you're fixing a bug, improving a feature, or suggesting a new one, your help is appreciated. Please read our [Contributing Guidelines](./docs/CONTRIBUTING.md) to get started.

## 📄 License

This project is open-source and available under the MIT License.

## ❤️ Acknowledgements

This application was created by **Éverson Filipe Campos da Silva Moura**. See the [CREDITS.md](./CREDITS.md) file for more information.