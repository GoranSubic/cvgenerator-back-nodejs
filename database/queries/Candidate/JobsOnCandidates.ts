import prisma from "../../client";

async function getCandidatesJobs(candidateId, jobId?) {
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

async function updateJob(request, response) {
    console.log('request.params.jobId isss: ', request.params);

    const jobId: number | null = request.params.jobId ? (+ request.params.jobId) : null;
    const candidateId: number | null = request.params.candidateId ? (+ request.params.candidateId) : null;

    // const jobIdUpd: number | null = request.body.jobId ? (+ request.body.jobId) : null;
    // const candidateIdUpd: number | null = request.body.candidateId ? (+ request.body.candidateId) : null;
    const assignedByStr: string | null = request.body.assignedBy ?? null;
    console.log('assignedByStr is: ', request.body.assignedBy);

    const result = await prisma.jobsOnCandidates.update({
        select: {
            jobId: true,
            candidateId: true,
        },
        where: {
            jobId: jobId,
            candidateId: candidateId,
        },
        data: {
            assignedBy: assignedByStr
        }
    })

    return result;
}

async function deleteJob(request, response) {
    const jobId: number | null = request.params.jobId ? (+ request.params.jobId) : null;
    const candidateId: number | null = request.params.candidateId ? (+ request.params.candidateId) : null;

    const result = await prisma.jobsOnCandidates.deleteMany({
        where: {
            jobId: jobId,
            candidateId: candidateId,
        },
      });

    return result;
}

const jobsOnCandidates = {
    getCandidatesJobs,
    createJobsOnCandidates,
    updateJob,
    deleteJob
}

export default jobsOnCandidates;