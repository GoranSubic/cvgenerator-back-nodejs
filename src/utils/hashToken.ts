import crypto from 'crypto';

const HashToken = {
    hashToken: async(token: string) => {
        return crypto.createHash('sha512').update(token).digest('hex');
    }
};

export default HashToken;