import express from 'express';
import JobsOnCandidatesController from '../../controllers/JobsOnCandidatesController';
import JobsOnCandidatesQueries from '../../../database/queries/Candidate/JobsOnCandidates';
const router = express.Router();

// Gets all jobsoncandidates.
// router.get("/", JobsOnCandidatesController.get);

// Create new job.
router.post("/", JobsOnCandidatesController.post);

router
    .route("/:candidateId/job/:jobId?")
    .get(JobsOnCandidatesController.getByJobsId)
    .put(JobsOnCandidatesController.put)
    .delete(JobsOnCandidatesController.delete)

// Middleware.
router.param("candidateId", async (req, res, next, candidateId) => {
    try {
        const resultJobs = await JobsOnCandidatesQueries.getCandidatesJobs(candidateId, req.params.jobId);

        if (((resultJobs ?? undefined) === undefined) || (resultJobs.length === 0)) {
            res.status(400).send({msg: `Candidate with id ${candidateId} has no jobs.`}).end();
        } else {
            res.locals.candidates = resultJobs;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        res.sendStatus(500).end();
    }
});

export default router;