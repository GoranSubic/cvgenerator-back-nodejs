import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { config_env as config, node_env } from "../../../config/config-env";
import loginsQueries from '../../../database/queries/login/login';
import AuthService from "./auth.services";
import HashToken from '../../utils/hashToken';
import { User } from "../../../generated/client";

const envConfig = config[node_env];
const accessTokenSecret = envConfig.access_token_secret;
const refreshTokenSecret = envConfig.refresh_token_secret;

class LoginController {
    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400);
                throw new Error('You must provide an email and a password.');
            }

            const existingUser = await loginsQueries.findUserByEmail(email);

            if (!existingUser) {
                res.status(403);
                throw new Error('Invalid login credentials.');
            }

            const validPassword = await bcrypt.compare(password, existingUser.password);
            if (!validPassword) {
                res.status(403);
                throw new Error('Invalid login credentials.');
            }

            const jti = uuidv4();
            const { accessToken, refreshToken } = await this.generateTokens(existingUser, jti);
            await AuthService.addRefreshTokenToWhitelist({jti, refreshToken, userId: existingUser.id});

            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        } catch (error: Error) {
            res.status(error.status || 500).send('\n Error login user: ' + error.message);
        }
    };

    refreshToken = async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                res.status(400);
                throw new Error('Missing refresh token.');
            }
            const payload = jwt.verify(refreshToken, refreshTokenSecret);
            const savedRefreshToken = await AuthService.findRefreshTokenById(payload.jti);

            if (!savedRefreshToken || savedRefreshToken.revoked === true) {
                res.status(401);
                throw new Error('Unauthorized');
            }

            const hashedToken = await HashToken.hashToken(refreshToken);
            if (hashedToken !== savedRefreshToken.hashedToken) {
                res.status(401);
                throw new Error('Unauthorized');
            }

            const user = await loginsQueries.findUserById(payload.userId);
            if (!user) {
                res.status(401);
                throw new Error('Unauthorized');
            }

            // refreshToken revoked set to true
            await AuthService.deleteRefreshToken(savedRefreshToken.id);

            const jti = uuidv4();
            const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(user, jti);
            await AuthService.addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

            res.json({
                accessToken,
                refreshToken: newRefreshToken
            });
        } catch (err) {
            next(err);
        }
      };

    // Move this logic where needed to revoke the tokens(ex: on password reset)
    revokeRefreshTokens = async (req, res, next) => {
        try {
            const { userId } = req.body;
            await AuthService.revokeTokens(userId);
            res.json({ message: `Tokens revoked for user with id #${userId}` });
        } catch (err) {
            next(err);
        }
    };

    private generateAccessToken = async(user: User) => {
        return jwt.sign(user, accessTokenSecret, { expiresIn: '60s' });
    }

    private generateRefreshToken = async(user, jti) => {
        return jwt.sign({
            userId: user.id,
            jti
        }, refreshTokenSecret, {
            expiresIn: '8h',
        });
    }

    private generateTokens = async(user: User, jti: string) => {
        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user, jti);

        return {
            accessToken,
            refreshToken,
        };
    }
}

export default new LoginController();