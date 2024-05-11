const sequelize = require('../../database/sequelize/init-sequelize.js');

async function getCandidates() {
    const [results, metadata] = await sequelize.query('SELECT * FROM candidates WHERE enabled = :enabled', {
        replacements: { enabled: true },
        plain: false,
        raw: true,
        type: sequelize.Sequelize.SELECT
    });
  
    return results;
}

async function getCandidate(candidateId) {
    const [results, metadata] = await sequelize.query('SELECT * FROM candidates WHERE id = :id', {
        replacements: { id: candidateId },
        plain: false,
        raw: true,
        type: sequelize.Sequelize.SELECT
    });
  
    return results;
}

async function createCandidate(request) {
    const [results, metadata] = await sequelize.query(
        `INSERT INTO candidates (slug, first_name, last_name, email, description, gender)
        VALUES ($slug, $first_name, $last_name, $email, $description, $gender)
        RETURNING *;`,
        {
            bind: {
                slug: request.body.slug ? request.body.slug : null,
                first_name: request.body.first_name ? request.body.first_name : null,
                last_name: request.body.last_name ? request.body.last_name : null,
                email: request.body.email ? request.body.email : null,
                description: request.body.description ? request.body.description : null,
                gender: request.body.gender ? request.body.gender : null
            }
        }, {
        plain: false,
        raw: true,
        type: sequelize.Sequelize.INSERT
    });
  
    return results;
}

async function updateCandidate(request, response) {
    const [results, metadata] = await sequelize.query(
        `UPDATE candidates
            SET slug = :slug,
                first_name = :first_name,
                last_name = :last_name,
                email = :email,
                description = :description,
                gender = :gender
            WHERE id = :id
            RETURNING *;`, {
        replacements: {
            id: response.locals.candidate[0].id,
            slug: request.body.slug ? request.body.slug : response.locals.candidate[0].slug,
            first_name: request.body.first_name ? request.body.first_name : response.locals.candidate[0].first_name,
            last_name: request.body.last_name ? request.body.last_name : response.locals.candidate[0].last_name,
            email: request.body.email ? request.body.email : response.locals.candidate[0].email,
            description: request.body.description ? request.body.description : response.locals.candidate[0].description,
            gender: request.body.gender ? request.body.gender : response.locals.candidate[0].gender
        },
        plain: false,
        raw: true,
        type: sequelize.Sequelize.UPDATE
    });

    return results;
}

async function deleteCandidate(request, response) {
    const candidateId = response.locals.candidate[0].id;

    const [results, metadata] = await sequelize.query('DELETE FROM candidates WHERE id = :id RETURNING *;', {
        replacements: { id: candidateId },
        plain: false,
        raw: true,
        type: sequelize.Sequelize.DELETE
    });

    return results;
}

module.exports = {
    getCandidates,
    getCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate
}