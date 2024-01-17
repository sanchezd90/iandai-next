# IANDAI

## Overview
IANDAI is a language learning tool designed to enhance written language skills through interactive AI chat sessions. This application leverages various technologies for styling, state management, and API calls to provide a seamless and engaging language learning experience.

## Installation
Before getting started, make sure you have Node.js installed on your machine.

Run the following command to install dependencies:

```bash
npm install
```

### Usage
To run the development server:

```bash
npm run dev
```

To build the application:

```bash
npm run build
```

To start the application in production mode:

```bash
npm start
```

## Project Structure
The source code is organized into the following folders:

- app: Contains the main components and logic for the application.
- hooks: Custom React hooks used throughout the application.
- services: Modules for handling API calls and other external services.
- utils: Utility functions and helper modules.
- fonts: Font files for the application.
- lib: External libraries and configurations.
- theme: Styling themes and configurations.

## How it Works
### Styling
The application utilizes Emotion for styling, with @emotion/react and @emotion/styled as dependencies. Emotion provides a convenient way to write and manage styles in JavaScript, enhancing the modularity and maintainability of the codebase.

### State Management
State management is handled through Redux and Redux Toolkit. Dependencies such as react-redux and @reduxjs/toolkit are included. Redux allows for a centralized store, enabling efficient state handling and communication between components. Redux Toolkit simplifies the setup and reduces boilerplate code.

### API Calls
API calls are managed using the axios library. This dependency facilitates making HTTP requests, allowing the application to interact with external services seamlessly. The services folder encapsulates modules responsible for handling API calls and other external services.
