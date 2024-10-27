import languagesOnCandidates from '../../database/queries/Candidate/LanguagesOnCandidates';

const LanguagesOnCandidatesController = {
    get: async (req, res) => {
        try {
            const resultElements = await languagesOnCandidates.getLanguagesOnCandidates();
            res.status(200).json({ languagesOnCandidates: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ languageOnCandidate: res.locals.languageOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    delete: async (req, res) => {
        try {
            const deletedLanguageOnCandidate = await languagesOnCandidates.deleteLanguagesOnCandidatesById(req, res);
            res.status(200).json({ deletedLanguageOnCandidate: deletedLanguageOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    },

    post: async (req, res) => {
        try {
            const languageCreated = await languagesOnCandidates.createLanguagesOnCandidatesRelated(req);
            res.status(200).json({ languageCreated: languageCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in insert new record: ' + error.message});
        }
    },

    getIdRelated: async (req, res) => {
        try {
            res.status(200).json({ languagesOnCandidates: res.locals.languagesOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    putRelated: async (req, res) => {
        try {
            const languageOnCandidateUpdated = await languagesOnCandidates.updateRelated(req, res);
            res.status(200).json({ languageOnCandidateUpdated: languageOnCandidateUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row update: ' + error.message});
        }
    },

    deleteRelated: async (req, res) => {
        try {
            const deletedLanguage = await languagesOnCandidates.deleteRelated(req, res);
            res.status(200).json({ deletedLanguageOnCandidateRelated: deletedLanguage });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    }
}

export default LanguagesOnCandidatesController;