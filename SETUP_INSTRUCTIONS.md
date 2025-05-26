# LikeLoop - Instagram Clone Setup Instructions

## Overview
LikeLoop is a black-and-white Instagram clone built with the MERN stack (MongoDB, Express.js, React, Node.js) and Cloudinary for image hosting.

## Project Structure
```
LikeLoop/
├── backend/           # Express.js API server
│   ├── config/        # Cloudinary configuration
│   ├── middleware/    # Authentication middleware
│   ├── models/        # Mongoose models (User, Post)
│   ├── routes/        # API routes (auth, users, posts)
│   ├── .env           # Environment variables
│   ├── .env.example   # Environment variables template
│   ├── package.json   # Backend dependencies
│   └── server.js      # Express server entry point
├── frontend/          # React application
│   ├── public/        # Static files
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── contexts/   # React contexts (AuthContext)
│   │   ├── pages/      # Page components
│   │   ├── App.js      # Main App component
│   │   └── App.css     # Global styles
│   └── package.json    # Frontend dependencies
└── README.md          # Project documentation
```

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Navigate to the project directory
cd LikeLoop

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

#### Backend (.env file)
The `.env` file is already configured with working credentials. However, you can create your own:

1. Copy `.env.example` to `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Update the `.env` file with your credentials:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5002
   ```

#### MongoDB Atlas Setup
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user with read/write access
4. Get your connection string and add it to the `.env` file

#### Cloudinary Setup
1. Create a Cloudinary account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to the `.env` file

### 3. Running the Application

#### Start Backend Server
```bash
cd backend
npm start
```
The backend will run on http://localhost:5002

#### Start Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000 (or 3001 if 3000 is busy)

## Features

### User Authentication
- User registration with email validation
- Login/logout functionality
- JWT token-based authentication
- Protected routes

### User Profiles
- Profile creation and editing
- Avatar upload via Cloudinary
- User search functionality
- Follow/unfollow system
- View followers and following counts

### Posts
- Create posts with image upload
- Like/unlike posts
- Comment on posts
- View post details
- Delete own posts
- Feed showing posts from followed users

### UI/UX
- Black and white minimalist design
- Responsive layout
- Modern CSS styling
- Loading states and error handling

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/avatar` - Upload avatar
- `GET /api/users/search` - Search users
- `POST /api/users/follow/:id` - Follow user
- `DELETE /api/users/follow/:id` - Unfollow user

### Posts
- `GET /api/posts/feed` - Get feed posts
- `GET /api/posts/user/:id` - Get user posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Backend: Change PORT in `.env` file
   - Frontend: Use `PORT=3001 npm start`

2. **MongoDB connection failed**
   - Check your MongoDB Atlas connection string
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify database user credentials

3. **Cloudinary upload failed**
   - Verify Cloudinary credentials in `.env`
   - Check Cloudinary account status and limits

4. **CORS errors**
   - Ensure frontend proxy is set to backend port in `package.json`
   - Check if backend server is running

### Testing the Application

1. Register a new user account
2. Login with the credentials
3. Upload an avatar image
4. Create a post with an image
5. Like and comment on posts
6. Search for users and follow them
7. View your profile and edit information

## Production Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables on your hosting platform
2. Ensure MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
3. Update Cloudinary settings for production

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the build folder
3. Update API base URL to production backend URL

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is for educational purposes.
