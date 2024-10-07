import express from 'express';
import LoginController from '../../controllers/Login/LoginController';
const router = express.Router();

// Login user.
router.post("/login", LoginController.login);

// Create new token.
router.post("/token", LoginController.refreshToken);

// Revoke tokens - disable tokens related to user id.
router.delete("/revoke-refresh-tokens", LoginController.revokeRefreshTokens);

export default router;