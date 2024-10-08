import prisma from "../../../database/client";
import HashToken from '../../utils/hashToken';

const AuthService = {
    // used when we create a refresh token.
    addRefreshTokenToWhitelist: async({jti, refreshToken, userId}) => {
        return prisma.token.create({
            data: {
                id: jti,
                hashedToken: await HashToken.hashToken(refreshToken),
                userId
            },
        });
    },

    // used to check if the token sent by the client is in the database.
    findRefreshTokenById: async (id: string) => {
        return prisma.token.findUnique({
            where: {
                id
            },
        });
    },

    // soft delete tokens after usage.
    deleteRefreshToken: async (id: string) => {
        return prisma.token.update({
            where: {
                id: id
            },
            data: {
                revoked: true
            }
        });
    },

    revokeTokens: async (userId: number) => {
        return prisma.token.updateMany({
            where: {
                userId: userId
            },
            data: {
                revoked: true
            }
        });
    }
}

export default AuthService;