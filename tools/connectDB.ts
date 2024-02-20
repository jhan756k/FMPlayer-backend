import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

// @ts-ignore
const dbUrl: string = process.env.MONGO_URI;

const connectDB = async () => {
  try {

    await mongoose.connect(dbUrl, {
      dbName: 'FMPlayer',
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connectDB();
});

export default connectDB;