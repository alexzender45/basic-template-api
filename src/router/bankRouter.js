const bankRoute = require('../core/routerConfig');
const bankController = require('../controller/bankController');
const { authenticate, permit } = require('../core/userAuth');
const { ADMIN_ROLES, USER_TYPE } = require('../utils/constants');

bankRoute.route('/banks')
    .post(authenticate, permit([USER_TYPE.DRIVER]), bankController.addBank);

bankRoute.route('/banks/all')
    .get(authenticate, permit(Object.keys(ADMIN_ROLES)), bankController.getAllBanks);

bankRoute.route('/banks/:id')
    .get(authenticate, permit([USER_TYPE.DRIVER]), bankController.getBank)
    .put(authenticate, permit([USER_TYPE.DRIVER]), bankController.makeDefaultBank)
    .delete(authenticate, permit([USER_TYPE.DRIVER]), bankController.deleteBank);

module.exports = bankRoute;
