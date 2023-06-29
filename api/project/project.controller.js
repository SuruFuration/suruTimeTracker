let mongoose = require('mongoose');
const User = require('../user/user.model');
const Project = require('./project.model');

exports.projectInsert = async (req,res,next) => {

  console.log(req.params);
  user = req.params;
  id = user.id;
  const {  ProjectName, StartDate, status, Create_At, Budget, Update_At, Description, EndDate} = req.body;
  const project = await Project.create({
    ProjectName,
    StartDate,
    status,
    Create_At,
    Budget,
    Update_At,
    Description,
    EndDate,
    user:id
  });
  await project.save();
  
  console.log(project);
  const userById = await User.findById(id);
  console.log(project,userById)
  userById.project.push(project);
  await userById.save();

  return res.send(userById);
}
  
exports.userByProject = async (req,res,next) => {
  const id = req.params.id;
  const userByProject = await Project.findById(id).populate('user');
  console.log(userByProject)
  
  res.send(userByProject);
  
  console.log(id);
}
