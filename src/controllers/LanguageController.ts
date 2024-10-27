import languagesQueries from '../../database/queries/languages';

const LanguageController = {
    get: async (req, res) => {
        try {
            const resultElements = await languagesQueries.getLanguages();
            res.status(200).json({ languages: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    post: async (req, res) => {
        try {
            const languageCreated = await languagesQueries.createLanguage(req);
            res.status(201).json({ languageCreated: languageCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in insert new record: ' + error.message});
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ language: res.locals.language });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    put: async (req, res) => {
        try {
            const languageUpdated = await languagesQueries.updateLanguage(req, res);
            res.status(200).json({ languageUpdated: languageUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row update: ' + error.message});
        }
    },

    delete: async (req, res) => {
        try {
            const deletedLanguage = await languagesQueries.deleteLanguage(req, res);
            res.status(204).json({ deletedLanguage: deletedLanguage });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    }
}

export default LanguageController;