import cvsQueries from '../../database/queries/cv';

const CvController = {
    get: async (req, res) => {
        try {
            const resultElements = await cvsQueries.getCvs();
            res.status(200).json({ cvs: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    post: async (req, res) => {
        try {
            const cvCreated = await cvsQueries.createCv(req);
            res.status(200).json({ cvCreated: cvCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ cv: res.locals.cv });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    getByCandidate: async (req, res) => {
        try {
            res.status(200).json({ resultCvs: res.locals.cvsByCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row update: ' + error.message);
        }
    },

    put: async (req, res) => {
        try {
            const cvUpdated = await cvsQueries.updateCv(req, res);
            res.status(200).json({ cvUpdated: cvUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row update: ' + error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedCv = await cvsQueries.deleteCv(req, res);
            res.status(200).json({ deletedCv: deletedCv });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    }
}

export default CvController;