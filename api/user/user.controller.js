let mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
let user = require('./user.model');
const nodemailer = require("nodemailer");
const ErrorHander = require("../utils/errorhander")
const catchAsyncError = require("../middleware/catchAsyncError")
const sendToken = require("../utils/jwtToken");
// const { sendMail  } = require("../utils/sendEmail");
const crypto = require("crypto")
const { google } = require('googleapis');
let { validateUser } = require('./user.validator');
let UserModel = require('./user.model');


const CLIENT_ID = '983972594472-cgl7t5ag7lnbp96eb7pffhevhs1jgu35.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04cgiBwYTO7F7CgYIARAAGAQSNwF-L9IrgVu67HfoHrSUP3wu_gim4m6gCOWYnrmWOHTDpYyEy_8fKpBTqsX1WLWt498HXxI1zVk';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Function to validate user data
// function validateUser(user) {
//   return userSchema.validate(user);
// }

// Function to send registration success email
async function sendMail(options) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'survesh.pandit@furation.tech',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Suru <survesh.pandit@furation.tech>',
      to: options.email_address,
      subject: options.subject,
      text: options.message
    };
    const result = await transporter.sendMail(mailOptions);

    return result;
  } catch (error) {
    throw error;
  }
}

// Insert new User
exports.userInsert = async (req, res, next) => {

  try {
    const { full_name, phone, email_address, password, designation } = req.body;

    // Validate user data
    const { error } = validateUser(req.body);

    // Check Error in Validation
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Check if user already exists
    const existingUser = await user.findOne({ email_address });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
  
    // Insert new user
    const newUser = await user.create({
      full_name,
      phone,
      email_address,
      password,
      designation,
    });

    //send the the token through mail
    const getToken = newUser.getUserPasswordToken();
      await newUser.save({ validateBeforeSave: false });

      const userPasswordUrl = `${req.protocol}://${req.get(
      "host"
      )}/api/password/reset/${getToken}`;

    // Send registration success email
    const mailOptions = {
      email_address: newUser.email_address,
      subject: 'Registration Successful',
      // message: 'Congratulations! Your registration was successful.',
      message: `Your Login password token is: ${userPasswordUrl}\n\nIf you have not requested this email, please ignore it.`,
    };
    const result = await sendMail(mailOptions);
    
    // console.log(mailOptions)
    // res.status(201).json({
      res.status(200).json({
        success: true,
        newUser,
        message: `Email sent to ${newUser.email_address} successfully`,
      });
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ error: 'Error inserting data into the database' });

    newUser.userPasswordToken = undefined;
    newUser.userPasswordExpire = undefined;
    await newUser.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
};

// Display List
exports.showUsers = async (req, res, next) => {
  try {
    let user = await UserModel.find();
    if (!user || user.length === 0) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Display Single User
exports.showUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await UserModel.findOne({ _id: id });

    if (!user) {
      console.log('user not found');
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete Table
exports.deleteUser = async (req, res, next) => {
  try {
    let id = req.params.id;

    let user = await UserModel.deleteOne({ _id: id });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ id });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ error });
  }
};

//Login User
const Joi = require('joi');

const loginSchema = Joi.object({
  email_address: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  try {
    
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(new Error('Validation error: ' + error.details[0].message));
    }

    const userPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    console.log(userPasswordToken)

    const userLogin = await user.findOne({ userPasswordToken });
    console.log(userLogin)

    if (!userLogin) {
      return next(new ErrorHander("Password Token is invalid or has expired", 400));
    }

    if (!req.body.password) {
      return next(new ErrorHander("Password and Email do not match", 400));
    }
    
    userLogin.password = req.body.password;
    userLogin.userPasswordToken = undefined;
    userLogin.userPasswordExpire = undefined;
  
    await userLogin.save();

    const { email_address, password } = req.body;

    const userNew = await user.findOne({ email_address }).select('+password');

    if (!userNew) {
      return next(new Error('Invalid email or password'));
    }

    const isPasswordMatched = await userNew.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new Error('Invalid email or password'));
    }

    sendToken(userNew, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// //Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});


/* *************************************************************************************************************** */



//Forgot Password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const userPassword = await user.findOne({ email: req.body.email });

  if (!userPassword) {
    return next(new ErrorHander("User not found", 404));
  }

  const resetToken = userPassword.getResetPasswordToken();
  await userPassword.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is: ${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`;

  try {
    await sendMail({
      email_address: userPassword.email_address,
      subject: "TimeTracker Password Recovery Done",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${userPassword.email_address} successfully`,
    });
  } catch (error) {
    userPassword.resetPasswordToken = undefined;
    userPassword.resetPasswordExpire = undefined;
    await userPassword.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
});

// //Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const userReset = await user.findOne({ resetPasswordToken });

  if (!userReset) {
    return next(new ErrorHander("Reset Password Token is invalid or has expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password and Confirm Password do not match", 400));
  }

  userReset.password = req.body.password;
  userReset.resetPasswordToken = undefined;
  userReset.resetPasswordExpire = undefined;

  await userReset.save();

  sendToken(userReset, 200, res);
});

//Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  
  const userDetail = await user.findOne(req.body.id);

  res.status(200).json({
    success: true,
    userDetail,
  })
})

//Update user Password
exports.passwordUpdate = catchAsyncError(async (req, res, next) => {

  const updatePassword = await user.findOne(req.body.id).select("+password");

  const isPasswordMatched = await updatePassword.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new Error('Old password is incorrect', 400));
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new Error('Password does not match', 400));
  }

  updatePassword.password = req.body.newPassword;

  await updatePassword.save();

  sendToken(updatePassword, 200, res);
})

//Update User Profile
exports.profileUpdate = catchAsyncError(async (req, res, next) => {

  const newUserData = {
    full_name: req.body.full_name,
    email_address: req.body.email_address
  }

  const updateUserProfile = await user.findOneAndUpdate(req.body.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  console.log(updateUserProfile)
  
  res.status(200).json({
    success:true,
    updateUserProfile
  }) 
})