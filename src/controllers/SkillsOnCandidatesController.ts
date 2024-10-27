import skillsOnCandidates from '../../database/queries/Candidate/SkillsOnCandidates';

const SkillsOnCandidatesController = {
    get: async (req, res) => {
        try {
            const resultElements = await skillsOnCandidates.getSkillsOnCandidates();
            res.status(200).json({ skillsOnCandidates: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ skillOnCandidate: res.locals.skillOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    delete: async (req, res) => {
        try {
            const deletedSkillOnCandidate = await skillsOnCandidates.deleteSkillsOnCandidatesById(req, res);
            res.status(204).json({ deletedSkillOnCandidate: deletedSkillOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    },

    post: async (req, res) => {
        try {
            const skillCreated = await skillsOnCandidates.createSkillsOnCandidatesRelated(req);
            res.status(201).json({ skillCreated: skillCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    getIdRelated: async (req, res) => {
        try {
            res.status(200).json({ skillsOnCandidates: res.locals.skillsOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    // putRelated: async (req, res) => {
    //     try {
    //         const skillOnCandidateUpdated = await skillsOnCandidates.updateRelated(req, res);
    //         res.status(200).json({ skillOnCandidateUpdated: skillOnCandidateUpdated });
    //     } catch (error) {
    //         console.log('Error: ' + error.message);
    //         res.status(400).send('Error in row update: ' + error.message);
    //     }
    // },

    deleteRelated: async (req, res) => {
        try {
            const deletedSkill = await skillsOnCandidates.deleteRelated(req, res);
            res.status(204).json({ deletedSkillOnCandidateRelated: deletedSkill });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    }
}

export default SkillsOnCandidatesController;