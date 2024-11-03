import { SkillsOnCandidates } from "../../../generated/client";
import prisma from "../../client";

async function getSkillOnCandidate(skillOnCandidateId: number) {
    const inputId = + skillOnCandidateId;
    const result: SkillsOnCandidates | null = await prisma.skillsOnCandidates.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function getSkillsOnCandidates() {
    const result: SkillsOnCandidates[] | null = await prisma.skillsOnCandidates.findMany({
        include: {
            skill: true,
        },
    });

    return result;
}

async function deleteSkillsOnCandidatesById(request, response) {
    const skillOnCandidateId: number = + response.locals.skillOnCandidate.id;

    const results = await prisma.skillsOnCandidates.delete({
        where: {
            id: + skillOnCandidateId,
        },
      })

    return results;
}

async function createSkillsOnCandidatesRelated(request) {
    const skillId: number = + request.body.skillId;
    const candidateId: number = + request.body.candidateId;

    const assignedBy: number = request.user ? request.user.id : 0;

    const result = await prisma.skillsOnCandidates.create({
        data: {
            assignedBy: assignedBy,
            candidate: {
                connect: {id: candidateId},
            },
            skill: {
                connect: {id: skillId},
            }
        }
    });

    return result;
}

async function getSkillsOnCandidatesByIdsRelated(candidateId: number, skillId?: number|null) {
    const inputCandidateId: number = + candidateId;
    const inputSkillId: number | null = skillId ? (+ skillId) : null;

    const result = await prisma.skillsOnCandidates.findMany({
        where: {
            skillId: inputSkillId ?? {},
            candidateId: inputCandidateId,
        },
        include: { 
            candidate: true,
            skill: true,
        },
    });

    return result;
}

// async function updateRelated(request, response) {
//     const assignedBy: number = request.user ? request.user.id : 0;

//     let skillOnCandidateIds: number[] = [];

//     if ((response.locals.skillsOnCandidate ?? undefined) !== undefined) {
//         skillOnCandidateIds = response.locals.skillsOnCandidate.map((candidate: SkillsOnCandidates) => {
//             return candidate.id;
//         });
//     }

//     const result = await prisma.skillsOnCandidates.updateMany({
//         where: {
//             id: {
//                 in: skillOnCandidateIds
//             }
//         },
//         data: {
//             assignedBy: assignedBy ?? undefined,
//         }
//     })

//     return result;
// }

async function deleteRelated(request, response) {
    const skillId: number | null = request.params.skillId ? (+ request.params.skillId) : null;
    const candidateId: number = + request.params.candidateId;

    const result = await prisma.skillsOnCandidates.deleteMany({
        where: {
            skillId: skillId ?? {},
            candidateId: candidateId,
        },
    });

    return result;
}

const skillsOnCandidates = {
    getSkillOnCandidate,
    getSkillsOnCandidates,
    getSkillsOnCandidatesByIdsRelated,
    deleteSkillsOnCandidatesById,
    createSkillsOnCandidatesRelated,
    // updateRelated,
    deleteRelated
}

export default skillsOnCandidates;