import express from 'express';
import authRoutes from './routes/auth';

const app = express();
const port = 5000;

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});