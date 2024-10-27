import express from 'express';
import LanguagesOnCandidatesController from '../../controllers/LanguagesOnCandidatesController';
import languagesOnCandidates from '../../../database/queries/Candidate/LanguagesOnCandidates';
const router = express.Router();

// Gets all languagesOnCandidates relations.
router.get("/languages", LanguagesOnCandidatesController.get);

// Create new languagesOnCandidates relations.
router.post("/languages", LanguagesOnCandidatesController.post);

router
    .route("/languages/:candidatesLanguagesId")
    .get(LanguagesOnCandidatesController.getId)
    .delete(LanguagesOnCandidatesController.delete)

// Middleware.
router.param("candidatesLanguagesId", async (req, res, next, candidatesLanguagesId) => {
    try {
        const languageOnCandidate = await languagesOnCandidates.getLanguageOnCandidate(candidatesLanguagesId);
        if ((languageOnCandidate ?? undefined) === undefined) {
            res.status(404).json({error: 'Not Found.', details: `There is no Language on Candidate with id ${candidatesLanguagesId}`});
        } else {
            res.locals.languageOnCandidate = languageOnCandidate;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultLanguagesOnCandidateId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultLanguagesOnCandidateId: ' + error.message});
    }
});

router
    .route("/:candidateId/language/:languageId?")
    .get(LanguagesOnCandidatesController.getIdRelated)
    .put(LanguagesOnCandidatesController.putRelated)
    .delete(LanguagesOnCandidatesController.deleteRelated)

// Middleware.
router.param("candidateId", async (req, res, next, candidateId) => {
    try {
        const languageId: number = + req.params.languageId;
        const resultLanguages = await languagesOnCandidates.getLanguagesOnCandidatesByIdsRelated(candidateId, languageId);

        if (((resultLanguages ?? undefined) === undefined) || (resultLanguages.length === 0)) {
            res.status(404).json({error: 'Not Found.', details: `Candidate with id ${candidateId} is not related with language.`});
        } else {
            res.locals.languagesOnCandidate = resultLanguages;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultLanguagesOnCandidateId related: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultLanguagesOnCandidateId: ' + error.message});
    }
});

export default router;