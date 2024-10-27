import skillsQueries from '../../database/queries/skills';

const SkillController = {
    get: async (req, res) => {
        try {
            const resultElements = await skillsQueries.getSkills();
            res.status(200).json({ skills: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    post: async (req, res) => {
        try {
            const skillCreated = await skillsQueries.createSkill(req);
            res.status(200).json({ skillCreated: skillCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in insert new record: ' + error.message});
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ skill: res.locals.skill });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    put: async (req, res) => {
        try {
            const skillUpdated = await skillsQueries.updateSkill(req, res);
            res.status(200).json({ skillUpdated: skillUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row update: ' + error.message});
        }
    },

    delete: async (req, res) => {
        try {
            const deletedSkill = await skillsQueries.deleteSkill(req, res);
            res.status(200).json({ deletedSkill: deletedSkill });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    }
}

export default SkillController;