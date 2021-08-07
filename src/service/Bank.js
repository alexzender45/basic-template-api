const { createTransferRecipient } = require("../integration/paystackClient");
const bankSchema = require('../models/bankModel');
const { throwError } = require("../utils/handleErrors");
const util = require("../utils/util");
const { validateParameters } = require('../utils/util');

class Bank {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    getAllBanks() {
        const bank = bankSchema.findOne({userId: this.data});
        return bank ? bank : throwError('Bank Not Found!', 404)
    }

    async _bankExist() {
        const {userId, accountNumber} = this.data;
        const existingBank = await bankSchema.findOne({userId, accountNumber });
        if (existingBank) {
            this.errors.push('Bank Already Exists');
        }
    }

    async addBank() {
        const {userId, bankCode, accountNumber} = this.data;
        const existingUserBanks = await bankSchema.find({userId});
        if(!existingUserBanks.length) {
            this.data['isDefaultBank'] = true;
        }
        await this._bankExist();
        if (this.errors.length) {
            throwError(this.errors)
        }
        const bankDetails = await createTransferRecipient({account_number: accountNumber, bank_code: bankCode});
        this.data = {...this.data, ...bankDetails};
        const bank = new bankSchema(this.data);
        let validationError = bank.validateSync();
        if(validationError){
            Object.values(validationError.errors)
                .forEach(e => e.reason ? this.errors.push(e.reason.message) : this.errors.push(e.message.replace('Path ', '')));
            throwError(this.errors)
        }
        return await bank.save();
    }

    async getBank() {
        const bank = await bankSchema.findById(this.data);
        return bank ? bank : throwError('Bank Not Found', 404)
    }

    static async _getDefaultBank(userId) {
        return await bankSchema.find({userId: userId, isDefaultBank: true});
        // return bank ? bank : throwError('Bank Not Found', 404)
    }

    async makeDefaultBank() {
        const defaultBank = await Bank._getDefaultBank(this.data.userId);
        defaultBank.isDefaultBank = false;

        this.data = this.data['bankId'];
        const bank = await this.getBank();
        bank.isDefaultBank = true;

        const update = await bankSchema.insertMany([defaultBank, bank]);
        return 'default bank updated'
    }

    async deleteBank() {
        await bankSchema.deleteOne({_id: this.data});
        return 'Bank Deleted Successfully'
    }
}

module.exports = Bank;