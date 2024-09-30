import { Skill } from "../../generated/client";
import prisma from "../client";

async function getSkills() {
    const result: Skill[] | null = await prisma.skill.findMany({
        include: {
          candidates: true,
        },
    });
  
    return result;
}

async function getSkill(skillId: number) {
    const inputId: number = + skillId;

    const result: Skill | null = await prisma.skill.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function createSkill(request) {
    const title: string = request.body.title ?? null;

    const result = await prisma.skill.create({
        data: {
            title: title,
        }
    });

    return result;
}

async function updateSkill(request, response) {
    const skillId = response.locals.skill.id;
    const title: string = request.body.title ?? (response.locals.skill.title ?? null);

    const result = await prisma.skill.update({
        where: {
          id: + skillId,
        },
        data: {
            title: title,
        },
      })

    return result;
}

async function deleteSkill(request, response) {
    const skillId: number = + response.locals.skill.id;

    const results = await prisma.skill.delete({
        where: {
            id: skillId,
        },
      })

    return results;
}

const skillsQueries = {
    getSkills,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill
}

export default skillsQueries;