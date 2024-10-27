import express from 'express';
import EducationController from '../../controllers/EducationController';
import educationsQueries from '../../../database/queries/educations';
const router = express.Router();

// Gets all educations.
router.get("/", EducationController.get);

// Create new education.
router.post("/", EducationController.post);

router
    .route("/:id")
    .get(EducationController.getId)
    .put(EducationController.put)
    .delete(EducationController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultEducation = await educationsQueries.getEducation(id);
        if ((resultEducation ?? undefined) === undefined) {
            res.status(404).json({error: 'Not Found.', details: `There is no education with id ${id}`});
        } else {
            res.locals.education = resultEducation;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultEducationId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultEducationId: ' + error.message});
    }
});

export default router;