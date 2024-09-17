import prisma from "../client";

async function getJobs() {
    const results = await prisma.$queryRaw`SELECT id, enabled, title FROM jobs`;
  
    return results;
}

async function getJob(jobId) {
    const inputId = jobId;
    const result = await prisma.$queryRawUnsafe(
        'SELECT * FROM jobs WHERE (id = $1::Int)',
        inputId
    );

    return result;
}

async function createJob(request) {
    const jobTitle = request.body.title ? request.body.title : null;
    const result = await prisma.$queryRaw`INSERT INTO jobs (title)
            VALUES (${jobTitle})
            RETURNING *;`

    return result;
}

async function updateJob(request, response) {
    const id = response.locals.job[0].id;
    const title = request.body.title ? request.body.title : response.locals.job[0].title;
    const result = await prisma.$queryRaw`UPDATE jobs
            SET title = ${title}
            WHERE id = ${id}
            RETURNING *;`

    return result;
}

async function deleteJob(request, response) {
    const jobId = response.locals.job[0].id;
    const result = await prisma.$queryRawUnsafe(
        'DELETE FROM jobs WHERE (id = $1::Int) RETURNING *',
        jobId
    );

    return result;
}

const jobsQueries = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}

export default jobsQueries;