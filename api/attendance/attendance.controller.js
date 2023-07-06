// const { validateAttendance } = require("./Attendance.validator");
const { validateAttendance, validateUpdate } = require("./attendance.validator");
const AttendanceModel = require("./attendance.model");
const UserModel = require("../user/user.model");

exports.attendanceInsert = async (req, res, next) => {
  try {
    // Validation
    const { error, value } = validateAttendance(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const attendanceExists = await AttendanceModel.findOne({ date: value.date });

    if (attendanceExists) {
      return res.status(409).json({ message: "Attendance already exists!" });
    }

    // Insert Attendance
    const attendance = new AttendanceModel(value);
    const savedAttendance = await attendance.save();

    // Update User's attendance array with the new attendance ID
    const user = await UserModel.findOne({ _id: value.user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.attendances.push(savedAttendance._id);
    await user.save();

    // Send Response
    res.status(200).json({ message: "success", attendance: savedAttendance, user });
  } catch (error) {
    // Send Error Response
    console.error(error);
    res.status(500).json({ message: "Error inserting data into database" });
  }
};

exports.showAllAttendances = async (req, res, next) => {
  try {
    const attendances = await AttendanceModel.find();
    if (!attendances || attendances.length === 0) {
      return res.status(404).json({ message: "Attendances not found" });
    }
    res.status(200).json({ attendances });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.showSingleAttendance = async (req, res, next) => {
  try {
    const id = req.params.id;
    const attendance = await AttendanceModel.findOne({ _id: id });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json({ message: "success", attendance });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateAttendance = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validation
    const { error, value } = validateUpdate(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const attendance = await AttendanceModel.findOneAndUpdate({ _id: id }, value, {
      new: true,
    });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json({ message: "success", attendance });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: "Error updating table" });
  }
};

exports.deleteAttendance = async (req, res, next) => {
  try {
    const id = req.params.id;

    const attendance = await AttendanceModel.findById(id);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // Find the User that contains the Attendance ID
    const user = await UserModel.findOne({ _id: attendance.user_id });

    if (user) {
      // Remove the Attendance ID from the User's Attendances array
      user.Attendances = user.attendances.filter(
        (attendanceId) => !attendanceId.equals(id)
      );
      await user.save();
    }

    // Delete the Attendance from the Attendance collection
    await AttendanceModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Attendance deleted successfully", user });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ error });
  }
};
