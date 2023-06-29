const errorhander = require("../utils/errorhander");
const catchAsyncError = require("./catchAsyncError")
const jwt = require("jsonwebtoken")
const User = require("../user/user.model")

exports.isAuthenticatedUser = catchAsyncError(async(req, res, next)=>{
    const { token } = req.cookies;

    if(!token){
        return next(new errorhander("Please Login First", 401));
    }

    const decodedData = jwt.verify(token, "SecreyKey");

    req.user = await User.findById(decodedData.id)

    next()
})