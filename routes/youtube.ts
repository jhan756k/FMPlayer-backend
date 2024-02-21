import express from 'express';
import playList from "../controllers/playList";

const router = express.Router();

router.get('/playlist', playList);

export default router;