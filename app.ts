import express from 'express';
import config from 'config';
const app = express();
const port = config.get('port')as number;
import dataRoute from "./routes/DataRoute" // Accessing the router from the imported module
import connect from './database/connect'
const cors = require('cors')
require('dotenv').config();
import { Cron } from './cronJob';

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/data',dataRoute);
const cron = new Cron();



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connect();
    cron.scheduler();
    
})