import { User } from "../../../generated/client";
import prisma from "../../client";
import bcrypt from "bcrypt";

async function loginUser(request) {
    const email = request.body.email ?? null;

    const user: User | null = await prisma.user.findUnique({
        where: {
        email: email,
        },
    });

    if (user == null) {
        const err = new Error('Cannot find user.');
        err.status = 404;
        throw err;
    }

    if (await bcrypt.compare(request.body.password, user.password)) {
        return user;
    } else {
        const err = new Error('Not allowed!');
        err.status = 401;
        throw err;
    }
}

const loginQueries = {
    loginUser
}

export default loginQueries;