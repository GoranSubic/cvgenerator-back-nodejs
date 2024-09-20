import express from 'express';
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
    .get((req, res) => {
        res.status(200).json({ candidate: res.locals.candidate });
    })
    .put(async (req, res) => {
        try {
            const candidateUpdated = await candidatesQueries.updateCandidate(req, res);
            res.status(200).json({ candidateUpdated: candidateUpdated });
        } catch (error) {
            console.log('Error:' + error.message);
            res.status(400).send('Error in row update:' + error.message);
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedCandidate = await candidatesQueries.deleteCandidate(req, res);
            res.status(200).json({ deletedCandidate: deletedCandidate });
        } catch (error) {
            console.log('Error:' + error.message);
            res.status(400).send('Error in row deletion:' + error.message);
        }
    });

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