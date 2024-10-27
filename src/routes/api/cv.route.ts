import express from 'express';
import CvController from '../../controllers/CvController';
import cvsQueries from '../../../database/queries/cv';
const router = express.Router();

// Gets all cvs.
router.get("/", CvController.get);

// Create new cv.
router.post("/", CvController.post);

router
    .route("/:id")
    .get(CvController.getId)
    .put(CvController.put)
    .delete(CvController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultCv = await cvsQueries.getCv(id);
        if ((resultCv ?? undefined) === undefined) {
            res.status(404).json({error: 'Not Found.', details: `There is no cv with id ${id}`});
        } else {
            res.locals.cv = resultCv;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultCvId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultCvId: ' + error.message});
    }
});

router
    .route("/candidate/:candidateId")
    .get(CvController.getByCandidate)

// Middleware.
router.param("candidateId", async (req, res, next, candidateId) => {
    try {
        const resultCvs = await cvsQueries.getCvsByCandidate(candidateId);
        if (((resultCvs ?? undefined) === undefined) || !Array.isArray(resultCvs) || !resultCvs.length) {
            res.status(404).json({error: 'Not Found.', details: `There is no cv related with candidateId ${candidateId}`});
        } else {
            res.locals.cvsByCandidate = resultCvs;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultCvId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultCvId: ' + error.message});
    }
});

export default router;