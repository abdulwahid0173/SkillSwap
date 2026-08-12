# SkillSwap

SkillSwap is a full-stack MERN application that enables users to exchange skills by connecting with other learners and professionals. Users can create profiles, browse available skills, send swap requests, manage notifications, and rate completed skill exchanges.

---

## 🚀 Live Demo

### 🌐 Frontend
https://skill-swap-ten-drab.vercel.app/

### ⚙️ Backend API
https://skillswap-8eqr.onrender.com/

### 📂 GitHub Repository
https://github.com/abdulwahid0173/SkillSwap

---

## ✨ Features

- 🔐 JWT Authentication (Register/Login)
- 👤 User Profile Management
- 📝 Edit Profile with Skills Offered & Skills Wanted
- 🔍 Browse Users by Skills
- 🤝 Send Skill Swap Requests
- ✅ Accept or Reject Requests
- 🔔 Real-time Notification Count
- ⭐ Rate & Review Completed Swaps
- 📊 Personal Dashboard
- 👨‍💼 Admin Dashboard
- 📱 Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Tailwind CSS
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cloudinary
- Multer
- Nodemailer

---

## 📁 Project Structure

```
SkillSwap
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/abdulwahid0173/SkillSwap.git
```

```bash
cd SkillSwap
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

CLIENT_URL=http://localhost:5173
```

Start the backend

```bash
npm run dev
```

---

## Frontend Setup

Open another terminal.

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend

```bash
npm run dev
```

---

## Screenshots

Add screenshots here.

Example:

```
screenshots/
├── login.png
├── dashboard.png
├── browse-users.png
├── requests.png
├── notifications.png
└── admin-dashboard.png
```

---

## Future Enhancements

- 💬 Real-time Chat
- 📅 Schedule Learning Sessions
- 🎥 Video Calling Integration
- 🔎 Advanced Search Filters
- 🌙 Dark/Light Theme
- 📈 Analytics Dashboard

---

## Author

**Abdul Wahid**

GitHub:
https://github.com/abdulwahid0173


---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
