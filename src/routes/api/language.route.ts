import express from 'express';
import LanguageController from '../../controllers/LanguageController';
import LanguagesQueries from '../../../database/queries/languages';
const router = express.Router();

// Gets all languages.
router.get("/", LanguageController.get);

// Create new language.
router.post("/", LanguageController.post);

router
    .route("/:id")
    .get(LanguageController.getId)
    .put(LanguageController.put)
    .delete(LanguageController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultLanguage = await LanguagesQueries.getLanguage(id);
        if ((resultLanguage ?? undefined) === undefined) {
            res.status(400).send({msg: `There is no language with id ${id}`}).end();
        } else {
            res.locals.language = resultLanguage;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultLanguageId: ' + error.message);
        res.sendStatus(500).end();
    }
});

export default router;