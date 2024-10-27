import coursesQueries from '../../database/queries/courses';

const CourseController = {
    get: async (req, res) => {
        try {
            const resultElements = await coursesQueries.getCourses();
            res.status(200).json({ courses: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    post: async (req, res) => {
        try {
            const courseCreated = await coursesQueries.createCourse(req);
            res.status(200).json({ courseCreated: courseCreated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in insert new record: ' + error.message});
        }
    },

    getId: async (req, res) => {
        try {
            res.status(200).json({ course: res.locals.course });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    put: async (req, res) => {
        try {
            const courseUpdated = await coursesQueries.updateCourse(req, res);
            res.status(200).json({ courseUpdated: courseUpdated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row update: ' + error.message});
        }
    },

    delete: async (req, res) => {
        try {
            const deletedCourse = await coursesQueries.deleteCourse(req, res);
            res.status(200).json({ deletedCourse: deletedCourse });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    }
}

export default CourseController;