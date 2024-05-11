const express = require('express');
const router = express.Router();

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

// Gets all candidates.
router.get("/", async (req, res) => {
    try {
        const resultElements = await getCandidates();
        res.status(200).json({ candidates: resultElements });
    } catch (error) {
        console.log('Error:' + error.message);
        res.sendStatus('Error in row selection:' + error.message);
    }
});

// Insert new candidate.
router.post("/", async (req, res) => {
    try {
        const candidateCreated = await createCandidate(req);
        res.status(200).json({ candidateCreated: candidateCreated });
    } catch (error) {
        console.log('Error:' + error.message);
        res.status(400).send('Error in insert new record:' + error.message);
    }
});

router
    .route("/:id")
    .get((req, res) => {
        res.status(200).json({ candidate: res.locals.candidate });
    })
    .put(async (req, res) => {
        try {
            const candidateUpdated = await updateCandidate(req, res);
            res.status(200).json({ candidateUpdated: candidateUpdated });
        } catch (error) {
            console.log('Error:' + error.message);
            res.status(400).send('Error in row update:' + error.message);
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedCandidate = await deleteCandidate(req, res);
            res.status(200).json({ deletedCandidate: deletedCandidate });
        } catch (error) {
            console.log('Error:' + error.message);
            res.status(400).send('Error in row deletion:' + error.message);
        }
    });

// Middleware.
router.param("id", async (req, res, next, id) => {
    console.log('id is: ', id);
    try {
        const resultCandidate = await getCandidate(id);
        if (resultCandidate.length === 0) {
            res.status(400).send({msg: `There is no candidate with id ${id}`}).end();
        } else {
            res.locals.candidate = resultCandidate;

            next(); // execute next action - get/put/delete
        }
    } catch (error) {
        console.log('Error, resultCandidateId: ' + error.message);
        res.sendStatus(500).end();
    }
});

module.exports = router;