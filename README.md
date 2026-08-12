# SkillSwap - Skill Exchange Platform

SkillSwap is a full-stack MERN application that enables users to exchange skills with others. Users can create profiles, showcase the skills they offer, discover people with complementary skills, send swap requests, manage exchanges, and rate completed skill swaps through a modern and responsive interface.

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes
- Forgot Password & Reset Password

### 👤 User Profile
- Edit Profile
- Upload Profile Image
- Add Bio, College & Location
- Add GitHub, LinkedIn & Portfolio Links
- Manage Skills Offered & Skills Wanted

### 🤝 Skill Swap
- Browse Users
- View User Profiles
- Send Skill Swap Requests
- Accept or Reject Requests
- Delete Pending Requests
- View Incoming & Outgoing Requests

### ⭐ Rating & Reviews
- Rate Completed Skill Swaps
- Leave Reviews
- Automatic User Rating Calculation
- Completed Swap Counter

### 🔔 Notifications
- Swap Request Notifications
- Acceptance Notifications
- Rejection Notifications
- Rating Notifications

### 📊 Dashboard
- User Profile Overview
- Profile Completion Progress
- Recent Activity
- Pending Requests
- Accepted Swaps
- Quick Action Cards

### 🛠 Admin Panel
- Admin Dashboard
- Manage Users
- Delete Users
- View All Swap Requests
- Secure Admin Routes

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer
- Cloudinary
- Nodemailer

### Database
- MongoDB Atlas
- Mongoose

---

## 📂 Project Structure

```
SkillSwap/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/abdulwahid0173/SkillSwap.git
```

### Navigate to Project

```bash
cd SkillSwap
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 📸 Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Browse Users
- User Profile
- Swap Requests
- Notifications
- Admin Dashboard

---

## 🎯 Future Improvements

- Real-Time Chat
- Socket.io Notifications
- Video Calling
- Skill Recommendation System
- Advanced Search & Filters
- Email Verification
- Dark/Light Theme

---

## 📚 Learning Outcomes

- MERN Stack Development
- REST API Development
- JWT Authentication
- MongoDB & Mongoose
- File Upload with Cloudinary
- Protected & Admin Routes
- React Context API
- Responsive UI Design
- CRUD Operations
- Authentication & Authorization

---

## 👨‍💻 Author

**Abdul Wahid**

- GitHub: https://github.com/abdulwahid0173


---

## 📄 License

This project is developed for educational and learning purposes.