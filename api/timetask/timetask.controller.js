let mongoose = require('mongoose');
let TimetaskModel = require('./timetask.model');
let UserModel = require('../user/user.model');
let ProjectModel = require('../project/project.model');


//insert new Timetask
exports.timetaskInsert = async (req, res, next) => {
  try {
    const { start_time, ideal_time, duration_time, end_time, user, project } = req.body;
    const mappedUsers = {};
    const mappedProjects = {};
    console.log(start_time, ideal_time, duration_time, end_time, user, project)

    for (const key1 in user) {
      console.log(key1, user[key1])
      modelUser = await UserModel.findOne({ _id: key1 });
      mappedUsers[key1] = user[key1]

      if (!modelUser) {
        res.status(500).json({ success: false, message: "No user in the User List" })
      }
    }
    console.log(mappedUsers)

    for (const key1 in project) {
      console.log(key1, project[key1])
      modelProject = await ProjectModel.findOne({ _id: key1 });
      mappedProjects[key1] = project[key1]

      if (!modelProject) {
        res.status(500).json({ success: false, message: "No project in the Project List" })
      }
    }
    console.log(mappedProjects)

    const timeTask = new TimetaskModel({ start_time, ideal_time, duration_time, end_time, user: mappedUsers, project: mappedProjects });
    await timeTask.save();
    //   res.json(recipe);
    res.status(200).json(timeTask)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};
