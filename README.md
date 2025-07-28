
# 🧾 ChatZoom: Real-Time Chat Application

ChatZoom is a MERN-stack real-time chat application featuring:

✅ Email & GitHub Login 

✅ Room-based WebSocket chat 

✅ Contact form with email notifications

✅ Responsive frontend using TailwindCSS

✅ SweetAlert-based user prompts

---


## 📐 System Architecture & Workflow

```
[Frontend (HTML + TailwindCSS)]
       ⇅ REST API (Auth, Contact)
       ⇅ Socket.IO (Chat, Typing)
       ⇅ GitHub OAuth (Passport.js)
       ⇅ MongoDB (User Storage)
       ⇅ Nodemailer (Contact Form Email)
```


### Components:

* **Frontend:** HTML, JS, TailwindCSS, SweetAlert2
* **Backend:** Express.js (Node)
* **Database:** MongoDB
* **Auth:** JWT + GitHub OAuth (via Passport.js)
* **Email:** Nodemailer
* **Real-time:** Socket.IO

---


## 🗂 Folder Structure

```
ChatZoomApp/
├── controllers/
│   └── user.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   └── passport.js
├── models/
│   └── user.model.js
├── routes/
│   ├── user.route.js
│   ├── contact.route.js
│   └── github.route.js
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
├── server.js
└── .env
```

---


## 🔐 Authentication Options

| Type         | Description                               |
| ------------ | ----------------------------------------- |
| JWT Auth     | Email & Password login (with bcrypt hash) |
| GitHub OAuth | Login via GitHub using Passport strategy  |

* Login/Register: `POST /api/user/login`, `POST /api/user/register`
* GitHub OAuth:

  * `GET /auth/github`
  * `GET /auth/github/callback` → redirect to dashboard

---


## 💬 Chat Features (via Socket.IO)

| Event          | Flow            | Description                      |
| -------------- | --------------- | -------------------------------- |
| `join-room`    | Client → Server | Join a specific chat room        |
| `chat-message` | Both            | Send and receive messages        |
| `invite-user`  | Client → Server | Send room invite to another user |
| `typing`       | Client → Server | Emit typing indicator            |
| `disconnect`   | Server          | Update active user count         |

---


## 📧 Contact Form Workflow

| Route          | Type | Description                          |
| -------------- | ---- | ------------------------------------ |
| `/api/contact` | POST | Sends contact message via Nodemailer |

* Uses Gmail SMTP with app password
* Admin receives name, email, and message

---


## 🧪 API Routes Summary

### 🧑 User Routes

| Route                | Method | Protected | Purpose           |
| -------------------- | ------ | --------- | ----------------- |
| `/api/user/register` | POST   | ❌         | Register user     |
| `/api/user/login`    | POST   | ❌         | Login & get token |

### 📩 Contact

| Route          | Method | Protected | Purpose             |
| -------------- | ------ | --------- | ------------------- |
| `/api/contact` | POST   | ❌         | Send email to admin |

### 🔐 GitHub OAuth

| Route                   | Method | Purpose                  |
| ----------------------- | ------ | ------------------------ |
| `/auth/github`          | GET    | Redirect to GitHub login |
| `/auth/github/callback` | GET    | OAuth callback           |

---

## 📋 UI Features (TailwindCSS + SweetAlert)

* Clean responsive design (mobile/tablet/desktop)
* SweetAlert2 for:

  * Login/register alerts
  * Contact form feedback
* Contact form and dashboard styled for real apps

---

## 🔐 Security

* Password hashing with `bcrypt`
* JWT tokens stored in `localStorage`
* GitHub login protected via `passport` and `session`
* Middleware for token validation on protected routes

---

## 💡 Future Enhancements (Optional)

* Save messages to MongoDB for history
* Add user avatars/profile updates
* Group roles (admin, moderator)
* WebRTC-based video calling

---

## 👨‍💻 Developed By

**Sumit Kumar Das**
Full Stack Trainer | MERN Stack Mentor

Built with ❤️ to help students master real-time and fullstack apps.

---

