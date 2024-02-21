import express from 'express';
import connectDB from "./tools/connectDB";
import authRoutes from './routes/auth';
import youtubeRoutes from './routes/youtube';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 5000;

connectDB();

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/api/youtube", youtubeRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
