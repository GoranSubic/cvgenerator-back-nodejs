import { Language } from "../../generated/client";
import prisma from "../client";
import { prismaSoftDelete } from "../prisma-client-extension/deleted-extension";

async function getLanguages() {
    const result: Language[] | null = await prisma.language.findMany({
        include: {
          candidates: true,
        },
    });
  
    return result;
}

async function getLanguage(languageId: number) {
    const inputId: number = + languageId;

    const result: Language | null = await prisma.language.findUnique({
        where: {
          id: inputId,
        },
    });

    return result;
}

async function createLanguage(request) {
    const title: string = request.body.title ?? null;

    const result = await prisma.language.create({
        data: {
            title: title,
        }
    });
  
    return result;
}

async function updateLanguage(request, response) {
    const languageId = response.locals.language.id;
    const title: string = request.body.title ?? (response.locals.language.title ?? null);

    const result = await prisma.language.update({
        where: {
          id: + languageId,
        },
        data: {
            title: title,
        },
      })

    return result;
}

async function deleteLanguage(request, response) {
    const languageId: number = + response.locals.language.id;

    const results = await prismaSoftDelete.language.delete({
        where: {
            id: languageId,
        },
      })

    return results;
}

const languagesQueries = {
    getLanguages,
    getLanguage,
    createLanguage,
    updateLanguage,
    deleteLanguage
}

export default languagesQueries;