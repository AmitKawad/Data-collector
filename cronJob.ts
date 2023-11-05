const cron = require('node-cron');
import { DataCollectorService } from './services/dataCollectorService';
const dataCollectorService = new DataCollectorService();

export class Cron {
    scheduler = function () {
        console.log("Scheduler called")
        // Schedule a task to run every minute
        cron.schedule('30 10 * * *', async () => {
            console.log('Cron job running every minute');
            // Place your task logic here
            const result = await dataCollectorService.addDailyDataToDBYF();
            console.log(`result from cron ${result}`)

        });
    }

}