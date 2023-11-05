import express, { request, response, NextFunction, Router } from 'express';
const router = express.Router();

const test = function(){
    return "test"
}



router.get('/test', test);

module.exports = router