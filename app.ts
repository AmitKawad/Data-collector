import express from 'express';
import config from 'config';
const app = express();
const port = config.get('port')as number;
const dataRoute =  require('./routes/DataRoute');
import connect from './database/connect'
const cors = require('cors')
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/data',dataRoute);



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connect();
})