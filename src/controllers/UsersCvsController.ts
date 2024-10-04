import usersCvs from '../../database/queries/Cv/UsersCvs';

const UsersCvsController = {
    get: async (req, res) => {
        try {
            const resultElements = await usersCvs.getUsersCvs();
            res.status(200).json({ usersCvs: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ userCv: res.locals.userCv });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    getIdRelated: async (req, res) => {
        try {
            res.status(200).json({ usersCvs: res.locals.usersCv });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },
}

export default UsersCvsController;