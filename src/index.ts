import express, { Express, Router } from 'express';
import 'dotenv/config';
import cors from 'cors';
import ErrorHandler from './middlewares/error-handler';
import urlKeyRouter from './routes/url-key.route';
import { connectDB } from './services/db.service';
import UrlKeyPopulator from './services/url-key-populator.service';

const app: Express = express();
app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders:
    'Content-Type,Authorization,X-Amz-Date,X-Amz-Security-Token,X-Amz-Content-Sha256,X-Amz-Target,X-Api-Key,X-Amz-User-Agent,Host',
};
app.use(cors(corsOptions));

const router: Router = express.Router();
router.use(urlKeyRouter);
app.use('/v1', router);
app.use(ErrorHandler.undefinedRoute);
app.use(ErrorHandler.handleError);
process.on('uncaughtException', ErrorHandler.handleUncaughtError);

start().then(() => {
  console.log('Server started successfully!');
});

async function start(): Promise<void> {
  await connectDB();
  await UrlKeyPopulator.populateUrlKeys();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
