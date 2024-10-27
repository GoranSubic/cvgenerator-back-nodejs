import express from 'express';
import SkillController from '../../controllers/SkillController';
import SkillsQueries from '../../../database/queries/skills';
const router = express.Router();

// Gets all skills.
router.get("/", SkillController.get);

// Create new skill.
router.post("/", SkillController.post);

router
    .route("/:id")
    .get(SkillController.getId)
    .put(SkillController.put)
    .delete(SkillController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultSkill = await SkillsQueries.getSkill(id);
        if ((resultSkill ?? undefined) === undefined) {
            res.status(404).json({error: 'Not Found.', details: `There is no skill with id ${id}`});
        } else {
            res.locals.skill = resultSkill;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultSkillId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultSkillId: ' + error.message});
    }
});

export default router;