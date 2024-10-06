import express from 'express';
import LoginController from '../../controllers/Login/LoginController';
const router = express.Router();

// Create new user.
router.post("/login", LoginController.login);


export default router;