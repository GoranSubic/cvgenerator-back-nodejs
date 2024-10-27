import express from 'express';
import EducationsOnCandidatesController from '../../controllers/EducationsOnCandidatesController';
import educationsOnCandidates from '../../../database/queries/Candidate/EducationsOnCandidates';
const router = express.Router();

// Gets all educationsoncandidates relations.
router.get("/educations", EducationsOnCandidatesController.get);

// Create new educationsoncandidates relations.
router.post("/educations", EducationsOnCandidatesController.post);

router
    .route("/educations/:candidatesEducationsId")
    .get(EducationsOnCandidatesController.getId)
    .delete(EducationsOnCandidatesController.delete)

// Middleware.
router.param("candidatesEducationsId", async (req, res, next, candidatesEducationsId) => {
    try {
        const educationOnCandidate = await educationsOnCandidates.getEducationOnCandidate(candidatesEducationsId);
        if ((educationOnCandidate ?? undefined) === undefined) {
            res.status(400).send({msg: `There is no Education on Candidate with id ${candidatesEducationsId}`}).end();
        } else {
            res.locals.educationOnCandidate = educationOnCandidate;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultEducationsOnCandidateId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultEducationsOnCandidateId: ' + error.message});
    }
});

router
    .route("/:candidateId/education/:educationId?")
    .get(EducationsOnCandidatesController.getIdRelated)
    .put(EducationsOnCandidatesController.putRelated)
    .delete(EducationsOnCandidatesController.deleteRelated)

// Middleware.
router.param("candidateId", async (req, res, next, candidateId) => {
    try {
        const educationId: number = + req.params.educationId;
        const resultEducations = await educationsOnCandidates.getEducationsOnCandidatesByIdsRelated(candidateId, educationId);

        if (((resultEducations ?? undefined) === undefined) || (resultEducations.length === 0)) {
            res.status(400).send({msg: `Candidate with id ${candidateId} is not related with education.`}).end();
        } else {
            res.locals.educationsOnCandidate = resultEducations;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultEducationsOnCandidateId related: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultEducationsOnCandidateId: ' + error.message});
    }
});

export default router;