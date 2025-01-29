# User Management System

A comprehensive user management application built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring user authentication, profile management, and administrative controls.

## 🚀 Features

- User authentication (register, login, password reset)
- Profile management
- Secure password handling
- Email notifications
- RESTful API architecture
- Redux state management
- Jest unit testing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account
- Gmail account for email notifications

## 🛠️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/user-management-system.git
cd user-management-system
```

### Frontend Setup (um-web)

```bash
cd um-web
npm install
```

### Backend Setup (UM-Core)

```bash
cd ../UM-Core
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `UM-Core` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_app_password
```
Create a `.env` file in the `um-web` directory:

```env
REACT_APP_API_URL= {backend api hosted url}
```


## 🚀 Running the Application


### Start Backend Server

```bash
cd UM-Core
npm i
npm start
```

### Start Frontend Development Server

```bash
cd um-web
npm i
npm start
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

### Running Frontend Tests

```bash
cd um-web
npm test
```


## 📁 Project Structure

```
user-management-system/
├── um-web/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── features/      # Redux slices
│   │   ├── pages/        # Page components
│   │ 
│   └── package.json
│
└── UM-Core/               # Backend Node.js application
    ├── models/           # Database models
    ├── routes/           # API routes

    └── package.json
```

## 🔒 Security Features

- JWT authentication
- Password hashing
- Protected routes
- Input validation
- CORS configuration
- Rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

### Authentication Endpoints

```
POST /api/user    # Register new user
POST /api/login       # Login user

```

### User Endpoints

```
GET    /api/users         # Get all users ()
GET    /api/users/:id     # Get user by ID
PUT    /api/users/:id     # Update user
DELETE /api/users/:id     # Delete user
```

## 🔧 Tech Stack

- **Frontend:**
  - React
  - Redux Toolkit
  - Axios
  - TailwindCSS
  - Jest

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT
  - Nodemailer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
