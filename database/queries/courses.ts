import { Course } from "../../generated/client";
import { prisma } from "../prisma-client-extension/deleted-extension";

async function getCourses() {
    const result: Course[] | null = await prisma.course.findMany({
        include: {
          candidates: true,
        },
    });
  
    return result;
}

async function getCourse(courseId: number) {
    const inputId: number = + courseId;

    const result: Course | null = await prisma.course.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function createCourse(request) {
    const title: string = request.body.title ?? null;

    const result = await prisma.course.create({
        data: {
            title: title,
        }
    });
  
    return result;
}

async function updateCourse(request, response) {
    const courseId = response.locals.course.id;
    const title: string = request.body.title ?? (response.locals.course.title ?? null);

    const result = await prisma.course.update({
        where: {
          id: + courseId,
        },
        data: {
            title: title,
        },
      })

    return result;
}

async function deleteCourse(request, response) {
    const courseId: number = + response.locals.course.id;

    const results = await prisma.course.delete({
        where: {
            id: courseId,
        },
      })

    return results;
}

const coursesQueries = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}

export default coursesQueries;