import { JobsOnCandidates } from "../../../generated/client";
import prisma from "../../client";

async function getCJ(cjId: Number) {
    const inputId = + cjId;
    const result: JobsOnCandidates | null = await prisma.jobsOnCandidates.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function getCandidatesJobs() {
    const result: JobsOnCandidates[] | null = await prisma.jobsOnCandidates.findMany({
        include: {
          job: true,
        },
    });

    return result;
}

async function getCandidatesJobById(candidateId, jobId?) {
    const inputCandidateId: number | null = candidateId ? (+ candidateId) : null;
    const inputJobId: number | null = jobId ? (+ jobId) : null;

    const result = await prisma.jobsOnCandidates.findMany({
        where: {
          jobId: inputJobId ?? {},
          candidateId: inputCandidateId,
        },
        include: { 
            candidate: true,
            job: true,
        },
        // select: {
        //     candidate: {
        //         select: {
        //             id: true,
        //             firstName: true,
        //             email: true,
        //         },
        //     },
        //     job: {
        //         select: {
        //             id: true,
        //             title: true,
        //             enabled: true,
        //         },
        //     },
        //   },
    });

    return result;
}

async function deleteById(request, response) {
    const jobOnCandidateId: Number | null = response.locals.jobOnCandidate ? (+ response.locals.jobOnCandidate.id) : null;

    const results = await prisma.jobsOnCandidates.delete({
        where: {
            id: + jobOnCandidateId,
        },
      })

    return results;
}

async function createJobsOnCandidates(request) {
    const jobId: number | null = request.body.jobId ? (+ request.body.jobId) : null;
    const candidateId: number | null = request.body.candidateId ? (+ request.body.candidateId) : null;

    const result = await prisma.jobsOnCandidates.create({
        data: {
            assignedBy: "API",
            candidate: {
                connect: {id: candidateId},
            },
            job: {
                connect: {id: jobId},
            }
        }
    });

    return result;
}

async function updateRelated(request, response) {
    const assignedByStr: string | null = request.body.assignedBy ?? null;
    let jobOnCandidateIds: Number[] | null = null;

    if ((response.locals.jobsOnCandidate ?? undefined) !== undefined) {
        jobOnCandidateIds = response.locals.jobsOnCandidate.map((candidate: JobsOnCandidates) => {
            return candidate.id;
        });
    }

    const result = await prisma.jobsOnCandidates.updateMany({
        where: {
            id: {
                in: jobOnCandidateIds
            }
        },
        data: {
            assignedBy: assignedByStr
        }
    })

    return result;
}

async function deleteRelated(request, response) {
    const jobId: number | null = request.params.jobId ? (+ request.params.jobId) : null;
    const candidateId: number | null = request.params.candidateId ? (+ request.params.candidateId) : null;

    const result = await prisma.jobsOnCandidates.deleteMany({
        where: {
            jobId: jobId ?? {},
            candidateId: candidateId,
        },
    });

    return result;
}

const jobsOnCandidates = {
    getCJ,
    getCandidatesJobs,
    getCandidatesJobById,
    deleteById,
    createJobsOnCandidates,
    updateRelated,
    deleteRelated
}

export default jobsOnCandidates;