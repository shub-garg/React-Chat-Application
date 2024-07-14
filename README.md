# React Chat Application

![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-17.0.2-blue)
![Firebase](https://img.shields.io/badge/Firebase-9.6.1-orange)

A real-time chat application built with React and Firebase, featuring authentication, real-time messaging, media sharing (images and audio), emoji picker, and camera integration.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features
- User Authentication (Signup, Login)
- Real-time Messaging
- Media Sharing (Images, Audio)
- Emoji Picker Integration
- Camera Integration for Capturing Photos
- Responsive Design

## Demo
Check out the live demo [here](#).

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/react-chat-app.git
   cd react-chat-app
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
```

3. **Set up Firebase**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Set up Firestore, Authentication, and Storage.
   - Get your Firebase config object and replace the placeholders in `src/lib/firebase.js`.

4. **Run the application**
   ```sh
   npm start
   # or
   yarn start
```



   ## Usage

1. **Sign Up**: Create a new account.
2. **Login**: Log in with your credentials.
3. **Start Chatting**: Start a new chat, send messages, share images and audio, and use the camera to capture photos.

## Technologies Used

- **Frontend**: 
  - React
  - React Hooks (useState, useEffect, useRef)
  - CSS
  - HTML
  - JavaScript

- **Backend**: 
  - Node.js
  - Express.js
  - Firebase Authentication
  - Firebase SDK

- **Web APIs**: 
  - MediaDevices API
  - HTML5 Canvas
  - Blob and File APIs

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Timeago.js](https://timeago.org/)
- [React Toastify](https://github.com/fkhadra/react-toastify)
- [Emoji Picker](https://github.com/ealush/emoji-picker-react)

---

Feel free to customize this README as per your needs. Happy coding!
