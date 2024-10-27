import cvsQueries from '../../database/queries/cv';
import usersCvs from '../../database/queries/Cv/UsersCvs'

const CvController = {
    get: async (req, res) => {
        try {
            const resultElements = await cvsQueries.getCvs();
            res.status(200).json({ cvs: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    post: async (req, res) => {
        try {
            const cvCreated = await cvsQueries.createCv(req);

            let userCvRelated = null;
            if (req.user !== undefined) {
                userCvRelated = await usersCvs.createdCvs(req.user.id, cvCreated.id);
            }

            res.status(204).json({ cvCreated: cvCreated, userCvRelated: userCvRelated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in insert new record: ' + error.message});
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ cv: res.locals.cv });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    getByCandidate: async (req, res) => {
        try {
            res.status(200).json({ resultCvs: res.locals.cvsByCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    put: async (req, res) => {
        try {
            const cvUpdated = await cvsQueries.updateCv(req, res);

            let userCandidateRelated = null;
            if (req.user !== undefined) {
                userCandidateRelated = await usersCvs.updatedCvs(req.user.id, cvUpdated.id, req.body, 'UPDATE');
            }

            res.status(200).json({ cvUpdated: cvUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row update: ' + error.message});
        }
    },

    delete: async (req, res) => {
        try {
            const deletedCv = await cvsQueries.deleteCv(req, res);
            res.status(201).json({ deletedCv: deletedCv });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    }
}

export default CvController;