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
            const candidateCreated = await candidatesQueries.createCandidate(req);

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
            const candidateUpdated = await candidatesQueries.updateCandidate(req, res);

            let userCandidateRelated = null;
            if (req.user !== undefined) {
                userCandidateRelated = await usersCandidates.updatedCandidates(req.user.id, candidateUpdated.id, req.body, 'UPDATE');
            }

            res.status(200).json({ candidateUpdated: candidateUpdated, userCandidateRelated: userCandidateRelated });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row update: ' + error.message});
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const deletedCandidate = await candidatesQueries.deleteCandidate(req, res);
            res.status(204).json({ deletedCandidate: deletedCandidate });
        } catch (error) {
            console.log('Error: ' + error.message);
            res.status(500).json({error: 'Internal Server Error', details: 'Error in row deletion: ' + error.message});
        }
    }
}

export default CandidateController;