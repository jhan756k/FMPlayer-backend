import express from 'express';
import connectDB from "./tools/connectDB";
import authRoutes from './routes/auth';

const app = express();
const port = 5000;

connectDB();
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
