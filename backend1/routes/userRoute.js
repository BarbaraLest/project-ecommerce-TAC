const express = require('express');
const {
	registerUser,
	loginUser,
	logoutUser,
	forgotPassword,
	resetPassword,
	getUserDetails,
	updatePassword,
	updateProfile,
} = require('../controllers/userController');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');

//auth user
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

//user profile
router.route('/user/details').get(isAuthenticatedUser, getUserDetails);
router.route('/user/update').put(isAuthenticatedUser, updateProfile);

module.exports = router;
