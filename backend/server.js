require('dotenv').config()
require('colors')
const express = require('express');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes//messageRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const path = require("path");

connectDB()
const App = express()
App.use(express.json()); // to accept json data

// App.get('/api/chat',(req,res)=>{
//     res.send("hello world!")
// })

//API Routing 
App.use("/api/user", userRoutes);
App.use("/api/chat", chatRoutes);
App.use("/api/message", messageRoutes);


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    App.use(express.static(path.join(__dirname1, "/frontend/build")));

    App.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
} else {
    App.get("/", (req, res) => {
        res.send("API is running..");
    });
}

// --------------------------deployment------------------------------


// Error Handling middlewares
App.use(notFound);
App.use(errorHandler);

const PORT = process.env.PORT || 10000;
const server = App.listen(PORT, console.log(`server started on PORT = ${PORT}`.yellow.bold))


//socket.io 
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io".yellow.bold);
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});