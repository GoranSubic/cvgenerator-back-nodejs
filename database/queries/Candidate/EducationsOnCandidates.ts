import { EducationsOnCandidates } from "../../../generated/client";
import prisma from "../../client";

async function getEducationOnCandidate(educationOnCandidateId: Number) {
    const inputId = + educationOnCandidateId;
    const result: EducationsOnCandidates | null = await prisma.educationsOnCandidates.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function getEducationsOnCandidates() {
    const result: EducationsOnCandidates[] | null = await prisma.educationsOnCandidates.findMany({
        include: {
          education: true,
        },
    });

    return result;
}

async function deleteEducationsOnCandidatesById(request, response) {
    const educationOnCandidateId: number = + response.locals.educationOnCandidate.id;

    const results = await prisma.educationsOnCandidates.delete({
        where: {
            id: + educationOnCandidateId,
        },
      })

    return results;
}

async function createEducationsOnCandidatesRelated(request) {
    const educationId: number = + request.body.educationId;
    const candidateId: number = + request.body.candidateId;

    const educationLevel: string = request.body.educationLevel ?? '';
    const graduationDateFrom: Date | null = request.body.graduationDateFrom ?? null;
    const graduationDateUntil: Date | null = request.body.graduationDateUntil ?? null;
    const assignedBy: number = request.user ? request.user.id : 0;

    const result = await prisma.educationsOnCandidates.create({
        data: {
            educationLevel: educationLevel,
            graduationDateFrom: graduationDateFrom,
            graduationDateUntil: graduationDateUntil,
            assignedBy: assignedBy,
            candidate: {
                connect: {id: candidateId},
            },
            education: {
                connect: {id: educationId},
            }
        }
    });

    return result;
}

async function getEducationsOnCandidatesByIdsRelated(candidateId: number, educationId?: number|null) {
    const inputCandidateId: number = + candidateId;
    const inputEducationId: number | null = educationId ? (+ educationId) : null;

    const result = await prisma.educationsOnCandidates.findMany({
        where: {
            educationId: inputEducationId ?? {},
            candidateId: inputCandidateId,
        },
        include: { 
            candidate: true,
            education: true,
        },
    });

    return result;
}

async function updateRelated(request, response) {
    const educationLevel: string = request.body.educationLevel ?? null;
    const graduationDateFrom: string = request.body.graduationDateFrom ?? null;
    const graduationDateUntil: string = request.body.graduationDateUntil ?? null;

    let educationOnCandidateIds: Number[] = [];

    if ((response.locals.educationsOnCandidate ?? undefined) !== undefined) {
        educationOnCandidateIds = response.locals.educationsOnCandidate.map((candidate: EducationsOnCandidates) => {
            return candidate.id;
        });
    }

    const result = await prisma.educationsOnCandidates.updateMany({
        where: {
            id: {
                in: educationOnCandidateIds
            }
        },
        data: {
            educationLevel: educationLevel ?? undefined,
            graduationDateFrom: graduationDateFrom ?? undefined,
            graduationDateUntil: graduationDateUntil ?? undefined,
        }
    })

    return result;
}

async function deleteRelated(request, response) {
    const educationId: number | null = request.params.educationId ? (+ request.params.educationId) : null;
    const candidateId: number = + request.params.candidateId;

    const result = await prisma.educationsOnCandidates.deleteMany({
        where: {
            educationId: educationId ?? {},
            candidateId: candidateId,
        },
    });

    return result;
}

const educationsOnCandidates = {
    getEducationOnCandidate,
    getEducationsOnCandidates,
    getEducationsOnCandidatesByIdsRelated,
    deleteEducationsOnCandidatesById,
    createEducationsOnCandidatesRelated,
    updateRelated,
    deleteRelated
}

export default educationsOnCandidates;