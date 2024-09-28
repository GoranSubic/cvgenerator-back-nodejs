import jobsOnCandidates from '../../database/queries/Candidate/JobsOnCandidates';

const JobsOnCandidatesController = {
    post: async (req, res) => {
        try {
            const jobCreated = await jobsOnCandidates.createJobsOnCandidates(req);
            res.status(200).json({ jobCreated: jobCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    // Works as get for /.
    getByJobsId: async (req, res) => {
        try {
            res.status(200).json({ candidates: res.locals.candidates });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    put: async (req, res) => {
        try {
            const jobUpdated = await jobsOnCandidates.updateJob(req, res);
            res.status(200).json({ jobUpdated: jobUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row update: ' + error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedJob = await jobsOnCandidates.deleteJob(req, res);
            res.status(200).json({ deletedJob: deletedJob });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    }
}

export default JobsOnCandidatesController;