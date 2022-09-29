"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebHook = exports.getPublishableKey = void 0;
const stripe_1 = require("utils/stripe");
const dotenv = require('dotenv-override');
dotenv.config({ override: true });
const getPublishableKey = (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
};
exports.getPublishableKey = getPublishableKey;
const createWebHook = async (req, res) => {
    try {
        let event = stripe_1.stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
        // ---- Handle all events here ----
        const events = {
            'payment_intent.created': () => console.log('💰 PaymentIntent created'),
            'payment_intent.succeeded': () => console.log('💰 PaymentIntent succeeded'),
            'payment_intent.payment_failed': () => console.log('💰 PaymentIntent failed'),
            'payment_intent.canceled': () => console.log('💰 PaymentIntent canceled'),
        };
        res.sendStatus(200);
        if (!events[event.type])
            return console.log('💰 Unhandled event type');
        return events[event.type]();
    }
    catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        res.sendStatus(400);
        return;
    }
};
exports.createWebHook = createWebHook;
