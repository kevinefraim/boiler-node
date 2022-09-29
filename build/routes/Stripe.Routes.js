"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerStripe = void 0;
const Stripe_Controller_1 = require("controllers/Stripe.Controller");
const express_1 = require("express");
const helpers_1 = require("utils/helpers");
exports.routerStripe = (0, express_1.Router)();
// Private Routes
exports.routerStripe.get('/api/v1/stripe/get-publishable-key', (0, helpers_1.safe)(Stripe_Controller_1.getPublishableKey));
exports.routerStripe.post('/api/v1/stripe/webhook', Stripe_Controller_1.createWebHook);
// Public Routes
