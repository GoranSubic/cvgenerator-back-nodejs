import usersQueries from '../../database/queries/users';

const UserController = {
    get: async (req, res) => {
        try {
            const resultElements = await usersQueries.getUsers();
            res.status(200).json({ users: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    post: async (req, res) => {
        try {
            const userCreated = await usersQueries.createUser(req);
            res.status(200).json({ userCreated: userCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ user: res.locals.user });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    put: async (req, res) => {
        try {
            const userUpdated = await usersQueries.updateUser(req, res);
            res.status(200).json({ userUpdated: userUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row update: ' + error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedUser = await usersQueries.deleteUser(req, res);
            res.status(200).json({ deletedUser: deletedUser });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    }
}

export default UserController;