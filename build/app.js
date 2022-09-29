"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors"); //must always be the first, ideal for error handling
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const ormconfig_1 = require("./ormconfig");
const routes_1 = require("./routes");
const PORT = process.env.PORT || '3001';
const app = (0, express_1.default)();
const URL = `${process.env.API_URL}/${PORT}`;
// create a database connection based on the ./ormconfig.ts file
(0, ormconfig_1.dbConnection)();
app.use('/api/v1/stripe/webhook', express_1.default.raw({ type: '*/*' }));
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    if (req.originalUrl === '/api/v1/stripe/webhook') {
        next();
    }
    else {
        express_1.default.json({ limit: '50mb' })(req, res, next);
    }
});
app.use((0, morgan_1.default)('dev'));
app.get('/', (req, res) => res.send('Boiler NodeJS - Kevin Efraim'));
// import the routes from the ./routes/index.ts file
app.use(routes_1.routerErrors);
app.use(routes_1.routerStripe);
app.use(routes_1.routerUsers);
// default empty route for 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.listen(PORT, () => console.log(`==> 😎 Listening on port ${PORT}.
   Open ${URL} in your browser.`));
exports.default = app;
