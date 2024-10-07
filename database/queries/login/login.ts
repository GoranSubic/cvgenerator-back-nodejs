import prisma from "../../client";
import bcrypt from "bcrypt";

async function findUserByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email
        },
    });
}

// // On /register route
// async function createUserByEmailAndPassword(user) {
//     user.password = bcrypt.hashSync(user.password, 12);
//     return prisma.user.create({
//         data: user,
//     });
// }

async function findUserById(id: number) {
    return prisma.user.findUnique({
        where: {
            id
        },
    });
}

const loginQueries = {
    findUserByEmail,
    // createUserByEmailAndPassword,
    findUserById
}

export default loginQueries;