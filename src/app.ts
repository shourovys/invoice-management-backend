import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';

// modules
import agentRoutes from './modules/agent.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Car Invoicing System API');
});

// Use routes
app.use('/api', agentRoutes);

export default app