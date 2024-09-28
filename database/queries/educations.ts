import { Education } from "../../generated/client";
import prisma from "../client";

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
    const principalSubject: string | null = request.body.principal_subject ?? null;
    const school: string | null = request.body.school ?? null;
    const university: string | null = request.body.university ?? null;
    const title: string | null = request.body.title ?? null;
    const city: string | null = request.body.city ?? null;
    const state: string | null = request.body.state ?? null;

    const result = await prisma.education.create({
        data: {
            principalSubject: principalSubject ?? {},
            school: school ?? {},
            university: university ?? {},
            title: title ?? {},
            city: city ?? {},
            state: state ?? {},
        }
    });
  
    return result;
}

async function updateEducation(request, response) {
    const educationId = response.locals.education.id;
    
    const principalSubject = request.body.principalSubject ?? (response.locals.education.principalSubject ?? null);
    const school = request.body.school ?? (response.locals.education.school ?? null);
    const university = request.body.university ?? (response.locals.education.university ?? null);
    const title = request.body.title ?? (response.locals.education.title ?? null);
    const city = request.body.city ?? (response.locals.education.city ?? null);
    const state = request.body.state ?? (response.locals.education.state ?? null);

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