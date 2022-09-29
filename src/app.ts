import "express-async-errors"; //must always be the first, ideal for error handling

import cors from "cors";
import express from "express";
import morgan from "morgan";

import { dbConnection } from "./ormconfig";
import { routerErrors, routerStripe, routerUsers } from "./routes";

const PORT = process.env.PORT || '3001';
const app = express();
const URL = `${process.env.API_URL}/${PORT}`;

// create a database connection based on the ./ormconfig.ts file

dbConnection();

app.use('/api/v1/stripe/webhook', express.raw({ type: '*/*' }));
app.use(cors());
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    if (req.originalUrl === '/api/v1/stripe/webhook') {
      next();
    } else {
      express.json({ limit: '50mb' })(req, res, next);
    }
  },
);
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('Boiler NodeJS - Kevin Efraim'));

// import the routes from the ./routes/index.ts file
app.use(routerErrors);
app.use(routerStripe);
app.use(routerUsers);

// default empty route for 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

app.listen(PORT, () =>
  console.log(
    `==> 😎 Listening on port ${PORT}.
   Open ${URL} in your browser.`,
  ),
);

export default app;
