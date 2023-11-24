import express from "express";
import ProjectController from "../controllers/projectController.js";
import checkAuth from "../middleware/checkAuth.js";
const projectRoutes = express.Router();
const projectController = new ProjectController();

projectRoutes
  .route("/")
  .get(checkAuth, projectController.retrieveProjects)
  .post(checkAuth, projectController.createProject);

projectRoutes
  .route("/:id")
  .get(checkAuth, projectController.retrieveProjectById)
  .put(checkAuth, projectController.updateProject)
  .delete(checkAuth, projectController.deleteProject);

projectRoutes.get("/tasks/:id", checkAuth, projectController.getProjectTasks);
projectRoutes.post(
  "add-collabotator",
  checkAuth,
  projectController.addCollaboratorToProject
);
projectRoutes.post(
  "delete-collabotator",
  checkAuth,
  projectController.removeCollaboratorFromProject
);
export default projectRoutes;
