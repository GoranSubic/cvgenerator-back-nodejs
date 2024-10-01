import express from 'express';
import CandidateController from '../../controllers/CandidateController';
import candidatesQueries from '../../../database/queries/candidates';
const router = express.Router();

// Gets all candidates.
router.get("/", async (req, res) => {
    try {
        const resultElements = await candidatesQueries.getCandidates();
        res.status(200).json({ candidates: resultElements });
    } catch (error) {
        console.log('Error:' + error.message);
        res.sendStatus('Error in row selection:' + error.message);
    }
});

// Insert new candidate.
router.post("/", async (req, res) => {
    try {
        const candidateCreated = await candidatesQueries.createCandidate(req);
        res.status(200).json({ candidateCreated: candidateCreated });
    } catch (error) {
        console.log('Error:' + error.message);
        res.status(400).send('Error in insert new record:' + error.message);
    }
});

router
    .route("/:id")
    .get(CandidateController.getId)
    .put(CandidateController.put)
    .delete(CandidateController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultCandidate = await candidatesQueries.getCandidate(id);
        if ((resultCandidate ?? undefined) !== undefined) {
            res.locals.candidate = resultCandidate;

            next(); // execute next action - get/put/delete
        } else {
            res.status(400).send({msg: `There is no candidate with id ${id}`}).end();
        }
    } catch (error) {
        console.log('Error, resultCandidateId: ' + error.message);
        res.sendStatus(500).end();
    }
});

export default router;