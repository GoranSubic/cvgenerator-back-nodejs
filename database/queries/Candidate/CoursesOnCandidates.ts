import { CoursesOnCandidates } from "../../../generated/client";
import prisma from "../../client";

async function getCourseOnCandidate(courseOnCandidateId: Number) {
    const inputId = + courseOnCandidateId;
    const result: CoursesOnCandidates | null = await prisma.coursesOnCandidates.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function getCoursesOnCandidates() {
    const result: CoursesOnCandidates[] | null = await prisma.coursesOnCandidates.findMany({
        include: {
          course: true,
        },
    });

    return result;
}

async function deleteCoursesOnCandidatesById(request, response) {
    const courseOnCandidateId: number = + response.locals.courseOnCandidate.id;

    const results = await prisma.coursesOnCandidates.delete({
        where: {
            id: + courseOnCandidateId,
        },
      })

    return results;
}

async function createCoursesOnCandidatesRelated(request) {
    const courseId: number = + request.body.courseId;
    const candidateId: number = + request.body.candidateId;

    const courseDate: Date | null = request.body.courseDate ?? null;
    const organization: string = request.body.organization ?? '';
    const assignedBy: number = request.user ? request.user.id : 0;

    const result = await prisma.coursesOnCandidates.create({
        data: {
            courseDate: courseDate,
            organization: organization,
            assignedBy: assignedBy,
            candidate: {
                connect: {id: candidateId},
            },
            course: {
                connect: {id: courseId},
            }
        }
    });

    return result;
}

async function getCoursesOnCandidatesByIdsRelated(candidateId: number, courseId?: number|null) {
    const inputCandidateId: number = + candidateId;
    const inputCourseId: number | null = courseId ? (+ courseId) : null;

    const result = await prisma.coursesOnCandidates.findMany({
        where: {
            courseId: inputCourseId ?? {},
            candidateId: inputCandidateId,
        },
        include: { 
            candidate: true,
            course: true,
        },
    });

    return result;
}

async function updateRelated(request, response) {
    const courseDate: Date | null = request.body.courseDate ?? null;
    const organization: string = request.body.organization ?? '';

    let courseOnCandidateIds: Number[] = [];

    if ((response.locals.coursesOnCandidate ?? undefined) !== undefined) {
        courseOnCandidateIds = response.locals.coursesOnCandidate.map((candidate: CoursesOnCandidates) => {
            return candidate.id;
        });
    }

    const result = await prisma.coursesOnCandidates.updateMany({
        where: {
            id: {
                in: courseOnCandidateIds
            }
        },
        data: {
            courseDate: courseDate ?? undefined,
            organization: organization ?? undefined,
        }
    })

    return result;
}

async function deleteRelated(request, response) {
    const courseId: number | null = request.params.courseId ? (+ request.params.courseId) : null;
    const candidateId: number = + request.params.candidateId;

    const result = await prisma.coursesOnCandidates.deleteMany({
        where: {
            courseId: courseId ?? {},
            candidateId: candidateId,
        },
    });

    return result;
}

const coursesOnCandidates = {
    getCourseOnCandidate,
    getCoursesOnCandidates,
    getCoursesOnCandidatesByIdsRelated,
    deleteCoursesOnCandidatesById,
    createCoursesOnCandidatesRelated,
    updateRelated,
    deleteRelated
}

export default coursesOnCandidates;