import express from 'express';
import googleRedir from '../controllers/googleRedir';
import googleAuth from '../controllers/googleAuth';
import verify from '../controllers/verify';

const router = express.Router();

router.get('/google', googleRedir);
router.get('/gcode', googleAuth);
router.get('/verify', verify);
export default router;