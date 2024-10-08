import express from 'express';
import AuthController from '../../controllers/Auth/AuthController';
const router = express.Router();

// Register user.
router.post("/register", AuthController.register);

// Login user.
router.post("/login", AuthController.login);

// Create new token.
router.post("/token", AuthController.refreshToken);

// Revoke tokens - disable tokens related to user id.
router.delete("/revoke-refresh-tokens", AuthController.revokeRefreshTokens);

export default router;