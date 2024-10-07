import express, { Request, Response } from "express";
import prisma from "../database/client";
import CandidateRouter from "./routes/api/candidate.route";
import JobRouter from "./routes/api/job.route";
import JobsCandidatesRouter from "./routes/api/jobsoncandidates.route";
import EducationRouter from "./routes/api/education.route";
import EducationsCandidatesRouter from "./routes/api/educationsoncandidates.route";
import CourseRouter from "./routes/api/course.route";
import CoursesCandidatesRouter from "./routes/api/coursesoncandidates.route";
import SkillRoter from "./routes/api/skill.route";
import SkillsCandidatesRouter from "./routes/api/skillsoncandidates.route";
import LanguageRoter from "./routes/api/language.route";
import LanguagesCandidatesRouter from "./routes/api/languagesoncandidates.route";
import WorkExperienceRoter from "./routes/api/workexperience.route";
import UserRoter from "./routes/api/user.route";
import UsersCandidatesRouter from "./routes/api/userscandidates.route";
import CvRouter from "./routes/api/cv.route";
import UsersCvsRouter from "./routes/api/userscvs.route";
import LoginRouter from "./routes/api/login.route";
import { config_env as config, node_env } from "../config/config-env";

const app = express();
const envConfig = config[node_env];
const port = envConfig.docker_node_port;

// Homepage Route
app.get("/", async (req, res) => {
  res.status(200).json({ text: "CV Generator API - Home" });
})

async function main() {
  app.use(express.json());

  // Register API routes
  app.use("/api/candidate", CandidateRouter);
  app.use("/api/job", JobRouter);
  app.use("/api/candidates", JobsCandidatesRouter);
  app.use("/api/education", EducationRouter);
  app.use("/api/candidates", EducationsCandidatesRouter);
  app.use("/api/course", CourseRouter);
  app.use("/api/candidates", CoursesCandidatesRouter);
  app.use("/api/skill", SkillRoter);
  app.use("/api/candidates", SkillsCandidatesRouter);
  app.use("/api/language", LanguageRoter);
  app.use("/api/candidates", LanguagesCandidatesRouter);
  app.use("/api/work-experience", WorkExperienceRoter);
  app.use("/api/user", LoginRouter);
  app.use("/api/user", UserRoter);
  app.use("/api/candidates", UsersCandidatesRouter);
  app.use("/api/cv", CvRouter);
  app.use("/api/cvs", UsersCvsRouter);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
  