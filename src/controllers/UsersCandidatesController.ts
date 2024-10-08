import usersCandidates from '../../database/queries/Candidate/UsersCandidates';

const UsersCandidatesController = {
    get: async (req, res) => {
        try {
            const resultElements = await usersCandidates.getUsersCandidates();
            res.status(200).json({ usersCandidates: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    post: async (req, res) => {
        try {
            const skillCreated = await usersCandidates.createUsersCandidatesRelated(req);
            res.status(200).json({ skillCreated: skillCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ userCandidate: res.locals.userCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    getIdRelated: async (req, res) => {
        try {
            res.status(200).json({ usersCandidates: res.locals.usersCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },
}

export default UsersCandidatesController;