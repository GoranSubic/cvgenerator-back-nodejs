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

const usersCvs = {
    getUserCv,
    getUsersCvs,
    getUsersCvsByIdsRelated,
}

export default usersCvs;