import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { config_env as config, node_env } from "../../../config/config-env";
import authQueries from '../../../database/queries/auth/auth';
import AuthService from "./auth.services";
import HashToken from '../../utils/hashToken';
import generateTokens from '../../utils/jwt';

const envConfig = config[node_env];
const refreshTokenSecret = envConfig.refresh_token_secret;

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, firstName, lastName } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Bad Request.', details: 'You must provide an email and a password.' });
            }

            const existingUser = await authQueries.findUserByEmail(email);

            if (existingUser) {
                return res.status(400).json({ error: 'Bad Request.', details: 'Email already in use' });
            }

            const user = await authQueries.createUserByEmailAndPassword({ email, password, firstName, lastName });
            const jti = uuidv4();
            const { accessToken, refreshToken } = await generateTokens(user, jti);
            await AuthService.addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error', details: 'Error, register route: ' + error.message});
        }
    };

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'You must provide an email and a password.' });
            }

            const existingUser = await authQueries.findUserByEmail(email);

            if (!existingUser) {
                return res.status(404).json({ error: 'No user found with this email.' });
            }

            const validPassword = await bcrypt.compare(password, existingUser.password);

            if (!validPassword) {
                return res.status(403).json({ error: 'Invalid login credentials.' });
            }

            const jti = uuidv4();
            const { accessToken, refreshToken } = await generateTokens(existingUser, jti);
            await AuthService.addRefreshTokenToWhitelist({jti, refreshToken, userId: existingUser.id});

            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error', details: 'Error, login route: ' + error.message});
        }
    };

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
            await AuthService.deleteRefreshToken(refreshToken);
            res.status(200).json({ message: 'Successfully logged out.' });
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error', details: 'Error, logout route: ' + error.message});
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({ error: 'Missing refresh token.' });
            }

            const payload = jwt.verify(refreshToken, refreshTokenSecret);
            const savedRefreshToken = await AuthService.findRefreshTokenById(payload.jti);

            if (!savedRefreshToken || savedRefreshToken.revoked) {
                return res.status(401).json({ error: 'Invalid refresh token.' });
            }

            const hashedToken = await HashToken.hashToken(refreshToken);
            if (hashedToken !== savedRefreshToken.hashedToken) {
                return res.status(401).json({ error: 'Invalid refresh token.' });
            }

            const user = await authQueries.findUserById(payload.userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // refreshToken revoked set to true
            await AuthService.deleteRefreshToken(savedRefreshToken.id);

            const jti = uuidv4();
            const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user, jti);
            await AuthService.addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

            res.status(200).json({ accessToken: accessToken, refreshToken: newRefreshToken });
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error', details: 'Error, refreshToken route: ' + error.message});
        }
      };

    // Move this logic where needed to revoke the tokens(ex: on password reset)
    async revokeRefreshTokens(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.body;
            await AuthService.revokeTokens(userId);
            res.json({ message: `Tokens revoked for user with id #${userId}` });
        } catch (err) {
            res.status(500).json({error: 'Internal Server Error', details: 'Error, revokeRefreshTokens route: ' + error.message});
        }
    };
}

export default new AuthController();