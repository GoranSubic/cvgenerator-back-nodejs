import educationsQueries from "../../database/queries/educations";

const EducationController = {
    get: async (req, res) => {
        try {
            const resultElements = await educationsQueries.getEducations();
            res.status(200).json({ educations: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    post: async (req, res) => {
        try {
            const educationCreated = await educationsQueries.createEducation(req);
            res.status(200).json({ educationCreated: educationCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ education: res.locals.education });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    put: async (req, res) => {
        try {
            const educationUpdated = await educationsQueries.updateEducation(req, res);
            res.status(200).json({ educationUpdated: educationUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row update: ' + error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedEducation = await educationsQueries.deleteEducation(req, res);
            res.status(200).json({ deletedEducation: deletedEducation });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    }
}

export default EducationController;