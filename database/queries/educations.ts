import { Education } from "../../generated/client";
// import prisma from "../client";
import prisma from "../prisma-client-extension/deleted-extension";

async function getEducations() {
    const result: Education[] | null = await prisma.education.findMany({
        include: {
          candidates: true,
        },
    });
  
    return result;
}

async function getEducation(educationId: number) {
    const inputId: number = + educationId;

    const result: Education | null = await prisma.education.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function createEducation(request) {
    const principalSubject: string = request.body.principal_subject ?? '';
    const school: string = request.body.school ?? '';
    const university: string = request.body.university ?? '';
    const title: string = request.body.title ?? '';
    const city: string = request.body.city ?? '';
    const state: string = request.body.state ?? '';

    const result = await prisma.education.create({
        data: {
            principalSubject: principalSubject,
            school: school,
            university: university,
            title: title,
            city: city,
            state: state,
        }
    });
  
    return result;
}

async function updateEducation(request, response) {
    const educationId = response.locals.education.id;
    
    const principalSubject: string = request.body.principalSubject ?? (response.locals.education.principalSubject ?? null);
    const school: string = request.body.school ?? (response.locals.education.school ?? null);
    const university: string = request.body.university ?? (response.locals.education.university ?? null);
    const title: string = request.body.title ?? (response.locals.education.title ?? null);
    const city: string = request.body.city ?? (response.locals.education.city ?? null);
    const state: string = request.body.state ?? (response.locals.education.state ?? null);

    const result = await prisma.education.update({
        where: {
          id: + educationId,
        },
        data: {
            principalSubject: principalSubject,
            school: school,
            university: university,
            title: title,
            city: city,
            state: state,
        },
      })

    return result;
}

async function deleteEducation(request, response) {
    const educationId: number = + response.locals.education.id;

    const results = await prisma.education.delete({
        where: {
            id: educationId,
        },
      })

    return results;
}

const educationsQueries = {
    getEducations,
    getEducation,
    createEducation,
    updateEducation,
    deleteEducation
}

export default educationsQueries;