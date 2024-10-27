import express from 'express';
import JobsOnCandidatesController from '../../controllers/JobsOnCandidatesController';
import JobsOnCandidatesQueries from '../../../database/queries/Candidate/JobsOnCandidates';
const router = express.Router();

// Gets all jobsoncandidates relations.
router.get("/jobs", JobsOnCandidatesController.get);

// Create new jobsoncandidates relations.
router.post("/jobs", JobsOnCandidatesController.post);

router
    .route("/jobs/:candidatesJobsId")
    .get(JobsOnCandidatesController.getId)
    .delete(JobsOnCandidatesController.delete)

// Middleware.
router.param("candidatesJobsId", async (req, res, next, id) => {
    try {
        const jobOnCandidate = await JobsOnCandidatesQueries.getCJ(id);
        if ((jobOnCandidate ?? undefined) === undefined) {
            res.status(400).send({msg: `There is no Job on Candidate with id ${id}`}).end();
        } else {
            res.locals.jobOnCandidate = jobOnCandidate;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultJobsOnCandidateId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultJobsOnCandidateId: ' + error.message});
    }
});

router
    .route("/:candidateId/job/:jobId?")
    .get(JobsOnCandidatesController.getIdRelated)
    // .put(JobsOnCandidatesController.putRelated)
    .delete(JobsOnCandidatesController.deleteRelated)

// Middleware.
router.param("candidateId", async (req, res, next, candidateId) => {
    try {
        const resultJobs = await JobsOnCandidatesQueries.getCandidatesJobById(candidateId, req.params.jobId);

        if (((resultJobs ?? undefined) === undefined) || (resultJobs.length === 0)) {
            res.status(400).send({msg: `Candidate with id ${candidateId} is not related with job.`}).end();
        } else {
            res.locals.jobsOnCandidate = resultJobs;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultJobsOnCandidateId related: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultJobsOnCandidateId: ' + error.message});
    }
});

export default router;