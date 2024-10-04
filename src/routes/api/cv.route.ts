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
            res.status(400).send({msg: `There is no cv with id ${id}`}).end();
        } else {
            res.locals.cv = resultCv;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultCvId: ' + error.message);
        res.sendStatus(500).end();
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
            res.status(400).send({msg: `There is no cv related with candidateId ${candidateId}`}).end();
        } else {
            res.locals.cvsByCandidate = resultCvs;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultCvId: ' + error.message);
        res.sendStatus(500).end();
    }
});

export default router;