# Authentic | Premium React Auth Flow

A sleek, secure, and high-performance authentication application built with **React** and **Vite**. This project demonstrates a complete authentication lifecycle using the FreeAPI Authentication Module.

![UI Preview](https://via.placeholder.com/1200x600/09090b/fafafa?text=Authentic+React+UI+Preview)

## ✨ Features

- **Full Auth Lifecycle**: Register, Login, Logout, and Profile fetching.
- **React 19 Core**: Modern implementation using Hooks (`useState`, `useEffect`) and functional components.
- **Premium Aesthetics**: 
  - Dark mode design with **Plus Jakarta Sans** typography.
  - Smooth transitions and micro-interactions.
  - Custom loaders and shimmering effects.
- **State Persistence**: Automatic profile recovery on page refresh using React's lifecycle.
- **Robust Feedback**: Real-time validation, error handling, and success notifications.
- **Security**: Handles cookies and sessions for secure API communication.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Properties, Flexbox, Grid)
- **API**: [FreeAPI Authentication Module](https://api.freeapi.app/)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
src/
├── App.jsx         # Main application logic and state
├── main.jsx        # React entry point
└── style.css       # Premium design system and animations
index.html          # HTML template
package.json        # Project configuration
```

## 🔑 Key Endpoints Used

- `POST /users/register`: Create a new user account.
- `POST /users/login`: Authenticate user and start session.
- `POST /users/logout`: End session and clear cookies.
- `GET /users/current-user`: Fetch authenticated user profile.

## 📝 License

MIT
