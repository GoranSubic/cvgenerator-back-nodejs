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
            res.status(404).json({error: 'Not Found.', details: `There is no user with id ${id}`});
        } else {
            res.locals.user = resultUser;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultUserId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultUserId: ' + error.message});
    }
});

export default router;