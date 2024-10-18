import { WorkExperience } from "../../generated/client";
// import prisma from "../client";
import prisma from "../prisma-client-extension/deleted-extension";

async function getWorkExperiences() {
    const result: WorkExperience[] | null = await prisma.workExperience.findMany({
        include: {
          candidate: true,
        },
    });
  
    return result;
}

async function getWorkExperience(workExperienceId: number) {
    const inputId: number = + workExperienceId;

    const result: WorkExperience | null = await prisma.workExperience.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function getWorkExperiencesByCandidate(candidateId: number) {
    const inputId: number = + candidateId;

    const results: WorkExperience[] | null = await prisma.workExperience.findMany({
        where: {
            candidateId: inputId,
        },
    });

    return results;
}

async function createWorkExperience(request) {
    const employer: string = request.body.employer ?? null;
    const from: Date = request.body.from ?? null;
    const until: Date = request.body.until ?? null;
    const position: string = request.body.position ?? null;
    const responsibilities: string = request.body.responsibilities ?? null;
    const business: string = request.body.business ?? null;
    const candidateId: number = request.body.candidateId ?? null;

    const result = await prisma.workExperience.create({
        data: {
            employer: employer,
            from: from,
            until: until,
            position: position,
            responsibilities: responsibilities,
            business: business,
            candidateId: candidateId,
        }
    });
  
    return result;
}

async function updateWorkExperience(request, response) {
    const workExperienceId = response.locals.workExperience.id;

    const employer: string = request.body.employer ?? (response.locals.workExperience.employer ?? null);
    const from: Date = request.body.from ?? (response.locals.workExperience.from ?? null);
    const until: Date = request.body.until ?? (response.locals.workExperience.until ?? null);
    const position: string = request.body.position ?? (response.locals.workExperience.position ?? null);
    const responsibilities: string = request.body.responsibilities ?? (response.locals.workExperience.responsibilities ?? null);
    const business: string = request.body.business ?? (response.locals.workExperience.business ?? null);
    const candidateId: number = request.body.candidateId ?? null;

    const result = await prisma.workExperience.update({
        where: {
          id: + workExperienceId,
        },
        data: {
            employer: employer,
            from: from,
            until: until,
            position: position,
            responsibilities: responsibilities,
            business: business,
            candidateId: candidateId,
        },
      })

    return result;
}

async function deleteWorkExperience(request, response) {
    const workExperienceId: number = + response.locals.workExperience.id;

    const results = await prisma.workExperience.delete({
        where: {
            id: workExperienceId,
        },
      })

    return results;
}

const workExperiencesQueries = {
    getWorkExperiences,
    getWorkExperience,
    getWorkExperiencesByCandidate,
    createWorkExperience,
    updateWorkExperience,
    deleteWorkExperience
}

export default workExperiencesQueries;