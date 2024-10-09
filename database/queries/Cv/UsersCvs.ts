import { UsersCvs } from "../../../generated/client";
import prisma from "../../client";

async function getUserCv(userCvId: Number) {
    const inputId = + userCvId;
    const result: UsersCvs | null = await prisma.usersCvs.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function getUsersCvs() {
    const result: UsersCvs[] | null = await prisma.usersCvs.findMany({
        include: {
          user: true,
        },
    });

    return result;
}

async function getUsersCvsByIdsRelated(cvId: number, userId?: number|null) {
    const inputCvId: number = + cvId;
    const inputUserId: number | null = userId ? (+ userId) : null;

    const result = await prisma.usersCvs.findMany({
        where: {
            userId: inputUserId ?? {},
            cvId: inputCvId,
        },
        include: { 
            cv: true,
            user: true,
        },
    });

    return result;
}

async function createdCvs(payloadUserId: number, resultCvId: number) {
    const userId: number = + payloadUserId;
    const cvId: number = + resultCvId;

    const result = await prisma.usersCvs.create({
        data: {
            action: 'CREATE',
            cv: {
                connect: {id: cvId},
            },
            user: {
                connect: {id: userId},
            }
        }
    });

    return result;
}

async function updatedCvs(payloadUserId: number, resultCvId: number, updatedFields: JsonObject, resultAction: string | undefined) {
    const userId: number = + payloadUserId;
    const cvId: number = + resultCvId;

    const result = await prisma.usersCvs.create({
        data: {
            action: (resultAction != undefined && resultAction == 'deleted') ? 'DELETE' : 'UPDATE',
            updatedFields: updatedFields,
            cv: {
                connect: {id: cvId},
            },
            user: {
                connect: {id: userId},
            }
        }
    });

    return result;
}

const usersCvs = {
    getUserCv,
    getUsersCvs,
    getUsersCvsByIdsRelated,
    createdCvs,
    updatedCvs,
}

export default usersCvs;