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
            res.status(404).json({error: 'Not Found.', details: `There is no UsersCandidates relation with id ${usersCandidatesId}`});
        } else {
            res.locals.userCandidate = userCandidate;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultUserCandidateId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultUserCandidateId: ' + error.message});
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
            res.status(404).json({error: 'Not Found.', details: `Candidate with id ${candidateId} is not related with user.`});
        } else {
            res.locals.usersCandidate = resultUsersCandidates;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultUsersCandidateId related: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultUsersCandidateId: ' + error.message});
    }
});

export default router;