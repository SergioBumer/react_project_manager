import Task from "../models/task.js";
import Project from "../models/project.js";

export default class TaskController {
  addTask = async (req, res) => {
    const taskToAdd = new Task(req.body);

    const project = await this.#findProject(taskToAdd.project);
    if (!project) {
      res.status(404).json({ msg: "The project does not exist." });
    }
    const userOwnsProject = await this.#validateProjectOwner(req, project);
    if (userOwnsProject) {
      try {
        const savedTask = await taskToAdd.save();
        return res.json(savedTask);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    } else {
      res.status(403).json({
        msg: "You are not allowed to do this action.",
      });
    }
  };
  getTask = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id).populate("project");
      if (!task) {
        return res.status(404).json({ msg: "Task not found." });
      }
      if (!(await this.#validateProjectOwner(req, task.project))) {
        return res.status(403).json({
          msg: "You are not allowed to do this action.",
        });
      }

      res.json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };
  updateTask = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id).populate("project");
      if (!task) {
        return res.status(404).json({ msg: "Task not found." });
      }
      if (!(await this.#validateProjectOwner(req, task.project))) {
        return res.status(403).json({
          msg: "You are not allowed to do this action.",
        });
      }
      // Update the project
      task.name = req.body.name || task.name;
      task.description = req.body.description || task.description;
      task.priority = req.body.priority || task.priority;
      task.deadline = req.body.deadline || task.deadline;

      const updatedTask = await task.save();

      res.json(updatedTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };
  deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id).populate("project");
      if (!task) {
        return res.status(404).json({ msg: "Task not found." });
      }
      if (!(await this.#validateProjectOwner(req, task.project))) {
        return res.status(403).json({
          msg: "You are not allowed to do this action.",
        });
      }
      await task.deleteOne();
      res.json({ msg: "The task has been succesfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };
  changeStatus = async (req, res) => {};

  #findProject = async (id) => {
    let project;
    try {
      project = await Project.findById(id);
      return project;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  #validateProjectOwner = async (req, project) => {
    return project.creator.toString() === req.user._id.toString();
  };

}
