import express from 'express';
import CoursesOnCandidatesController from '../../controllers/CoursesOnCandidatesController';
import coursesOnCandidates from '../../../database/queries/Candidate/CoursesOnCandidates';
const router = express.Router();

// Gets all CoursesOnCandidates relations.
router.get("/courses", CoursesOnCandidatesController.get);

// Create new CoursesOnCandidates relations.
router.post("/courses", CoursesOnCandidatesController.post);

router
    .route("/courses/:candidatesCoursesId")
    .get(CoursesOnCandidatesController.getId)
    .delete(CoursesOnCandidatesController.delete)

// Middleware.
router.param("candidatesCoursesId", async (req, res, next, candidatesCoursesId) => {
    try {
        const courseOnCandidate = await coursesOnCandidates.getCourseOnCandidate(candidatesCoursesId);
        if ((courseOnCandidate ?? undefined) === undefined) {
            res.status(404).json({error: 'Not Found.', details: `There is no Course on Candidate with id ${candidatesCoursesId}`});
        } else {
            res.locals.courseOnCandidate = courseOnCandidate;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultCoursesOnCandidateId: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultCoursesOnCandidateId: ' + error.message});
    }
});

router
    .route("/:candidateId/course/:courseId?")
    .get(CoursesOnCandidatesController.getIdRelated)
    .put(CoursesOnCandidatesController.putRelated)
    .delete(CoursesOnCandidatesController.deleteRelated)

// Middleware.
router.param("candidateId", async (req, res, next, candidateId) => {
    try {
        const courseId: number = + req.params.courseId;
        const resultCourses = await coursesOnCandidates.getCoursesOnCandidatesByIdsRelated(candidateId, courseId);

        if (((resultCourses ?? undefined) === undefined) || (resultCourses.length === 0)) {
            res.status(404).json({error: 'Not Found.', details: `Candidate with id ${candidateId} is not related with course.`});
        } else {
            res.locals.coursesOnCandidate = resultCourses;
            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultCoursesOnCandidateId related: ' + error.message);
        res.status(500).json({error: 'Internal Server Error', details: 'Error, resultCoursesOnCandidateId: ' + error.message});
    }
});

export default router;