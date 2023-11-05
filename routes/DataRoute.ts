import express, { Request, Response, NextFunction, Router } from 'express';
import { DataCollectorService } from '../services/dataCollectorService';

const router = express.Router();
const dataCollectorService = new DataCollectorService();

const PushStockData = async function (request: Request, response: Response, next: NextFunction) {
    try {
        const result = await dataCollectorService.addHistoricDataToDB();
        response.json({
            success: true,
            message: result
        });
    } catch (error: any) {
        if (error instanceof Error) {
            response.json({
                success: false,
                error: error.message
            });
        } else {
            response.json({
                success: false,
                error: 'An unknown error occurred'
            });
        }
    }
};
const pushDailyData = async function(request: Request, response: Response, next: NextFunction){
    try {
        const result = await dataCollectorService.addDailyStockDataToDB();
        response.json({
            success: true,
            message: result
        });
    } catch (error: any) {
        if (error instanceof Error) {
            response.json({
                success: false,
                error: error.message
            });
        } else {
            response.json({
                success: false,
                error: 'An unknown error occurred'
            });
        }
    }
}

const getStockData = async function(request: Request, response: Response, next: NextFunction){
    try{
        
        const startDate:string = request.query.startDate as string;
        const endDate:string = request.query.endDate as string;
        const symbol :string= request.query.symbol as string;
        const APIresponse = await dataCollectorService.getDataBetweenDates(startDate,endDate,symbol);
        response.json({
            success: true,
            data: APIresponse
        });

    }catch(error){
        response.json({
            success: false,
            error: error.message
        })
        
    }
}
router.post('/addStockPrices', PushStockData);
router.post('/UpdateDailyPrices', pushDailyData);
router.get('/getStockData', getStockData);

export default router;