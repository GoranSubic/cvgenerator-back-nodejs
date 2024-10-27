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
            res.status(404).json({error: 'Not Found.', details: `There is no course with id ${id}`});
        } else {
            res.locals.course = resultCourse;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultCourses: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultCourses: ' + error.message});
    }
});

export default router;