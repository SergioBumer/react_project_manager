import Project from "../models/project.js";
import Task from "../models/task.js";

class ProjectController {
  retrieveProjects = async (req, res) => {
    const projects = await Project.find().where("creator").equals(req.user);
    res.json(projects);
  };
  createProject = async (req, res) => {
    const projectToBeCreated = new Project(req.body);
    projectToBeCreated.creator = req.user._id;
    try {
      const savedProject = await projectToBeCreated.save();
      res.status(201).json(savedProject);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error.message });
    }
  };
  retrieveProjectById = async (req, res) => {
    const projects = await Project.find().where("_id").equals(req.params.id);

    if (projects.length === 0) {
      return res.status(404).json({ msg: "Project not found" });
    }

    if (projects[0].creator.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ msg: "You don't have permission to access this project." });
    }

    const tasks = await Task.find().where("project").equals(req.params.id);

    const projectToReturn = {project: projects[0], tasks};
    return res.json(projectToReturn);
  };
  updateProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.creator.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ msg: "You don't have permission to edit this project." });
    }

    const projectToUpdate = project;

    projectToUpdate.name = req.body.name || projectToUpdate.name;
    projectToUpdate.description =
      req.body.description || projectToUpdate.description;
    projectToUpdate.deadline = req.body.deadline || projectToUpdate.deadline;
    projectToUpdate.client = req.body.client || projectToUpdate.client;

    try {
      const updatedProject = await projectToUpdate.save();
      return res.json(updatedProject);
    } catch (error) {
      console.log(console.error());
      return res.status(500).json({ msg: error.message });
    }
  };

  deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.creator.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ msg: "You don't have permission to manage this project." });
    }

    try {
      await project.deleteOne();
      res.json({ msg: "The project has been deleted successfully." });
    } catch (error) {
      console.log(console.error());
      return res.status(500).json({ msg: error.message });
    }
  };

  addCollaboratorToProject = (req, res) => {
    res.json({ msg: "Hello mundo!" });
  };

  removeCollaboratorFromProject = (req, res) => {
    res.json({ msg: "Hello mundo!" });
  };

  getProjectTasks = async (req, res) => {
    const projects = await Project.find().where("_id").equals(req.params.id);

    if (projects.length === 0) {
      return res.status(404).json({ msg: "Project not found" });
    }

    if (projects[0].creator.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ msg: "You don't have permission to access this project." });
    }

    const tasks = await Task.find().where("project").equals(req.params.id);

    return res.json(tasks);
  };
}
export default ProjectController;
