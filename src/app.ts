import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ip from 'ip';
import * as dotenv from 'dotenv';
import logger from './utils/logger';
const knexConfig = require('../knexfile');
const knex = require('knex');


//import redis
const Redis = require('redis');

//Routes
import BaseRoutes from "./routes/BaseRoutes";
import { ENV_VARIABLES } from './config/environment';
import AuthRoutes from './routes/AuthRoutes';
import EventRoutes from './routes/EventRoutes';
import UniversityRoutes from './routes/UniversityRoutes';
import ProfileRoutes from './routes/ProfileRoutes';
import RsoRoutes from './routes/RsoRoutes';
import axios from 'axios';
import AwsRoutes from './routes/AwsRoutes';


const DEFAULT_EXPIRATION = 3600;
const redisClient = Redis.createClient();

// Create an Express application
const app = express();
dotenv.config();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.static("./public"));

// Use CORS middleware
const corsOptions = {
    origin: '*',
    // origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));

const environment = ENV_VARIABLES.stage_environement || 'development';
const connectionConfig = knexConfig[environment];

const db = knex(connectionConfig);

// Routes
const baseAPi = process.env.BASE_URL || "/api/v1";
app.use(baseAPi, BaseRoutes);
app.use(baseAPi, AuthRoutes);
app.use(baseAPi, EventRoutes);
app.use(baseAPi, UniversityRoutes);
app.use(baseAPi, ProfileRoutes);
app.use(baseAPi, RsoRoutes);
app.use(baseAPi, AwsRoutes);

// Define a home route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to event app backend for Course project COP4710 CI/CD2!');
});


app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId;
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos", {
        params: { albumId}
    });

    
    // redisClient.setex("photos", DEFAULT_EXPIRATION, JSON.stringify(data));
    // console.log("I got here");
    res.json(data);
});

app.get("/photos/:id", async (req, res) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`);

    res.json(data);
})

// Get the local IP address
const localIp = ip.address();
const PORT = process.env.PORT || 5050;

// Start the server
app.listen(PORT, () => {
    logger.info(`Server listening at http://localhost:${PORT} and ${localIp}:${PORT}`);
});