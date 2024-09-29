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
            res.status(400).send({msg: `There is no skill with id ${id}`}).end();
        } else {
            res.locals.skill = resultSkill;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultSkillId: ' + error.message);
        res.sendStatus(500).end();
    }
});

export default router;