import jobsQueries from '../database/queries/jobs.js';

const job = {
    get: async (req, res) => {
        try {
            const resultElements = await jobsQueries.getJobs();
            res.status(200).json({ jobs: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    post: async (req, res) => {
        try {
            const jobCreated = await jobsQueries.createJob(req);
            res.status(200).json({ jobCreated: jobCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ job: res.locals.job });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    put: async (req, res) => {
        try {
            const jobUpdated = await jobsQueries.updateJob(req, res);
            res.status(200).json({ jobUpdated: jobUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row update: ' + error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedJob = await jobsQueries.deleteJob(req, res);
            res.status(200).json({ deletedJob: deletedJob });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    }
}

export default job;