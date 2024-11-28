# Role-Based Access Control (RBAC) in Node.js

## Overview
This project demonstrates the implementation of **Role-Based Access Control (RBAC)** in a Node.js application. RBAC is a critical security concept that restricts system access based on user roles, enhancing security and simplifying user management.

## Features
- User authentication and authorization using JWT
- Role-based access management
- Modular and scalable project structure
- CRUD operations with protected endpoints
- Example roles: Admin, User, Moderator, Guest

## Prerequisites
- Node.js installed
- Basic knowledge of JavaScript, Node.js, and MongoDB
- `npm` for dependency management

## Project Structure
```
rbac/
│
├── helpers/
│   ├── db.js                 # Database connection and configuration
│   ├── errorHandler.js       # Error handling middleware
│   ├── jwt.js                # JWT utilities for authentication
│   └── role.js               # Role definitions
│
├── models/
│   └── user.js               # Mongoose schema for User
│
├── routes/
│   ├── index.js              # Basic route setup
│   └── user.controllers.js   # User-related endpoints
│
├── services/
│   └── user.services.js      # Business logic for user operations
│
├── views/                    # Template files
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
│
├── public/                   # Static assets
│   └── stylesheets/
│       └── style.css
│
├── .gitignore                # Files to exclude from Git
├── app.js                    # Main application file
├── config.json               # Configuration file
├── package.json              # Project dependencies
└── package-lock.json
```

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd rbac
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure the database and secret in `config.json`.

## Usage
1. Start the server:
   ```bash
   node app.js
   ```
2. Access the application at `http://localhost:3000`.

## Key Implementation Details
### Role Definitions (`helpers/role.js`)
Roles are defined as constants:
```javascript
module.exports = {
  Admin: "Admin",
  User: "User",
};
```

### Middleware for Authentication (`helpers/jwt.js`)
JWT-based middleware validates tokens and checks user roles:
```javascript
const expressJwt = require("express-jwt");
const config = require("../config.json");

function jwt(roles = []) {
  roles = typeof roles === "string" ? [roles] : roles;

  return [
    expressJwt({ secret: config.secret, algorithms: ["HS256"] }),
    async (req, res, next) => {
      // Authorization logic
      next();
    },
  ];
}

module.exports = jwt;
```

### Database Configuration (`helpers/db.js`)
MongoDB setup using Mongoose:
```javascript
const mongoose = require("mongoose");
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = { User: require("../models/user") };
```

### User Model (`models/user.js`)
Defines user attributes and schema:
```javascript
const schema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  role: { type: String, required: true },
});
module.exports = mongoose.model("User", schema);
```

### User Endpoints (`routes/user.controllers.js`)
Includes routes for authentication, user management, and role-based restrictions:
```javascript
router.post("/authenticate", authenticate);
router.get("/", jwt(Role.Admin), getAll);
router.get("/current", jwt(), getCurrent);
```

## Dependencies
- `bcryptjs`
- `cookie-parser`
- `cors`
- `express`
- `express-jwt`
- `jsonwebtoken`
- `mongoose`
- `morgan`

Install all dependencies using:
```bash
npm install
```

## Best Practices
- Validate input data to prevent injection attacks.
- Implement audit trails for tracking user actions.
- Regularly update dependencies to avoid security vulnerabilities.
- Use granular permissions for finer access control.

## Future Enhancements
- Add support for dynamic role creation.
- Implement advanced permission hierarchies.
- Add integration tests for role-based restrictions.

## License
This project is open-source and available under the MIT License.
