import candidatesQueries from '../../database/queries/candidates';
import usersCandidates from '../../database/queries/Candidate/UsersCandidates';

const CandidateController = {
    getAll: async (req, res) => {
        try {
            const resultElements = await candidatesQueries.getCandidatesAll();
            res.status(200).json({ candidates: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    get: async (req, res) => {
        try {
            const resultElements = await candidatesQueries.getCandidates();
            res.status(200).json({ candidates: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    post: async (req, res) => {
        try {
            const candidateCreated = await candidatesQueries.createCandidate(req);

            let userCandidateRelated = null;
            if (req.user !== undefined) {
                userCandidateRelated = await usersCandidates.createdCandidates(req.user.id, candidateCreated[0].id);
            }

            res.status(200).json({ candidateCreated: candidateCreated[0], userCandidateRelated: userCandidateRelated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in insert new record: ' + error.message});
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ candidate: res.locals.candidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    put: async (req, res) => {
        try {
            const candidateUpdated = await candidatesQueries.updateCandidate(req, res);

            let userCandidateRelated = null;
            if (req.user !== undefined) {
                userCandidateRelated = await usersCandidates.updatedCandidates(req.user.id, candidateUpdated.id, req.body, 'UPDATE');
            }

            res.status(200).json({ candidateUpdated: candidateUpdated, userCandidateRelated: userCandidateRelated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row update: ' + error.message});
        }
    },

    delete: async (req, res) => {
        try {
            const deletedCandidate = await candidatesQueries.deleteCandidate(req, res);
            res.status(200).json({ deletedCandidate: deletedCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    }
}

export default CandidateController;