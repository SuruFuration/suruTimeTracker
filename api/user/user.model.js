const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = Schema({
  full_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  designation: {
    type: String,
    default: null
  },
  activation_User: {
    type: Boolean,
    default: true
  },
  userPasswordToken: String,
  userPasswordExpires: Date,
  attendance: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }
  ],
  role: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
  ],
  // project:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
  // ],
  project: [{ 
    project: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    projectReport: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectReport' }]
  }],
  timeTask: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Timetask' } ]
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, "SecretKey", {
    expiresIn: "3D"
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getUserPasswordToken = function () {
  const getToken = crypto.randomBytes(20).toString("hex");
  this.userPasswordToken = crypto
    .createHash("sha256")
    .update(getToken)
    .digest("hex");
  this.userPasswordExpires = Date.now() + 15 * 60 * 1000;
  return getToken;
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
