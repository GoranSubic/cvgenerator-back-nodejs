import express from 'express';
import CourseController from '../../controllers/CourseController';
import coursesQueries from '../../../database/queries/courses';
const router = express.Router();

// Gets all courses.
router.get("/", CourseController.get);

// Create new course.
router.post("/", CourseController.post);

router
    .route("/:id")
    .get(CourseController.getId)
    .put(CourseController.put)
    .delete(CourseController.delete)

// Middleware.
router.param("id", async (req, res, next, id) => {
    try {
        const resultCourse = await coursesQueries.getCourse(id);
        if ((resultCourse ?? undefined) === undefined) {
            res.status(400).send({msg: `There is no course with id ${id}`}).end();
        } else {
            res.locals.course = resultCourse;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultCoursed: ' + error.message);
        res.sendStatus(500).end();
    }
});

export default router;