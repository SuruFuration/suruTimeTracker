// const { validateProject } = require("./Project.validator");
const { validateProject, validateUpdate } = require("./project.validator");
const ProjectModel = require("./project.model");
const UserModel = require("../user/user.model");

exports.projectInsert = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateProject(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const projectExists = await ProjectModel.findOne({ project_name: value.project_name });

    if (projectExists) {
      return res.status(409).json({ message: "Project already exists!" });
    }

    // Insert Project
    const project = new ProjectModel(value);
    const savedProject = await project.save();

    // Update User's project array with the new project ID
    const user = await UserModel.findOne({ _id: value.user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.projects.push(savedProject._id);
    await user.save();

    // Send Response
    res.status(200).json({ message: "success", project: savedProject, user });
  } catch (error) {
    // Send Error Response
    console.error(error);
    res.status(500).json({ message: "Error inserting data into database" });
  }
};

exports.showAllProjects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "Projects not found" });
    }
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.showSingleProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = await ProjectModel.findOne({ _id: id });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "success", project });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validation
    const { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const project = await ProjectModel.findOneAndUpdate({ _id: id }, value, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "success", project });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Error updating table" });
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const id = req.params.id;

    const project = await ProjectModel.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Find the User that contains the Project ID
    const user = await UserModel.findOne({ _id: project.user_id });

    if (user) {
      // Remove the Project ID from the User's Projects array
      user.Projects = user.projects.filter(
        (projectId) => !projectId.equals(id)
      );
      await user.save();
    }

    // Delete the Project from the Project collection
    await ProjectModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Project deleted successfully", user });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ error });
  }
};

exports.findUserByProjectId = async (req, res, next) => {
  try {chcha
    // console.log(req.body._id)
    const project = await ProjectModel.findById(req.body._id).populate("User");
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    const user = project.User;
    // console.log(Project._id);
    res.status(200).json({ message: "success", user });
  } catch (error) {
    res.status(500).json({ error });
  }
};
