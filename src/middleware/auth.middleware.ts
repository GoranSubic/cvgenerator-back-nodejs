import jwt from "jsonwebtoken";
import { config_env as config, node_env } from "../../config/config-env";

const envConfig = config[node_env];
const accessTokenSecret = envConfig.access_token_secret;

const AuthMiddleware = {
    isAuthenticated: (req, res, next) => {
        const { authorization } = req.headers;
    
        if (!authorization) {
            res.status(401).json({msg: '🚫 Un-Authorized 🚫'});
        }
    
        try {
            const token = authorization.split(' ')[1];
            const payload = jwt.verify(token, accessTokenSecret);
            req.user = payload;
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                res.status(401).json({msg: '🚫 Un-Authorized 🚫 ', error: err.name });
            }
            res.status(401).json({msg: '🚫 Un-Authorized 🚫'});
        }
    
        return next();
    }
}
  
  export default AuthMiddleware;