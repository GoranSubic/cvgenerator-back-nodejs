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
            res.status(400).send({msg: `There is no job with id ${id}`}).end();
        } else {
            res.locals.job = resultJob;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultJobId: ' + error.message);
        res.sendStatus(500).end();
    }
});

export default router;