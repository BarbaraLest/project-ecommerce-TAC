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
	getAllUser,
	getSingleUser,
	updateUserRole,
	deleteUser,
} = require('../controllers/userController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

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

//admin
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser);
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);
module.exports = router;
