import jwt from "jsonwebtoken";
import { User } from "../../generated/client";
import { config_env as config, node_env } from "../../config/config-env";

const envConfig = config[node_env];
const accessTokenSecret = envConfig.access_token_secret;
const accessTokenLifetime = envConfig.access_token_lifetime;
const refreshTokenSecret = envConfig.refresh_token_secret;
const refreshTokenLifetime = envConfig.refresh_token_lifetime;

async function generateAccessToken(user: User) {
    return jwt.sign(user, accessTokenSecret, { expiresIn: accessTokenLifetime });
}

async function generateRefreshToken(user, jti) {
    return jwt.sign({
        userId: user.id,
        jti
    }, refreshTokenSecret, {
        expiresIn: refreshTokenLifetime,
    });
}

async function generateTokens(user: User, jti: string) {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken,
    };
}

export default generateTokens;