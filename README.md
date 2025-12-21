# Full-Stack E-Commerce Application

A modern, full-featured e-commerce platform built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). This application is designed to provide a seamless shopping experience with a robust backend and a dynamic, responsive frontend.

## 🚀 Key Features

*   **Modern Frontend**: Built with **React 19** and **Vite** for a fast and responsive user experience.
*   **Secure Backend**: RESTful API developed with **Node.js** and **Express**.
*   **Database**: **MongoDB** with **Mongoose** for efficient data modeling and storage.
*   **Authentication**: Secure user login and registration using **JWT (JSON Web Tokens)** and **bcryptjs**.
*   **Routing**: Client-side routing with **React Router v7**.
*   **Modern Icons**: Integrated **Lucide React** for a clean UI.

## 🛠️ Tech Stack

### Client (Frontend)
*   **React** (v19)
*   **Vite** (Build Tool)
*   **React Router DOM** (Routing)
*   **Axios** (API Requests)
*   **Lucide React** (Icons)
*   **Vanilla CSS** (Custom Styling)

### Server (Backend)
*   **Node.js**
*   **Express.js**
*   **MongoDB** & **Mongoose**
*   **Bcryptjs** (Password Hashing)
*   **JsonWebToken** (Auth)
*   **Dotenv** (Environment Variables)
*   **Cors** (Cross-Origin Resource Sharing)

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Manishyadav066/E--COMMERCE.git
    cd E--COMMERCE
    ```

2.  **Install Dependencies**
    A convenience script is provided to install dependencies for both client and server:
    ```bash
    npm run install-all
    ```
    *Alternatively, you can install them manually:*
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the `server` directory and configure the following variables (example):
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

## 🚀 Running the Application

You can run the client and server separately using the following commands from the **root** directory:

**Development Mode:**

1.  **Start the Backend Server**:
    ```bash
    npm run server
    ```
    *Runs the Node.js server (usually on http://localhost:5000)*

2.  **Start the Frontend Client**:
    ```bash
    npm run client
    ```
    *Starts the Vite development server (usually on http://localhost:5173)*

## 📂 Project Structure

```
root
├── client/          # React Frontend Application
│   ├── src/         # Source files, components, pages
│   └── package.json # Frontend dependencies
├── server/          # Node.js Express Backend
│   ├── server.js    # Entry point
│   └── package.json # Backend dependencies
└── package.json     # Root scripts and config
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the **ISC License**.
