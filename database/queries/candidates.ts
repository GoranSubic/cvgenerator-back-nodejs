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

async function updateCandidate(fields: (string|number|boolean|null)[]) {
    const resultCandidate = await prisma.candidate.update({
        where: {
          id: + fields.candidateId,
        },
        data: {
            enabled: fields.enabled,
            slug: fields.slug,
            firstName: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            description: fields.description,
            gender: fields.gender,
            birthDay: fields.birthDay,
            image: fields.image,
            address: fields.address,
            city: fields.city,
            state: fields.state,
            occupation: fields.occupation,
            hobbies: fields.hobbies,
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