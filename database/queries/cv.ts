import { Cv } from "../../generated/client";
import prisma from "../client";
import { prismaSoftDelete } from "../prisma-client-extension/deleted-extension";

async function getCvs() {
    const result: Cv[] | null = await prisma.cv.findMany({
        include: {
          candidate: true,
        },
    });
  
    return result;
}

async function getCv(cvId: number) {
    const inputId: number = + cvId;

    const result: Cv | null = await prisma.cv.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function getCvsByCandidate(candidateId: number) {
    const inputId: number = + candidateId;

    const results: Cv[] | null = await prisma.cv.findMany({
        where: {
            candidateId: inputId,
        },
    });

    return results;
}

async function createCv(request: any) {
    const title: string = request.body.title ?? null;
    const description: string = request.body.description ?? null;
    const candidateId: number = request.body.candidateId ?? null;

    const data: any = await prisma.candidate.findFirst({
        where: {
            id: candidateId,
        },
        select: {
            courses: {
                select: {
                    course: true
                }
            },
            educations: {
                select: {
                    education: true
                }
            },
            jobs: {
                select: {
                    job: true
                }
            },
            languages: {
                select: {
                    language: true
                }
            },
            skills: {
                select: {
                    skill: true
                }
            },
            workExperiences: true
        },
    });

    const result = await prisma.cv.create({
        data: {
            title: title,
            description: description,
            data: data,
            candidateId: candidateId,
        }
    });
  
    return result;
}

async function updateCv(request, response) {
    const cvId = response.locals.cv.id;

    const title: string = request.body.title ?? (response.locals.cv.title ?? null);
    const description: string = request.body.description ?? (response.locals.cv.description ?? null);
    const data: string = request.body.data ?? (response.locals.cv.data ?? null);
    const candidateId: number = request.body.candidateId ?? (response.locals.cv.candidateId ?? null);

    const result = await prisma.cv.update({
        where: {
          id: + cvId,
        },
        data: {
            title: title,
            description: description,
            data: data,
            candidateId: candidateId,
        },
      })

    return result;
}

async function deleteCv(request, response) {
    const cvId: number = + response.locals.cv.id;

    const results = await prismaSoftDelete.cv.delete({
        where: {
            id: cvId,
        },
      })

    return results;
}

const cvsQueries = {
    getCvs,
    getCv,
    getCvsByCandidate,
    createCv,
    updateCv,
    deleteCv
}

export default cvsQueries;