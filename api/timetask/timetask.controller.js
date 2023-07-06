// const { validateProject } = require("./Project.validator");
const { validateTimetask, validateUpdate } = require("./timeTask.validator");
const TimeTaskModel = require("./timeTask.model");
const ProjectModel = require("../project/project.model");

exports.timeTaskInsert = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateTimetask(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const timeTaskExists = await TimeTaskModel.findOne({ timeTask_name: value.timeTask_name });

    if (timeTaskExists) {
      return res.status(409).json({ message: "TimeTask already exists!" });
    }

    // Insert Project
    const timeTask = new TimeTaskModel(value);
    const savedtimeTask = await timeTask.save();

    // Update project's timeTask array with the new timeTask ID
    const project = await ProjectModel.findOne({ _id: value.project_id });

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    project.timeTasks.push(savedtimeTask._id);
    await project.save();

    // Send Response
    res.status(200).json({ message: "success", timeTask: savedtimeTask, project });
  } catch (error) {
    // Send Error Response
    console.error(error);
    res.status(500).json({ message: "Error inserting data into database" });
  }
};

exports.showAllTimeTasks = async (req, res, next) => {
  try {
    const timeTasks = await TimeTaskModel.find();
    if (!timeTasks || timeTasks.length === 0) {
      return res.status(404).json({ message: "TimeTasks not found" });
    }
    res.status(200).json({ timeTasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.showSingleTimeTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const timeTask = await TimeTaskModel.findOne({ _id: id });

    if (!timeTask) {
      return res.status(404).json({ message: "TimeTask not found" });
    }

    res.status(200).json({ message: "success", timeTask });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateTimeTask = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validation
    const { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const timeTask = await TimeTaskModel.findOneAndUpdate({ _id: id }, value, {
      new: true,
    });

    if (!timeTask) {
      return res.status(404).json({ message: "TimeTask not found" });
    }

    res.status(200).json({ message: "success", timeTask });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Error updating table" });
  }
};

exports.deleteTimeTask = async (req, res, next) => {
  try {
    const id = req.params.id;

    const timeTask = await TimeTaskModel.findById(id);

    if (!timeTask) {
      return res.status(404).json({ message: "TimeTask not found" });
    }

    // Find the project that contains the Project ID
    const project = await ProjectModel.findOne({ _id: timeTask.project_id });

    if (project) {
      // Remove the TimeTask ID from the Project's TimeTasks array
      project.Projects = project.timeTasks.filter(
        (timeTaskId) => !timeTaskId.equals(id)
      );
      await project.save();
    }

    // Delete the TimeTask from the TimeTask collection
    await TimeTaskModel.findByIdAndDelete(id);

    res.status(200).json({ message: "TimeTask deleted successfully", project });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ error });
  }
};
