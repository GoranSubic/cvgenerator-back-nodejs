import prisma from "../../client";
import bcrypt from "bcrypt";

async function findUserByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email
        },
    });
}

async function createUserByEmailAndPassword(user) {
    user.password = bcrypt.hashSync(user.password, 12);
    user.slug = user.firstName + ' - ' + user.lastName + ' - ' + Math.floor(Math.random() * 10);
    return prisma.user.create({
        data: user,
    });
}

async function findUserById(id: number) {
    return prisma.user.findUnique({
        where: {
            id
        },
    });
}

const authQueries = {
    findUserByEmail,
    createUserByEmailAndPassword,
    findUserById
}

export default authQueries;