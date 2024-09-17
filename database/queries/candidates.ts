import { Candidate } from "../../generated/client";
import prisma from "../client";

async function getCandidates() {
    const results = await prisma.$queryRaw`SELECT id, enabled, first_name, last_name, email FROM candidates WHERE enabled = true`;
  
    return results;
}

async function getCandidate(candidateId) {
    const inputId: number = + candidateId;

    const result: Candidate | null = await prisma.candidate.findUnique({
        where: {
          id: inputId,
        },
    });
  
    return result;
}

async function createCandidate(request) {
    const enabled = request.body.enabled ? request.body.enabled : null;
    const slug = request.body.slug ? request.body.slug : null;
    const first_name = request.body.first_name ? request.body.first_name : null;
    const last_name = request.body.last_name ? request.body.last_name : null;
    const email = request.body.email ? request.body.email : null;
    const description = request.body.description ? request.body.description : null;
    const gender = request.body.gender ? request.body.gender : null;
    const birth_day = request.body.birth_day ? request.body.birth_day : null;
    const image = request.body.image ? request.body.image : null;
    const address = request.body.address ? request.body.address : null;
    const city = request.body.city ? request.body.city : null;
    const state = request.body.state ? request.body.state : null;
    const occupation = request.body.occupation ? request.body.occupation : null;
    const hobbies = request.body.hobbies ? request.body.hobbies : null;
    const remember_token = request.body.remember_token ? request.body.remember_token : null;


    const result = await prisma.$queryRaw`
            INSERT INTO candidates (enabled, slug, first_name, last_name, email, description, gender, birth_day,
                    image, address, city, state, occupation, hobbies, remember_token)
            VALUES (${enabled}, ${slug}, ${first_name}, ${last_name}, ${email}, ${description}, ${gender}, ${birth_day},
                    ${image}, ${address}, ${city}, ${state}, ${occupation}, ${hobbies}, ${remember_token})
            RETURNING *;`
  
    return result;
}

async function updateCandidate(request, response) {
    const candidateId = response.locals.candidate.id;
    
    const enabled = request.body.enabled ? request.body.enabled : response.locals.candidate.enabled;
    const slug = request.body.slug ? request.body.slug : response.locals.candidate.slug;
    const first_name = request.body.first_name ? request.body.first_name : response.locals.candidate.first_name;
    const last_name = request.body.last_name ? request.body.last_name : response.locals.candidate.last_name;
    const email = request.body.email ? request.body.email : response.locals.candidate.email;
    const description = request.body.description ? request.body.description : response.locals.candidate.description;
    const gender = request.body.gender ? request.body.gender : response.locals.candidate.gender;
    const birth_day = request.body.birth_day ? request.body.birth_day : response.locals.candidate.birth_day;
    const image = request.body.image ? request.body.image : response.locals.candidate.image;
    const address = request.body.address ? request.body.address : response.locals.candidate.address;
    const city = request.body.city ? request.body.city : response.locals.candidate.city;
    const state = request.body.state ? request.body.state : response.locals.candidate.state;
    const occupation = request.body.occupation ? request.body.occupation : response.locals.candidate.occupation;
    const hobbies = request.body.hobbies ? request.body.hobbies : response.locals.candidate.hobbies;
    const remember_token = request.body.remember_token ? request.body.remember_token : response.locals.candidate.remember_token;

    const result = await prisma.candidate.update({
        where: {
          id: + candidateId,
        },
        data: {
            enabled: enabled,
            slug: slug,
            firstName: first_name,
            lastName: last_name,
            email: email,
            description: description,
            gender: gender,
            birthDay: birth_day,
            image: image,
            address: address,
            city: city,
            state: state,
            occupation: occupation,
            hobbies: hobbies,
            rememberToken: remember_token
        },
      })

    return result;
}

async function deleteCandidate(request, response) {
    const candidateId = response.locals.candidate.id;
    
    const results = await prisma.candidate.delete({
        where: {
            id: + candidateId,
        },
      })

    return results;
}

const candidatesQueries = {
    getCandidates,
    getCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate
}

export default candidatesQueries;