# Real Estate Management

This is a full-stack real estate management application built with:
- Frontend: Angular + Ionic Framework
- Backend: Node.js with Fastify
- Database: MongoDB

## Features
- Property listing and management
- User authentication and authorization
- Real-time updates using WebSocket
- Interactive maps for property locations
- Responsive design for mobile and desktop

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend-fastify
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file with:
```
DB_CONNECT=mongodb://localhost:27017/real-estate
PORT=5000
SECRET_KEY=your_jwt_secret_key
SALT=12
LOGGER=true
```

4. Start the server:
```bash
npm start
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## Contributing
Feel free to submit issues and enhancement requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
