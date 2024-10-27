import express from 'express';
import UsersCvsController from '../../controllers/UsersCvsController';
import usersCvs from '../../../database/queries/Cv/UsersCvs';
const router = express.Router();

// Gets all UsersCvs relations.
router.get("/users", UsersCvsController.get);

router
    .route("/users/:usersCvsId")
    .get(UsersCvsController.getId)

// Middleware.
router.param("usersCvsId", async (req, res, next, usersCvsId) => {
    try {
        const userCv = await usersCvs.getUserCv(usersCvsId);
        if ((userCv ?? undefined) === undefined) {
            res.status(400).send({msg: `There is no UsersCvs relation with id ${usersCvsId}`}).end();
        } else {
            res.locals.userCv = userCv;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultUserCvId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultUserCvId: ' + error.message});
    }
});

router
    .route("/:cvId/user/:userId?")
    .get(UsersCvsController.getIdRelated)

// Middleware.
router.param("cvId", async (req, res, next, cvId) => {
    try {
        const userId: number = + req.params.userId;
        const resultUsersCvs = await usersCvs.getUsersCvsByIdsRelated(cvId, userId);

        if (((resultUsersCvs ?? undefined) === undefined) || (resultUsersCvs.length === 0)) {
            res.status(400).send({msg: `Cv with id ${cvId} is not related with user.`}).end();
        } else {
            res.locals.usersCv = resultUsersCvs;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultUsersCvId related: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultUsersCvId: ' + error.message});
    }
});

export default router;