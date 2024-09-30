import { User } from "../../generated/client";
import prisma from "../client";

async function getUsers() {
    const result: User[] | null = await prisma.user.findMany({
        include: {
        //   candidates: true,
        },
    });

    return result;
}

async function getUser(userId) {
    const inputId: number = + userId;

    const result: User | null = await prisma.user.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function createUser(request) {
    const enabled: Boolean = request.body.enabled ?? null;
    const slug: String = request.body.slug ?? null;
    const firstName: String = request.body.firstName ?? null;
    const lastName: String = request.body.lastName ?? null;
    const email: String = request.body.email ?? null;
    const emailVerifiedAt: Date = request.body.emailVerifiedAt ?? null;
    const password: String = request.body.password ?? null;
    const description: String = request.body.description ?? null;
    const image: URL = request.body.image ?? null;
    const rememberToken: String = request.body.rememberToken ?? null;

    const result = await prisma.user.create({
        data: {
            enabled: enabled,
            slug: slug,
            firstName: firstName,
            lastName: lastName,
            email: email,
            emailVerifiedAt: emailVerifiedAt,
            password: password,
            description: description,
            image: image,
            rememberToken: rememberToken,
        }
    });

    return result;
}

async function updateUser(request, response) {
    const userId = response.locals.user.id;
    
    const enabled = request.body.enabled ?? (response.locals.user.enabled ?? null);
    const slug = request.body.slug ?? (response.locals.user.slug ?? null);
    const firstName = request.body.first_name ?? (response.locals.user.firstName) ?? null;
    const lastName = request.body.last_name ?? (response.locals.user.lastName ?? null);
    const email = (((request.body.email ?? undefined) !== undefined) && (request.body.email !== "")) ? request.body.email :
        (
            (((response.locals.user.email ?? undefined) !== undefined) && (response.locals.user.email !== "")) ?
            response.locals.user.email :
            null
        );
    const emailVerifiedAt: Date = request.body.emailVerifiedAt ?? (response.locals.user.emailVerifiedAt ?? null);
    const password: string = request.body.password ?? (response.locals.user.password ?? null);
    const description = request.body.description ?? (response.locals.user.description ?? null);
    const image = request.body.image ?? (response.locals.user.image ?? null);
    const rememberToken = request.body.rememberToken ?? (response.locals.user.rememberToken ?? null);

    const result = await prisma.user.update({
        where: {
          id: + userId,
        },
        data: {
            enabled: enabled,
            slug: slug,
            firstName: firstName,
            lastName: lastName,
            email: email,
            emailVerifiedAt: emailVerifiedAt,
            password: password,
            description: description,
            image: image,
            rememberToken: rememberToken,
            updatedAt: new Date,
        },
      })

    return result;
}

async function deleteUser(request, response) {
    const userId = response.locals.user.id;
    
    const results = await prisma.user.delete({
        where: {
            id: + userId,
        },
      })

    return results;
}

const usersQueries = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

export default usersQueries;