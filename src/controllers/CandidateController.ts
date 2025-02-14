import express, { Request, Response } from "express";
import { validationResult } from 'express-validator';
import candidatesQueries from '../../database/queries/candidates';
import usersCandidates from '../../database/queries/Candidate/UsersCandidates';

const CandidateController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const resultElements = await candidatesQueries.getCandidatesAll();
            res.status(200).json({ candidates: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    get: async (req: Request, res: Response) => {
        try {
            const resultElements = await candidatesQueries.getCandidates();
            res.status(200).json({ candidates: resultElements });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    post: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const fields: { [key: string]: string|number|boolean|null } = {
                enabled: req.body.enabled ?? null,
                slug: req.body.slug ?? null,
                first_name: req.body.firstName ?? null,
                last_name: req.body.lastName ?? null,
                email: req.body.email ?? null,
                description: req.body.description ?? null,
                gender: req.body.gender ? (+ req.body.gender) : null,
                birth_day: req.body.birthDay ?? null,
                image: req.body.image ?? null,
                address: req.body.address ?? null,
                city: req.body.city ?? null,
                state: req.body.state ?? null,
                occupation: req.body.occupation ?? null,
                hobbies: req.body.hobbies ?? null,
            };

            const candidateCreated = await candidatesQueries.createCandidate(fields);

            let userCandidateRelated = null;
            if (req.user !== undefined) {
                userCandidateRelated = await usersCandidates.createdCandidates(req.user.id, candidateCreated[0].id);
            }

            res.status(201).json({ candidateCreated: candidateCreated[0], userCandidateRelated: userCandidateRelated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in insert new record: ' + error.message});
        }
    },

    getId: async (req: Request, res: Response) => {
        try {
            res.status(200).json({ candidate: res.locals.candidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row selection: ' + error.message});
        }
    },

    put: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const fields: { [key: string]: string|number|boolean|null } = {
                candidateId: res.locals.candidate.id,
                enabled: req.body.enabled ?? false,
                slug: req.body.slug ?? (res.locals.candidate.slug ?? null),
                firstName: req.body.firstName ?? (res.locals.candidate.firstName ?? null),
                lastName: req.body.lastName ?? (res.locals.candidate.lastName ?? null),
                email: (((req.body.email ?? undefined) !== undefined) && (req.body.email !== "")) ? req.body.email :
                    (
                        (((res.locals.candidate.email ?? undefined) !== undefined) && (res.locals.candidate.email !== "")) ?
                        res.locals.candidate.email :
                        null
                    ),
                description: req.body.description ?? (res.locals.candidate.description ?? null),
                gender: req.body.gender ?? (res.locals.candidate.gender ?? null),
                birthDay: req.body.birthDay ?? (res.locals.candidate.birthDay ?? null),
                image: req.body.image ?? (res.locals.candidate.image ?? null),
                address: req.body.address ?? (res.locals.candidate.address ?? null),
                city: req.body.city ?? (res.locals.candidate.city ?? null),
                state: req.body.state ?? (res.locals.candidate.state ?? null),
                occupation: req.body.occupation ?? (res.locals.candidate.occupation ?? null),
                hobbies: req.body.hobbies ?? (res.locals.candidate.hobbies ?? null)
            }

            const candidateUpdated = await candidatesQueries.updateCandidate(fields);

            let userCandidateRelated = null;
            if (req.user !== undefined) {
                // let resultArr = [];
                for (const key in req.body) {
                    if (!Object.prototype.hasOwnProperty.call(fields, key)) {
                        // resultArr.push(fields[key]);
                        delete req.body[key];
                    }
                }
                userCandidateRelated = await usersCandidates.updatedCandidates(req.user.id, candidateUpdated.id, 'UPDATE', req.body);
            }

            res.status(200).json({ candidateUpdated: candidateUpdated, userCandidateRelated: userCandidateRelated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row update: ' + error.message});
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const deletedCandidate = await candidatesQueries.deleteCandidate(req.user, res.locals.candidate.id);
            res.status(204).json({ deletedCandidate: deletedCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    }
}

export default CandidateController;