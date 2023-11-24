import express from "express";
import TaskController from "../controllers/taskController.js";
import checkAuth from "../middleware/checkAuth.js";
const taskRoutes = express.Router();
const taskController = new TaskController();
taskRoutes.post("/", checkAuth, taskController.addTask);
taskRoutes
  .route("/:id")
  .get(checkAuth, taskController.getTask)
  .put(checkAuth, taskController.updateTask)
  .delete(checkAuth, taskController.deleteTask);

taskRoutes.post("/changeStatus/:id", checkAuth, taskController.changeStatus);
export default taskRoutes;
