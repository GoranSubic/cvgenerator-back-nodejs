import sequelize from '../../database/sequelize/init-sequelize.js';

async function getJobs() {
    const [results, metadata] = await sequelize.query('SELECT * FROM jobs WHERE enabled = :enabled', {
        replacements: { enabled: true },
        plain: false,
        raw: true,
        type: sequelize.Sequelize.SELECT
    });
  
    return results;
}

async function getJob(jobId) {
    const [results, metadata] = await sequelize.query('SELECT * FROM jobs WHERE id = :id', {
        replacements: { id: jobId },
        plain: false,
        raw: true,
        type: sequelize.Sequelize.SELECT
    });
  
    return results;
}

async function createJob(request) {
    const [results, metadata] = await sequelize.query(
        `INSERT INTO jobs (title)
        VALUES ($title)
        RETURNING *;`,
        {
            bind: {
                title: request.body.title ? request.body.title : null
            }
        }, {
        plain: false,
        raw: true,
        type: sequelize.Sequelize.INSERT
    });
  
    return results;
}

async function updateJob(request, response) {
    const [results, metadata] = await sequelize.query(
        `UPDATE jobs
            SET title = :title
            WHERE id = :id
            RETURNING *;`, {
        replacements: {
            id: response.locals.job[0].id,
            title: request.body.title ? request.body.title : response.locals.job[0].title
        },
        plain: false,
        raw: true,
        type: sequelize.Sequelize.UPDATE
    });

    return results;
}

async function deleteJob(request, response) {
    const jobId = response.locals.job[0].id;

    const [results, metadata] = await sequelize.query('DELETE FROM jobs WHERE id = :id RETURNING *;', {
        replacements: { id: jobId },
        plain: false,
        raw: true,
        type: sequelize.Sequelize.DELETE
    });

    return results;
}

const jobsQueries = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}

export default jobsQueries;