const Bank = require("../service/Bank");
const { error, success } = require("../utils/baseController");
const { logger } = require("../utils/logger");

exports.addBank = async (req, res) => {
    try {
        req.body['userId'] = req.user._id;
        const bank = await new Bank(req.body).addBank();
        return success(res, { bank });
    }catch(err) {
        logger.error("Error occurred at creating bank", err);
        return error(res, { code: err.code, message: err.message })
    }
}

exports.getBank = async (req, res) => {
    try {
        const bank = await new Bank(req.params.id).getBank();
        return success(res, { bank });
    } catch (err) {
        logger.error("Unable to fetch bank", err);
        return error(res, { code: err.code, message: err.message });
    }
}

exports.getAllBanks = async (req, res) => {
    try {
        const banks = await new Bank(req.user._id).getAllBanks();
        return success(res, { banks });
    } catch (err) {
        logger.error("Unable to complete request", err);
        return error(res, { code: err.code, message: err.message });
    }
}

exports.makeDefaultBank = async (req, res) => {
    try {
        const bank = await new Bank({userId: req.user._id, bankId: req.params.id}).makeDefaultBank();
        return success(res, { bank });
    } catch (err) {
        logger.error("Unable to update default bank", err);
        return error(res, { code: err.code, message: err.message });
    }
}

exports.deleteBank = async (req, res) => {
    try {
        const bank = await new Bank(req.params.id).deleteBank();
        return success(res, { bank });
    } catch (err) {
        logger.error("Unable to delete bank", err);
        return error(res, { code: err.code, message: err.message });
    }
}