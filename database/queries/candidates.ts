import { Request, Response } from "express";
import { Candidate } from "../../generated/client";
import prismaAll from "../client";
import prisma from "../prisma-client-extension/deleted-extension";
import usersCandidates from "./Candidate/UsersCandidates";
import { User } from "../../generated/client";

async function getCandidatesAll() {
    const results: Candidate[] | null = await prismaAll.candidate.findMany({
        select: {
            id: true,
            enabled: true,
            slug: true,
            firstName: true,
            lastName: true,
            gender: true,
            deletedAt: true,
            cvs: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    // data: true,
                }
            },
        },
    });

    return results;
}

async function getCandidates() {
    const results = await prisma.$queryRaw`SELECT id, enabled, first_name, last_name, email, deleted_at FROM candidates WHERE enabled = true and deleted_at IS null`;
  
    return results;
}

async function getCandidate(candidateId: number|string) {
    const inputId: number = + candidateId;

    const result: Candidate | null = await prisma.candidate.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function createCandidate(fields: (string|number|boolean|null)[]) {
    const valuesArr: (string | number | boolean | null)[] = [];

    let i = 1;
    let fieldsPrepStat: (string)[] = [];
    for (let key in fields) {
        if (fields.hasOwnProperty(key) && (fields[key] ?? undefined) === undefined) {
            delete fields[key];
        } else {
            valuesArr.push(fields[key]);
            fieldsPrepStat.push('$' + i++);
        }
    }
    const fieldsKeys = Object.keys(fields).join(', ');

    const result = await prisma.$queryRawUnsafe(
        `INSERT INTO candidates (${fieldsKeys})
        VALUES (${fieldsPrepStat.join(',')})
        RETURNING *;`,
        ...valuesArr
    );

    return result;
}

async function updateCandidate(request: Request, response: Response) {
    const candidateId = response.locals.candidate.id;
    
    const enabled = request.body.enabled ?? false;
    const slug = request.body.slug ?? (response.locals.candidate.slug ?? null);
    const firstName = request.body.firstName ?? (response.locals.candidate.firstName ?? null);
    const lastName = request.body.lastName ?? (response.locals.candidate.lastName ?? null);
    const email = (((request.body.email ?? undefined) !== undefined) && (request.body.email !== "")) ? request.body.email :
        (
            (((response.locals.candidate.email ?? undefined) !== undefined) && (response.locals.candidate.email !== "")) ?
            response.locals.candidate.email :
            null
        );
    const description = request.body.description ?? (response.locals.candidate.description ?? null);
    const gender = request.body.gender ?? (response.locals.candidate.gender ?? null);
    const birthDay = request.body.birthDay ?? (response.locals.candidate.birthDay ?? null);
    const image = request.body.image ?? (response.locals.candidate.image ?? null);
    const address = request.body.address ?? (response.locals.candidate.address ?? null);
    const city = request.body.city ?? (response.locals.candidate.city ?? null);
    const state = request.body.state ?? (response.locals.candidate.state ?? null);
    const occupation = request.body.occupation ?? (response.locals.candidate.occupation ?? null);
    const hobbies = request.body.hobbies ?? (response.locals.candidate.hobbies ?? null);

    const resultCandidate = await prisma.candidate.update({
        where: {
          id: + candidateId,
        },
        data: {
            enabled: enabled,
            slug: slug,
            firstName: firstName,
            lastName: lastName,
            email: email,
            description: description,
            gender: gender,
            birthDay: birthDay,
            image: image,
            address: address,
            city: city,
            state: state,
            occupation: occupation,
            hobbies: hobbies,
        },
    });

    return resultCandidate;
}

async function deleteCandidate(requestUser: User, resCandidateId: number) {
    const user = requestUser;
    const candidateId = resCandidateId;

    if ((user ?? undefined) === undefined) {
        let err = new Error;
        err.message = 'Problem with user in request.';
        throw err;
    }
    
    const resultDeleted = await prisma.candidate.delete({
        where: {
            id: + candidateId,
        },
    });

    const userCandidateRelated = await usersCandidates.updatedCandidates(user.id, resultDeleted.id, 'deleted');
    resultDeleted.userCandidateRelated = userCandidateRelated;

    return resultDeleted;
}

const candidatesQueries = {
    getCandidatesAll,
    getCandidates,
    getCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate
}

export default candidatesQueries;