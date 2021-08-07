const userRoute = require('../core/routerConfig');
const userController = require('../controller/userController');
const { authenticate, permit } = require('../core/userAuth');
const { USER_TYPE } = require('../utils/constants');

userRoute.route('/users')
    .post(userController.signup)
    .get(authenticate, permit([USER_TYPE.USER]), userController.getUserProfile)
    .put(authenticate, permit([USER_TYPE.USER]), userController.updateUserDetails);

userRoute.route('/users/all')
    .get(authenticate, permit([USER_TYPE.USER]), userController.getAllUser);

userRoute.route('/users/login')
    .post(userController.login);

userRoute.route('/users/forgot-password')
    .post(userController.forgotPassword);

userRoute.route('/users/reset-password')
    .post(userController.resetPassword);

userRoute.route('/users/change-password')
    .post(authenticate, permit([USER_TYPE.USER]), userController.changePassword);

userRoute.route('/users/:userId')
    .put(authenticate, permit([USER_TYPE.USER]), userController.updateUserDetails);

module.exports = userRoute;
