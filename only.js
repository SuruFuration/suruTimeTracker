const { log } = require("console");
const crypto = require("crypto")

const token = crypto.randomBytes(20).toString("hex");

console.log(token)

const tokenCrypto = crypto.createHash/*methon */("sha256"/*Algorithm */).update(token).digest/*to print in format*/("hex")

console.log(tokenCrypto)



//insert format only the user exist or not
// exports.userInsert = async (req, res, next) => {
//     try {
//       const { full_name, phone, email_address, password, designation } = req.body;
  
//       // Check if user already exists
//       // Validate Data
//       // Check User exist or not [ exist => already exist message]
//       // Insert New employee
//       // Mail (Link)
//       // Response admin 200
  
//       const existingUser = await user.findOne({ email_address });
//       if (existingUser) {
//         return res.status(409).json({ error: 'This email id already exists' });
//       }
  
//       // Insert new user
//       const newUser = await user.create({
//         full_name,
//         phone,
//         email_address,
//         password,
//         designation,
//       });
  
//       // Send email with a link (if needed)
//       // const token = getJWTToken();
//       // sendEmail(newUser.email_address, token);
  
//       res.status(201).json({
//         success: true,
//         newUser,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error inserting data into the database' });
//     }
//   };


    // Send registration success email
    // const transporter = nodemailer.createTransport({
    //   service: 'YourEmailService', // Specify the email service you are using
    //   auth: {
    //     user: 'your_email@example.com', // Replace with your email address
    //     pass: 'your_password', // Replace with your email password or an app-specific password
    //   },
    // });

    // const mailOptions = {
    //   from: 'your_email@example.com', // Sender email address
    //   to: newUser.email_address, // Recipient email address
    //   subject: 'Registration Successful', // Email subject
    //   text: 'Congratulations! Your registration was successful.', // Plain text body
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error('Error sending email:', error);
    //   } else {
    //     console.log('Email sent:', info.response);
    //   }
    // });




    //Login User
// exports.loginUser = catchAsyncError(async (req, res, next) => {

//     // Input Validation
//     // Database Validation
//     // Tocken
//     // Response tocken
  
//     const { email_address, password } = req.body;
  
//     // Check if email and password are provided
//     if (!email_address || !password) {
//       return next(new ErrorHander("Please enter email and password", 400));
//     }
  
//     const userNew = await user.findOne({ email_address }).select("+password");
  
//     if (!userNew) {
//       return next(new ErrorHander("Invalid email or password", 401));
//     }
  
//     const isPasswordMatched = await userNew.comparePassword(password);
  
//     if (!isPasswordMatched) {
//       return next(new ErrorHander("Invalid email or password", 401));
//     }
  
//     sendToken(userNew, 201, res);
//   });







const loginMail = await user.findOne({ email_address: req.body.email_address });

if (!loginMail) {
  return next(new ErrorHander("User not found", 404));
}

const loginUser = loginMail.getResetPasswordToken();
await loginMail.save({ validateBeforeSave: false });

const mailToEmailUrl = `${req.protocol}://${req.get(
  "host"
)}/api/login/user/${loginUser}`;

const message = `Your password reset token is: ${mailToEmailUrl}\n\nIf you have not requested this email, please ignore it.`;
