import loginsQueries from '../../../database/queries/login/login';

const LoginController = {
    login: async (req, res, next) => {
        try {
            const user = await loginsQueries.loginUser(req);
            res.status(200).json({ userLogin: user });
        } catch (error) {
            // console.log('\n error is: ', error);
            // console.log('\n Error: ' + error.message);
            res.status(error.status || 400).send('\n Error login user: ' + error.message);
        }
    },
}

export default LoginController;