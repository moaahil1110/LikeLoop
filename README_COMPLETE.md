# LikeLoop - Instagram Clone

A black-and-white Instagram clone built with the MERN stack (MongoDB, Express.js, React, Node.js) and Cloudinary for image storage.

## 🚀 Features

### Backend Features
- **User Authentication**: JWT-based registration, login, and logout
- **User Profiles**: Create and edit profiles with avatar uploads
- **Posts**: Create, read, update, and delete posts with image uploads
- **Social Features**: Like/unlike posts, follow/unfollow users, and comments
- **Image Storage**: Cloudinary integration for avatar and post images
- **Security**: Password hashing with bcrypt, protected routes

### Frontend Features
- **Responsive Design**: Black-and-white themed UI that works on all devices
- **Authentication Pages**: Login and registration forms with validation
- **Feed**: View all posts with like and comment functionality
- **Profile Pages**: View user profiles, edit your own profile
- **Post Creation**: Upload images with preview and captions
- **Real-time Updates**: Dynamic UI updates for likes and follows
- **Protected Routes**: Authentication-based navigation

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling
- **Cors** - Cross-origin requests

### Frontend
- **React** - Frontend library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with flexbox and grid
- **Context API** - State management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your credentials:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5002
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5002`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/avatar` - Upload avatar
- `GET /api/users/search` - Search users
- `POST /api/users/follow/:userId` - Follow user
- `POST /api/users/unfollow/:userId` - Unfollow user

### Posts
- `GET /api/posts` - Get all posts (feed)
- `POST /api/posts` - Create new post
- `GET /api/posts/:postId` - Get specific post
- `PUT /api/posts/:postId` - Update post
- `DELETE /api/posts/:postId` - Delete post
- `POST /api/posts/:postId/like` - Like post
- `POST /api/posts/:postId/unlike` - Unlike post
- `POST /api/posts/:postId/comment` - Add comment
- `GET /api/posts/user/:userId` - Get user's posts

## 🎨 Design Features

- **Black & White Theme**: Minimalist monochrome design
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean interfaces with intuitive navigation
- **Image Previews**: Real-time image preview before uploading
- **Loading States**: Visual feedback for all async operations
- **Error Handling**: User-friendly error messages

## 🔧 Development

### Running in Development Mode

1. Start the backend:
```bash
cd backend && npm run dev
```

2. Start the frontend:
```bash
cd frontend && npm start
```

### Database Models

#### User Model
- username, email, password (hashed)
- fullName, bio, avatar
- followers, following arrays
- createdAt, updatedAt timestamps

#### Post Model
- author reference to User
- caption, image URL
- likes array (user references)
- comments array with user and text
- createdAt, updatedAt timestamps

## 🚦 Current Status

✅ **Completed Features:**
- Full MERN stack implementation
- User authentication and authorization
- Image upload with Cloudinary
- Posts CRUD operations
- Like/unlike functionality
- User following system
- Comments system
- Responsive black-and-white UI
- Protected routes
- Error handling and validation

🔄 **Live & Running:**
- Backend server on port 5002
- Frontend React app on port 3000
- Connected to MongoDB Atlas
- Cloudinary integration active

## 🧪 Testing

The application has been tested with:
- User registration and login
- Profile creation and editing
- Post creation with image uploads
- Like and comment functionality
- Follow/unfollow features
- Responsive design across devices

## 📱 Usage

1. **Register/Login**: Create an account or log in with existing credentials
2. **Profile Setup**: Add your bio and upload an avatar
3. **Create Posts**: Share images with captions
4. **Social Interaction**: Like posts, follow users, and leave comments
5. **Explore**: Browse the feed to discover content from other users

## 🤝 Contributing

This is a complete implementation of an Instagram clone. The codebase is well-structured and documented for easy understanding and potential extensions.

---

**LikeLoop** - Share your moments in black and white! 📸
