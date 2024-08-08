import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import msgRoutes from "./routes/msg.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMonhoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import { app, server } from "./sokect/socket.js";
import path from "path";




config();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();



app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));


app.use("/api/auth", authRoutes);
app.use("/api/msg", msgRoutes);
app.use("/api/users", userRoutes);


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT, () => {
  connectToMonhoDB();
  console.log(`Server Running on port ${PORT}`);
});
