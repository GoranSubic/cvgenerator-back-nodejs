import coursesOnCandidates from '../../database/queries/Candidate/CoursesOnCandidates';

const CoursesOnCandidatesController = {
    get: async (req, res) => {
        try {
            const resultElements = await coursesOnCandidates.getCoursesOnCandidates();
            res.status(200).json({ coursesOnCandidates: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ courseOnCandidate: res.locals.courseOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const deletedCourseOnCandidate = await coursesOnCandidates.deleteCoursesOnCandidatesById(req, res);
            res.status(200).json({ deletedCourseOnCandidate: deletedCourseOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    },

    post: async (req, res) => {
        try {
            const courseCreated = await coursesOnCandidates.createCoursesOnCandidatesRelated(req);
            res.status(200).json({ courseCreatedRelated: courseCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in insert new record: ' + error.message);
        }
    },

    getIdRelated: async (req, res) => {
        try {
            res.status(200).json({ coursesOnCandidates: res.locals.coursesOnCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.sendStatus('Error in row selection: ' + error.message);
        }
    },

    putRelated: async (req, res) => {
        try {
            const courseOnCandidateUpdated = await coursesOnCandidates.updateRelated(req, res);
            res.status(200).json({ courseOnCandidateUpdated: courseOnCandidateUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row update: ' + error.message);
        }
    },

    deleteRelated: async (req, res) => {
        try {
            const deletedCourse = await coursesOnCandidates.deleteRelated(req, res);
            res.status(200).json({ deletedCourseOnCandidate: deletedCourse });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(400).send('Error in row deletion: ' + error.message);
        }
    }
}

export default CoursesOnCandidatesController;