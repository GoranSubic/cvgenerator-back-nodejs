import { JobsOnCandidates } from "../../../generated/client";
import prisma from "../../client";

async function getCJ(cjId: number) {
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
    const jobOnCandidateId: number = + response.locals.jobOnCandidate.id;

    const results = await prisma.jobsOnCandidates.delete({
        where: {
            id: + jobOnCandidateId,
        },
      })

    return results;
}

async function createJobsOnCandidates(request) {
    const jobId: number = + request.body.jobId;
    const candidateId: number = + request.body.candidateId;
    const assignedBy: number = request.user ? request.user.id : 0;

    const result = await prisma.jobsOnCandidates.create({
        data: {
            assignedBy: assignedBy,
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

// async function updateRelated(request, response) {
//     const assignedBy: number = request.user ? request.user.id : 0;
//     let jobOnCandidateIds: number[] | null = null;

//     if ((response.locals.jobsOnCandidate ?? undefined) !== undefined) {
//         jobOnCandidateIds = response.locals.jobsOnCandidate.map((candidate: JobsOnCandidates) => {
//             return candidate.id;
//         });
//     }

//     const result = await prisma.jobsOnCandidates.updateMany({
//         where: {
//             id: {
//                 in: jobOnCandidateIds
//             }
//         },
//         data: {
//             assignedBy: assignedBy ?? undefined
//         }
//     })

//     return result;
// }

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
    // updateRelated,
    deleteRelated
}

export default jobsOnCandidates;