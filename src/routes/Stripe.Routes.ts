import {
  createWebHook,
  getPublishableKey
} from "controllers/Stripe.Controller";
import { Router } from "express";
import { safe } from "utils/helpers";

export const routerStripe = Router();

// Private Routes

routerStripe.get('/api/v1/stripe/get-publishable-key', safe(getPublishableKey));

routerStripe.post('/api/v1/stripe/webhook', createWebHook);

// Public Routes
