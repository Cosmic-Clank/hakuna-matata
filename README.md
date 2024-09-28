# **Hakuna Matata**

![App Logo](./assets/images/logo-sticker.png) <!-- Optionally, add your app's logo or a relevant image -->

**Hakuna Matata** is a modern mobile application built using **React Native** and **Expo**, designed with scalability, responsiveness, and performance in mind. The app supports **light and dark modes**, **user authentication**. The architecture follows best practices with **Context API** for state management and **React Native Paper** for material design UI components.

---

## **Table of Contents**

-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Getting Started](#getting-started)
    -   [Set Up Backend Services](#1-set-up-backend-services)
        -   [FastAPI Backend](#fastapi-backend)
        -   [MSSQL Database](#mssql-database)
    -   [Running the App](#2-running-the-app)
    -   [Building the App](#3-building-the-app)
    -   [Troubleshooting](#4-troubleshooting)

---

## **Features**

-   **User Authentication**: Users can register, log in, and manage their session seamlessly across the app.
-   **Dynamic Theming**: Supports both **light** and **dark modes**, with theme preferences saved in secure storage for persistence.
-   **Offline Capabilities**: Certain features are accessible even when the user is offline, ensuring a smooth user experience in all conditions.
-   **Secure Data Handling**: User data and sessions are securely managed using **Expo Secure Store** and robust encryption methods.
-   **Optimized Navigation**: Leveraging **Expo Router** for intuitive and smooth navigation throughout the app.
-   **State Management**: Context API is used to manage state for authentication, theming, and notifications, ensuring a scalable codebase.

---

## **Prerequisites**

Ensure you have the following tools installed before running the app:

-   [**Node.js**](https://nodejs.org/en/download/) (version 14 or higher)
-   [**Expo CLI**](https://docs.expo.dev/get-started/installation/) (global installation required)

### **Mobile Platforms Supported**

-   **iOS** (requires a Mac for development)
-   **Android**

---

## **Getting Started**

### **1. Set Up Backend Services**

#### **FastAPI Backend**

The backend is built using **FastAPI**. You can find the backend code here:

[FastAPI Backend Repository](https://github.com/Cosmic-Clank/hakuna-matata-backend)

A running backend server is required for all online functionalities of the app. The backend is temporarily hosted on `https://khz6n3f6-8000.inc1.devtunnels.ms/`.

To run the FastAPI backend locally:

1. Clone the backend repository:

    ```bash
    git clone https://github.com/your-username/hakuna-matata-backend.git
    cd hakuna-matata-backend
    ```

2. Install dependencies (ensure Python and pip are installed):

    ```bash
    pip install -r requirements.txt
    ```

3. Start the FastAPI server:

    ```bash
    fastapi dev main.py
    ```

Make sure the FastAPI server is running at `http://localhost:8000`.

#### **MSSQL Database**

The app requires a **MSSQL** server. Follow these steps to setup a local server:

1. Install and set up **Microsoft SQL Server** locally. You can download it from [SQL Server Downloads](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).

2. Update the connection string in the FastAPI backend’s configuration (in the `.env` file).

3. Set up the required tables and databases.

---

### **2. Running the App**

Once the **FastAPI** backend and **MSSQL** database are running, start the Expo development server:

```bash
expo start
```

You can run the app on:

-   **iOS**: Use an iOS simulator or run the app on a physical device using the **Expo Go** app.
-   **Android**: Use an Android emulator or run the app on a physical device using the **Expo Go** app.

---

### **3. Building the App**

To build the app for production, follow Expo’s guide for standalone apps: [Expo Build Setup](https://docs.expo.dev/build/setup/)

#### **Steps to Build the App**:

1. Log into Expo CLI:

    ```bash
    expo login
    ```

2. Install the Expo CLI build tools (if not already installed):

    ```bash
    npm install -g eas-cli
    ```

3. Configure the project for Expo Application Services (EAS) build:

    ```bash
    eas build:configure
    ```

4. To build the app for Android:

    ```bash
    eas build --platform android
    ```

5. To build the app for iOS (requires macOS):

    ```bash
    eas build --platform ios
    ```

Once the build is complete, you will receive a link to download the APK or IPA file, which you can submit to the app stores.

---

### **4. Troubleshooting**

-   **Backend issues**: Ensure both the FastAPI server and MSSQL database are running before starting the app.
-   **Metro Bundler issues**: If you encounter bundler issues, restart the bundler:

    ```bash
    expo start --clear
    ```

-   **API connection issues**: If you're testing the app on a physical device, ensure that the FastAPI server's URL is accessible from your device. Replace `localhost` with your computer's IP address if necessary.
