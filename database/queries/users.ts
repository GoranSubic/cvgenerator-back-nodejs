import { User } from "../../generated/client";
import prisma from "../client";
import { prismaSoftDelete } from "../prisma-client-extension/deleted-extension";
import bcrypt from "bcrypt";

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
    const enabled: boolean = request.body.enabled ?? null;
    const slug: string = request.body.slug ?? null;
    const firstName: string = request.body.firstName ?? null;
    const lastName: string = request.body.lastName ?? null;
    const email: string = request.body.email ?? null;
    const emailVerifiedAt: Date = request.body.emailVerifiedAt ?? null;
    const password: string = request.body.password ?? null;
    const description: string = request.body.description ?? null;
    const image: string = request.body.image ?? null;
    const rememberToken: string = request.body.rememberToken ?? null;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await prisma.user.create({
        data: {
            enabled: enabled,
            slug: slug,
            firstName: firstName,
            lastName: lastName,
            email: email,
            emailVerifiedAt: emailVerifiedAt,
            password: hashedPassword,
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
    const firstName = request.body.firstName ?? (response.locals.user.firstName) ?? null;
    const lastName = request.body.lastName ?? (response.locals.user.lastName ?? null);
    const email = (((request.body.email ?? undefined) !== undefined) && (request.body.email !== "")) ? request.body.email :
        (
            (((response.locals.user.email ?? undefined) !== undefined) && (response.locals.user.email !== "")) ?
            response.locals.user.email :
            null
        );
    const emailVerifiedAt: Date = request.body.emailVerifiedAt ?? (response.locals.user.emailVerifiedAt ?? null);
    const password: string = request.body.password;
    const description = request.body.description ?? (response.locals.user.description ?? null);
    const image = request.body.image ?? (response.locals.user.image ?? null);
    const rememberToken = request.body.rememberToken ?? (response.locals.user.rememberToken ?? null);

    const salt = await bcrypt.genSalt();
    const hashedPassword: string = password ?
        await bcrypt.hash(password, salt) :
        (response.locals.user.password ?? null);

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
            password: hashedPassword,
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
    
    const results = await prismaSoftDelete.user.delete({
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