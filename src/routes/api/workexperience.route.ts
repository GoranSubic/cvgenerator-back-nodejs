import express from 'express';
import WorkExperienceController from '../../controllers/WorkExperienceController';
import workExperiencesQueries from '../../../database/queries/workexperience';
const router = express.Router();

// Gets all workExperiences.
router.get("/", WorkExperienceController.get);

// Create new workExperience.
router.post("/", WorkExperienceController.post);

router
    .route("/:id")
    .get(WorkExperienceController.getId)
    .put(WorkExperienceController.put)
    .delete(WorkExperienceController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultWorkExperience = await workExperiencesQueries.getWorkExperience(id);
        if ((resultWorkExperience ?? undefined) === undefined) {
            res.status(404).json({error: 'Not Found.', details: `There is no workExperience with id ${id}`});
        } else {
            res.locals.workExperience = resultWorkExperience;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultWorkExperienceId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultWorkExperienceId: ' + error.message});
    }
});

router
    .route("/candidate/:candidateId")
    .get(WorkExperienceController.getByCandidate)

// Middleware.
router.param("candidateId", async (req, res, next, candidateId) => {
    try {
        const resultWorkExperiences = await workExperiencesQueries.getWorkExperiencesByCandidate(candidateId);
        if (((resultWorkExperiences ?? undefined) === undefined) || !Array.isArray(resultWorkExperiences) || !resultWorkExperiences.length) {
            res.status(404).json({error: 'Not Found.', details: `There is no workExperience related with candidateId ${candidateId}`});
        } else {
            res.locals.workExperiencesByCandidate = resultWorkExperiences;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultWorkExperienceId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultWorkExperienceId: ' + error.message});
    }
});

export default router;