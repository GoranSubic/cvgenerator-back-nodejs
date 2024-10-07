import jwt from "jsonwebtoken";
import { config_env as config, node_env } from "../../config/config-env";

const envConfig = config[node_env];
const accessTokenSecret = envConfig.access_token_secret;

const AuthMiddleware = {
    isAuthenticated: (req, res, next) => {
        const { authorization } = req.headers;
    
        if (!authorization) {
            res.status(401);
            throw new Error('🚫 Un-Authorized 🚫');
        }
    
        try {
            const token = authorization.split(' ')[1];
            const payload = jwt.verify(token, accessTokenSecret);
            req.payload = payload;
        } catch (err) {
            res.status(401);
            if (err.name === 'TokenExpiredError') {
                throw new Error(err.name);
            }
            throw new Error('🚫 Un-Authorized 🚫');
        }
    
        return next();
    }
}
  
  export default AuthMiddleware;