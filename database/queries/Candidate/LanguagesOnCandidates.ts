import { LanguagesOnCandidates } from "../../../generated/client";
import prisma from "../../client";

async function getLanguageOnCandidate(languageOnCandidateId: Number) {
    const inputId = + languageOnCandidateId;
    const result: LanguagesOnCandidates | null = await prisma.languagesOnCandidates.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function getLanguagesOnCandidates() {
    const result: LanguagesOnCandidates[] | null = await prisma.languagesOnCandidates.findMany({
        include: {
            language: true,
        },
    });

    return result;
}

async function deleteLanguagesOnCandidatesById(request, response) {
    const languageOnCandidateId: number = + response.locals.languageOnCandidate.id;

    const results = await prisma.languagesOnCandidates.delete({
        where: {
            id: + languageOnCandidateId,
        },
      })

    return results;
}

async function createLanguagesOnCandidatesRelated(request) {
    const languageId: number = + request.body.languageId;
    const candidateId: number = + request.body.candidateId;

    const proficiencyLevel: string = request.body.proficiencyLevel ?? '';
    const assignedBy: number = request.user ? request.user.id : 0;

    const result = await prisma.languagesOnCandidates.create({
        data: {
            proficiencyLevel: proficiencyLevel,
            assignedBy: assignedBy,
            candidate: {
                connect: {id: candidateId},
            },
            language: {
                connect: {id: languageId},
            }
        }
    });

    return result;
}

async function getLanguagesOnCandidatesByIdsRelated(candidateId: number, languageId?: number|null) {
    const inputCandidateId: number = + candidateId;
    const inputLanguageId: number | null = languageId ? (+ languageId) : null;

    const result = await prisma.languagesOnCandidates.findMany({
        where: {
            languageId: inputLanguageId ?? {},
            candidateId: inputCandidateId,
        },
        include: { 
            candidate: true,
            language: true,
        },
    });

    return result;
}

async function updateRelated(request, response) {
    const proficiencyLevel: string = request.body.proficiencyLevel ?? '';

    let languageOnCandidateIds: Number[] = [];

    if ((response.locals.languagesOnCandidate ?? undefined) !== undefined) {
        languageOnCandidateIds = response.locals.languagesOnCandidate.map((candidate: LanguagesOnCandidates) => {
            return candidate.id;
        });
    }

    const result = await prisma.languagesOnCandidates.updateMany({
        where: {
            id: {
                in: languageOnCandidateIds
            }
        },
        data: {
            proficiencyLevel: proficiencyLevel ?? undefined,
        }
    })

    return result;
}

async function deleteRelated(request, response) {
    const languageId: number | null = request.params.languageId ? (+ request.params.languageId) : null;
    const candidateId: number = + request.params.candidateId;

    const result = await prisma.languagesOnCandidates.deleteMany({
        where: {
            languageId: languageId ?? {},
            candidateId: candidateId,
        },
    });

    return result;
}

const languagesOnCandidates = {
    getLanguageOnCandidate,
    getLanguagesOnCandidates,
    getLanguagesOnCandidatesByIdsRelated,
    deleteLanguagesOnCandidatesById,
    createLanguagesOnCandidatesRelated,
    updateRelated,
    deleteRelated
}

export default languagesOnCandidates;