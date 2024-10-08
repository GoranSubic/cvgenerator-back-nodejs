import express from 'express';
import UsersCandidatesController from '../../controllers/UsersCandidatesController';
import usersCandidates from '../../../database/queries/Candidate/UsersCandidates';
const router = express.Router();

// Gets all UsersCandidates relations.
router.get("/users", UsersCandidatesController.get);

// Create new skillsOnCandidates relations.
router.post("/skills", UsersCandidatesController.post);

router
    .route("/users/:usersCandidatesId")
    .get(UsersCandidatesController.getId)

// Middleware.
router.param("usersCandidatesId", async (req, res, next, usersCandidatesId) => {
    try {
        const userCandidate = await usersCandidates.getUserCandidate(usersCandidatesId);
        if ((userCandidate ?? undefined) === undefined) {
            res.status(400).send({msg: `There is no UsersCandidates relation with id ${usersCandidatesId}`}).end();
        } else {
            res.locals.userCandidate = userCandidate;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultUserCandidateId: ' + error.message);
        res.sendStatus(500).end();
    }
});

router
    .route("/:candidateId/user/:userId?")
    .get(UsersCandidatesController.getIdRelated)

// Middleware.
router.param("candidateId", async (req, res, next, candidateId) => {
    try {
        const userId: number = + req.params.userId;
        const resultUsersCandidates = await usersCandidates.getUsersCandidatesByIdsRelated(candidateId, userId);

        if (((resultUsersCandidates ?? undefined) === undefined) || (resultUsersCandidates.length === 0)) {
            res.status(400).send({msg: `Candidate with id ${candidateId} is not related with user.`}).end();
        } else {
            res.locals.usersCandidate = resultUsersCandidates;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultUsersCandidateId related: ' + error.message);
        res.sendStatus(500).end();
    }
});

export default router;