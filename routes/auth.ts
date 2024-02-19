import express from 'express';
import googleRedir from '../controllers/googleRedir';
import googleAuth from '../controllers/googleAuth';

const router = express.Router();

router.get('/google', googleRedir);
router.get('/gcode', googleAuth);
export default router;