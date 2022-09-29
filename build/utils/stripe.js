"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
exports.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: {
        name: 'stripe-boiler-node',
        version: '0.0.2',
    },
    typescript: true,
});
const createPaymentIntent = async (currency, paymentType) => {
    try {
        const params = {
            amount: 10000,
            currency,
            payment_method_types: paymentType ? paymentType : ['card'],
        };
        const paymentIntent = await exports.stripe.paymentIntents.create(params);
        return paymentIntent;
    }
    catch (e) {
        console.log(e);
    }
};
exports.createPaymentIntent = createPaymentIntent;
