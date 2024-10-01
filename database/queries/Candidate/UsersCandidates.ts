import { UsersCandidates } from "../../../generated/client";
import prisma from "../../client";

async function getUserCandidate(userCandidateId: Number) {
    const inputId = + userCandidateId;
    const result: UsersCandidates | null = await prisma.usersCandidates.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function getUsersCandidates() {
    const result: UsersCandidates[] | null = await prisma.usersCandidates.findMany({
        include: {
          user: true,
        },
    });

    return result;
}

async function getUsersCandidatesByIdsRelated(candidateId: number, userId?: number|null) {
    const inputCandidateId: number = + candidateId;
    const inputUserId: number | null = userId ? (+ userId) : null;

    const result = await prisma.usersCandidates.findMany({
        where: {
            userId: inputUserId ?? {},
            candidateId: inputCandidateId,
        },
        include: { 
            candidate: true,
            user: true,
        },
    });

    return result;
}

const usersCandidates = {
    getUserCandidate,
    getUsersCandidates,
    getUsersCandidatesByIdsRelated,
}

export default usersCandidates;