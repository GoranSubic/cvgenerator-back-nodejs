import educationsOnCandidates from '../../database/queries/Candidate/EducationsOnCandidates';

const EducationsOnCandidatesController = {
    get: async (req, res) => {
        try {
            const resultElements = await educationsOnCandidates.getEducationsOnCandidates();
            res.status(200).json({ educationsOnCandidates: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ educationOnCandidate: res.locals.educationOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedEducationOnCandidate = await educationsOnCandidates.deleteEducationsOnCandidatesById(req, res);
            res.status(200).json({ deletedEducationOnCandidate: deletedEducationOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    },

    post: async (req, res) => {
        try {
            const educationCreated = await educationsOnCandidates.createEducationsOnCandidatesRelated(req);
            res.status(200).json({ educationCreatedRelated: educationCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    getIdRelated: async (req, res) => {
        try {
            res.status(200).json({ educationsOnCandidates: res.locals.educationsOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    putRelated: async (req, res) => {
        try {
            const educationOnCandidateUpdated = await educationsOnCandidates.updateRelated(req, res);
            res.status(200).json({ educationOnCandidateUpdated: educationOnCandidateUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row update: ' + error.message);
        }
    },

    deleteRelated: async (req, res) => {
        try {
            const deletedEducation = await educationsOnCandidates.deleteRelated(req, res);
            res.status(200).json({ deletedEducationOnCandidate: deletedEducation });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    }
}

export default EducationsOnCandidatesController;