import express from 'express';
import { body, param, validationResult } from 'express-validator';
import CandidateController from '../../controllers/CandidateController';
import candidatesQueries from '../../../database/queries/candidates';
import { createValidator, updateValidator, deleteValidator } from '../../request-validators/CandidateValidator';
const router = express.Router();

// Gets all candidates.
router.get("/all", CandidateController.getAll);

// Gets all candidates without deleted.
router.get("/", async (req, res) => {
    try {
        const resultElements = await candidatesQueries.getCandidates();
        res.status(200).json({ candidates: resultElements });
    } catch (error) {
        console.log('Error:' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
    }
});

router.post("/", createValidator, CandidateController.post);

router
    .route("/:id([0-9]+)")
    .get(CandidateController.getId)
    .put(updateValidator, CandidateController.put)
    .delete(deleteValidator, CandidateController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultCandidate = await candidatesQueries.getCandidate(id);
        if ((resultCandidate ?? undefined) !== undefined) {
            res.locals.candidate = resultCandidate;

            next(); // execute next action - get/put/delete
        } else {
            res.status(404).json({error: 'Not Found.', details: `There is no candidate with id ${id}`});
        }
    } catch (error) {
        console.log('Error, resultCandidateId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultCandidateId: ' + error.message});
    }
});

export default router;