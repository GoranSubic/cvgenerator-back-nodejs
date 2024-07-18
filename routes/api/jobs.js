import express from 'express';
import job from '../../controllers/jobcontroller.js';
import jobsQueries from '../../database/queries/jobs.js';
const router = express.Router();

// Gets all jobs.
router.get("/", job.get);

// Create new job.
router.post("/", job.post);

router
    .route("/:id")
    .get(job.getId)
    .put(job.put)
    .delete(job.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultJob = await jobsQueries.getJob(id);
        if (resultJob.length === 0) {
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