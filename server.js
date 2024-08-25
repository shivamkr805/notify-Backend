import express from "express";
import dotenv from "dotenv";
import router from "./userManagement/routes/user.js";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors'


dotenv.config();
const app = express();
app.use(express.json());
const httpServer = createServer(app)
const port = process.env.PORT || 3001;
const mongodbUri = process.env.MONGODB_URI
console.log(mongodbUri)
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true, // Set this to true if you're dealing with cookies or authentication
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socket.emit("welcome", "hii welcome to world chat");
  socket.on("sendMessage", (message) => {
    console.log(message + " message recievd from user");
    socket.emit("response", `${message} from server`);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/user", router);

mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(`${err} while connectiong the mongodb`);
  });
httpServer.listen(port, () => {
  console.log("Server is running on port "+ port);
})
