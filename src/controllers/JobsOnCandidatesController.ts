import jobsOnCandidates from '../../database/queries/Candidate/JobsOnCandidates';

const JobsOnCandidatesController = {
    get: async (req, res) => {
        try {
            const resultElements = await jobsOnCandidates.getCandidatesJobs();
            res.status(200).json({ jobs: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ jobOnCandidate: res.locals.jobOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedJobOnCandidate = await jobsOnCandidates.deleteById(req, res);
            res.status(200).json({ deletedJobOnCandidateRelation: deletedJobOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    },

    post: async (req, res) => {
        try {
            const jobCreated = await jobsOnCandidates.createJobsOnCandidates(req);
            res.status(200).json({ jobCreated: jobCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    getIdRelated: async (req, res) => {
        try {
            res.status(200).json({ jobsOnCandidates: res.locals.jobsOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    putRelated: async (req, res) => {
        try {
            const jobOnCandidateUpdated = await jobsOnCandidates.updateRelated(req, res);
            res.status(200).json({ jobOnCandidateUpdated: jobOnCandidateUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row update: ' + error.message);
        }
    },

    deleteRelated: async (req, res) => {
        try {
            const deletedJob = await jobsOnCandidates.deleteRelated(req, res);
            res.status(200).json({ deletedJobOnCandidate: deletedJob });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    }
}

export default JobsOnCandidatesController;