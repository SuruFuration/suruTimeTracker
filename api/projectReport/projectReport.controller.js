// const { validateProject } = require("./Project.validator");
const { validateProjectReport, validateUpdate } = require("./projectReport.validator");
const ProjectReportModel = require("./projectReport.model");
const ProjectModel = require("../project/project.model");

exports.projectReportInsert = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateProjectReport(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const projectReportExists = await ProjectReportModel.findOne({ projectReport_name: value.projectReport_name });

    if (projectReportExists) {
      return res.status(409).json({ message: "ProjectReport already exists!" });
    }

    // Insert Project
    const projectReport = new ProjectReportModel(value);
    const savedProjectReport = await projectReport.save();

    // Update project's projectReport array with the new projectReport ID
    const project = await ProjectModel.findOne({ _id: value.project_id });

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    project.projectReports.push(savedProjectReport._id);
    await project.save();

    // Send Response
    res.status(200).json({ message: "success", projectReport: savedProjectReport, project });
  } catch (error) {
    // Send Error Response
    console.error(error);
    res.status(500).json({ message: "Error inserting data into database" });
  }
};

exports.showAllProjectReports = async (req, res, next) => {
  try {
    const projectReports = await ProjectReportModel.find();
    if (!projectReports || projectReports.length === 0) {
      return res.status(404).json({ message: "ProjectReports not found" });
    }
    res.status(200).json({ projectReports });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.showSingleProjectReport = async (req, res, next) => {
  try {
    const id = req.params.id;
    const projectReport = await ProjectReportModel.findOne({ _id: id });

    if (!projectReport) {
      return res.status(404).json({ message: "ProjectReport not found" });
    }

    res.status(200).json({ message: "success", projectReport });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateProjectReport = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validation
    const { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const projectReport = await ProjectReportModel.findOneAndUpdate({ _id: id }, value, {
      new: true,
    });

    if (!projectReport) {
      return res.status(404).json({ message: "ProjectReport not found" });
    }

    res.status(200).json({ message: "success", projectReport });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Error updating table" });
  }
};

exports.deleteProjectReport = async (req, res, next) => {
  try {
    const id = req.params.id;

    const projectReport = await ProjectReportModel.findById(id);

    if (!projectReport) {
      return res.status(404).json({ message: "ProjectReport not found" });
    }

    // Find the project that contains the Project ID
    const project = await ProjectModel.findOne({ _id: projectReport.project_id });

    if (project) {
      // Remove the ProjectReport ID from the Project's ProjectReports array
      project.Projects = project.projectReports.filter(
        (projectReportId) => !projectReportId.equals(id)
      );
      await project.save();
    }

    // Delete the ProjectReport from the ProjectReport collection
    await ProjectReportModel.findByIdAndDelete(id);

    res.status(200).json({ message: "ProjectReport deleted successfully", project });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ error });
  }
};

exports.findProjectByProjectReportId = async (req, res, next) => {
  try {chcha
    // console.log(req.body._id)
    const projectReport = await ProjectReportModel.findById(req.body._id).populate("Project");
    if (!projectReport) {
      return res.status(404).json({ message: "projectReport not found" });
    }
    const project = projectReport.project;
    // console.log(Project._id);
    res.status(200).json({ message: "success", project });
  } catch (error) {
    res.status(500).json({ error });
  }
};
