let mongoose = require('mongoose');

const Project = require('../project/project.model');
const ProjectReport = require('./projectReport.model');

exports.projectReportInsert = async (req,res,next) => {


    // let { error, value } = validateProjectReport(req.body);

      console.log(req.params);
      project = req.params;
      id = project.id;
      const { report_name, client_name, project_duration, check_progress, summary} = req.body;
      const projectReport = await ProjectReport.create({
        report_name, 
        client_name, 
        project_duration, 
        check_progress, 
        summary,
        project:id
      });
      await projectReport.save();
      
      console.log(projectReport);
      const projectById = await Project.findById(id);
      console.log(projectReport,projectById)
      projectById.projectReport.push(projectReport);
      await projectById.save();

      return res.send(projectById);
  }
  
  exports.projectByProjectReport = async (req,res,next) => {
    const id = req.params.id;
    const projectByProjectReport = await ProjectReport.findById(id).populate('project');
    console.log(id)
    res.send(projectByProjectReport);
    console.log('#####>', id);
  }