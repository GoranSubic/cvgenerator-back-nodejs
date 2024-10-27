import express from 'express';
import SkillsOnCandidatesController from '../../controllers/SkillsOnCandidatesController';
import skillsOnCandidates from '../../../database/queries/Candidate/SkillsOnCandidates';
const router = express.Router();

// Gets all skillsOnCandidates relations.
router.get("/skills", SkillsOnCandidatesController.get);

// Create new skillsOnCandidates relations.
router.post("/skills", SkillsOnCandidatesController.post);

router
    .route("/skills/:candidatesSkillsId")
    .get(SkillsOnCandidatesController.getId)
    .delete(SkillsOnCandidatesController.delete)

// Middleware.
router.param("candidatesSkillsId", async (req, res, next, candidatesSkillsId) => {
    try {
        const skillOnCandidate = await skillsOnCandidates.getSkillOnCandidate(candidatesSkillsId);
        if ((skillOnCandidate ?? undefined) === undefined) {
            res.status(400).send({msg: `There is no Skill on Candidate with id ${candidatesSkillsId}`}).end();
        } else {
            res.locals.skillOnCandidate = skillOnCandidate;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultSkillsOnCandidateId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultSkillsOnCandidateId: ' + error.message});
    }
});

router
    .route("/:candidateId/skill/:skillId?")
    .get(SkillsOnCandidatesController.getIdRelated)
    // .put(SkillsOnCandidatesController.putRelated)
    .delete(SkillsOnCandidatesController.deleteRelated)

// Middleware.
router.param("candidateId", async (req, res, next, candidateId) => {
    try {
        const skillId: number = + req.params.skillId;
        const resultSkills = await skillsOnCandidates.getSkillsOnCandidatesByIdsRelated(candidateId, skillId);

        if (((resultSkills ?? undefined) === undefined) || (resultSkills.length === 0)) {
            res.status(400).send({msg: `Candidate with id ${candidateId} is not related with skill.`}).end();
        } else {
            res.locals.skillsOnCandidate = resultSkills;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultSkillsOnCandidateId related: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultSkillsOnCandidateId: ' + error.message});
    }
});

export default router;