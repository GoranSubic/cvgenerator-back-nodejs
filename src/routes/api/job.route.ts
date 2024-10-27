import express from 'express';
import JobController from '../../controllers/JobController';
import JobsQueries from '../../../database/queries/jobs';
const router = express.Router();

// Gets all jobs.
router.get("/", JobController.get);

// Create new job.
router.post("/", JobController.post);

router
    .route("/:id")
    .get(JobController.getId)
    .put(JobController.put)
    .delete(JobController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultJob = await JobsQueries.getJob(id);
        if ((resultJob ?? undefined) === undefined) {
            res.status(404).json({error: 'Not Found.', details: `There is no job with id ${id}`});
        } else {
            res.locals.job = resultJob;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultJobId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultJobId: ' + error.message});
    }
});

export default router;