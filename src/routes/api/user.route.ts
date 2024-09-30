import express from 'express';
import UserController from '../../controllers/UserController';
import UsersQueries from '../../../database/queries/users';
const router = express.Router();

// Gets all users.
router.get("/", UserController.get);

// Create new user.
router.post("/", UserController.post);

router
    .route("/:id")
    .get(UserController.getId)
    .put(UserController.put)
    .delete(UserController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultUser = await UsersQueries.getUser(id);
        if ((resultUser ?? undefined) === undefined) {
            res.status(400).send({msg: `There is no user with id ${id}`}).end();
        } else {
            res.locals.user = resultUser;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultUserId: ' + error.message);
        res.sendStatus(500).end();
    }
});

export default router;