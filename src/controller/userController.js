const { error, success } = require("../utils/baseController");
const { generateAuthToken } = require("../core/userAuth");
const { logger } = require("../utils/logger");
const { registrationSuccessful } = require('../utils/sendgrid');
const User = require("../service/User");


exports.signup = async (req, res) => {
    try {
        const newUser = await new User(req.body).signup();
        const token = await generateAuthToken({ 
            userId: newUser._id, 
            isActive: newUser.isActive,
            userType: newUser.userType,
            role: newUser.role,
        })
        await registrationSuccessful(newUser.email, newUser.fullName);
        return success(res, { newUser, token });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}

exports.login = async (req, res) => {
   try {
        const userDetails = await new User(req.body).login();
        const token = await generateAuthToken({ 
            userId: userDetails._id, 
            isVerified: userDetails.verified, 
            isActive: userDetails.isActive, 
            userType: userDetails.userType,
         });
        return success(res, { userDetails, token });
    } catch (err) {
        logger.error("Error occurred at login", err.message);
        return error(res, { code: err.code, message: err.message });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.getAllUser();
        return success(res, { users });
    } catch (err) {
        logger.error("Unable to complete request", err);
        return error(res, { code: err.code, message: err.message });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await new User(req.user._id).userProfile();
        return success(res, { user });
    } catch (err) {
        logger.error("Unable to complete fetch user profile request", err);
        return error(res, { code: err.code, message: err.message });
    }
}

exports.updateUserDetails = async (req, res) => {
    try {
        const newDetails = req.body;
        const oldDetails = req.user;
        const user = await new User({newDetails, oldDetails}).updateUserDetails();
        return success(res, { user });
    } catch (err) {
        logger.error("Unable to complete user update request", err);
        return error(res, { code: err.code, message: err.message });
    }
};

exports.forgotPassword = (req, res) => {
    new User(req.body).forgotPassword()
        .then(data => success(res, {status: "success", success: true, message: "Token Has Been Sent To Your Email"}))
        .catch(err => error(res, { code: err.code, message: err.message }))
};

exports.resetPassword = (req, res) => {
    new User(req.body).resetPassword()
        .then(data => success(res, {status: "success", success: true,
         message: "Password Reset Successful"}))
        .catch(err => error(res, { code: err.code, message: err.message }))
}

exports.changePassword = async (req, res) => {
    try {
        const { newPassword, oldPassword } = req.body;
        const userId = req.user._id;
        const user = await new User({newPassword, oldPassword, userId}).changePassword();
        return success(res, { user });
    } catch (err) {
        logger.error("Unable to complete user update request", err);
        return error(res, { code: err.code, message: err.message });
    }
}
