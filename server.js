// 📦 Import Core Modules and Packages
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
const contactRouter = require("./routes/contact.route");

require("dotenv").config();

// 📦 Import Custom Modules
const userRouter = require("./routes/user.route");
const verifyToken = require("./middlewares/verifyToken");
const Message = require("./models/Message");

// Github Auth
const session = require("express-session");
const passport = require("passport");
require("./middlewares/passport");
const githubAuthRouter = require("./routes/github.route");

// 🚀 App and Server Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 🧩 Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Github Auth
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", githubAuthRouter);

// Nodemailer
app.use("/api/contact", contactRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌐 Connect to MongoDB
mongoose
  .connect(process.env.mongoURL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// 📍 Routes
app.use("/api/user", userRouter);

// ✅ Protected Profile Route (JWT)
app.get("/profile", verifyToken, (req, res) => {
  res.json({ name: req.user.name });
});

// 🌐 WebSocket (Socket.IO) Logic
let onlineUsers = {};

io.on("connection", (socket) => {
  // 🟢 User joins a room
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    onlineUsers[socket.id] = username;

    // 👥 Update user list to all clients
    io.emit("userList", onlineUsers);

    // 📢 Notify others in room
    socket.to(room).emit("welcome", `${username} joined room: ${room}`);
  });

  // 💬 Handle incoming chat messages
  socket.on("gyan", async (msg) => {
    const message = new Message({
      username: socket.username,
      room: socket.room,
      content: msg,
    });

    await message.save();

    io.to(socket.room).emit("chatMessage", {
      username: socket.username,
      content: msg,
      timestamp: new Date(),
    });
  });

  // ✍️ Typing Indicator
  socket.on("typing", () => {
    socket.to(socket.room).emit("typing", `${socket.username} is typing...`);
  });

  socket.on("stopTyping", () => {
    socket.to(socket.room).emit("stopTyping");
  });

  // 📩 Room Invitation
  socket.on("inviteToRoom", ({ targetSocketId, room }) => {
    io.to(targetSocketId).emit("roomInvite", {
      room,
      from: socket.username,
    });
  });

  // ✅ Accept Room Invitation
  socket.on("acceptInvite", ({ room }) => {
    socket.join(room);
    socket.room = room;

    socket.to(room).emit("welcome", `${socket.username} joined the room`);
  });

  // 🔴 User Disconnects
  socket.on("disconnect", () => {
    delete onlineUsers[socket.id];
    io.emit("userList", onlineUsers);
  });
});

// 🚀 Start the Server
server.listen(process.env.port, () => {
  console.log("🚀 Server running at https://chatzoom-6l06.onrender.com");
});
