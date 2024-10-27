import workExperiencesQueries from '../../database/queries/workexperience';

const WorkExperienceController = {
    get: async (req, res) => {
        try {
            const resultElements = await workExperiencesQueries.getWorkExperiences();
            res.status(200).json({ workExperiences: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    post: async (req, res) => {
        try {
            const workExperienceCreated = await workExperiencesQueries.createWorkExperience(req);
            res.status(200).json({ workExperienceCreated: workExperienceCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in insert new record: ' + error.message});
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ workExperience: res.locals.workExperience });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    getByCandidate: async (req, res) => {
        try {
            res.status(200).json({ resultWorkExperiences: res.locals.workExperiencesByCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    put: async (req, res) => {
        try {
            const workExperienceUpdated = await workExperiencesQueries.updateWorkExperience(req, res);
            res.status(200).json({ workExperienceUpdated: workExperienceUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row update: ' + error.message});
        }
    },

    delete: async (req, res) => {
        try {
            const deletedWorkExperience = await workExperiencesQueries.deleteWorkExperience(req, res);
            res.status(200).json({ deletedWorkExperience: deletedWorkExperience });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    }
}

export default WorkExperienceController;