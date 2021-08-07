const axios = require('axios');
const { throwError } = require("../utils/handleErrors");
const { logger } = require("../utils/logger");
const { AMOUNT, PAYSTACK_SECRET_KEY, PAYSTACK_BASE_URL, CONNECTION_TIMEOUT } = require('../core/config');

const getHeaders = () => {
    return {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
    };
}

const axiosInstance = axios.create({
    baseURL: PAYSTACK_BASE_URL,
    timeout: Number(CONNECTION_TIMEOUT),
    headers: getHeaders()
});

exports.createTransferRecipient = async (data) => {
    try {
        const response = await axiosInstance.post(`/transferrecipient`, data);
        const {recipient_code, details} = response.data.data;
        return {
            recipientCode: recipient_code,
            accountName: details.account_name,
            bankName: details.bank_name
        }
    } catch (e) {
        logger.error('Error initializing payment with paystack', e);
        throwError('Error initializing payment with paystack. Kindly Contact The Administrator', 500);
    }
}

exports.initializePayment = async (email) => {
    try {
        const response = await axiosInstance.post(`/initialize`, { email, amount: AMOUNT });
        return {reference: response.data.data.reference, confirmationUrl: response.data.data.authorization_url };
    } catch (e) {
        logger.error('Error initializing payment with paystack', e);
        throwError('Error initializing payment with paystack. Kindly Contact The Administrator', 500);
    }
}

exports.verifyPayment = async (reference) => {
    try {
        const response = await axiosInstance.get(`/verify/${reference}`);
        return { status: response.data.data.status, message: response.data.data.gateway_response, paymentDate: response.data.data.paidAt };
    } catch (e) {
        logger.error('Error verifying booking payment with paystack', e);
        throwError(e.message, 500)
    }
}