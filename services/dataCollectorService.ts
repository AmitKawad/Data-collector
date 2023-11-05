import { response } from 'express';
'use strict';
const axios = require('axios');
const yahooFinance = require('yahoo-finance');
require('dotenv').config();
const fs = require('fs');
const { Op } = require('sequelize');
import { constants } from "../constants/const";
const stockSchema = require('./../models/stockSchema');
export class DataCollectorService {
    addHistoricDataToDB = async function () {
        try {
            for (const stock of constants.stocksSymbols) {
                console.log(`Adding Historic Data to DB for ${stock}`)
                const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${process.env['apiKey']}`

                const response = await axios.get(url, {
                    headers: { 'User-Agent': 'axios' }
                });
                let recordsInserted: number = 0;
                const data = response.data;
                console.log(data)
                const stockDataArray: any = [];

                for (const key in data['Time Series (Daily)']) {
                    const stockObject: any = {
                        Symbol: data['Meta Data']['2. Symbol'],
                        date: key,
                        open: data['Time Series (Daily)'][key]['1. open'],
                        high: data['Time Series (Daily)'][key]['2. high'],
                        low: data['Time Series (Daily)'][key]['3. low'],
                        close: data['Time Series (Daily)'][key]['4. close'],
                        volume: data['Time Series (Daily)'][key]['5. volume']
                    };
                    stockDataArray.push(stockObject);
                }

                console.log(`Inserting ${stockDataArray.length} records into database`)
                // Create instances of stockSchema outside the loop
                for (const element of stockDataArray) {
                    const newStockData = new stockSchema(element);
                    const insertResult = await newStockData.save();
                    if (insertResult) {
                        recordsInserted++;
                    }
                }

            }
            return "Data added Successfully"

        } catch (error) {
            console.log("Error", error)
            throw error;
        }

    }
    addDailyStockDataToDB = async function () {
        try {
            for (const stock of constants.stocksSymbols) {
                console.log(`Adding Historic Data to DB for stock ${stock}`)
                const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=compact&apikey=${process.env['apiKey']}`

                const response = await axios.get(url, {
                    headers: { 'User-Agent': 'axios' }
                });
                let recordsInserted: number = 0;
                const data = response.data;
                console.log(data)
                const stockDataArray: any = [];

                for (const key in data['Time Series (Daily)']) {
                    const stockObject: any = {
                        Symbol: data['Meta Data']['2. Symbol'],
                        date: key,
                        open: data['Time Series (Daily)'][key]['1. open'],
                        high: data['Time Series (Daily)'][key]['2. high'],
                        low: data['Time Series (Daily)'][key]['3. low'],
                        close: data['Time Series (Daily)'][key]['4. close'],
                        volume: data['Time Series (Daily)'][key]['5. volume']
                    };
                    stockDataArray.push(stockObject);
                    break;
                }
                console.log(`Inserting ${stockDataArray.length} records into database`)
                // Create instances of stockSchema outside the loop
                for (const element of stockDataArray) {
                    const newStockData = new stockSchema(element);
                    const insertResult = await newStockData.save();
                    if (insertResult) {
                        recordsInserted++;
                    }
                }
            }
            return "Data added Successfully"
        } catch (error) {
            console.log("Error", error)
            throw error;
        }
    }
    getDataBetweenDates = async function (startDate: string, endDate: string, symbol: string) {
        try {
            console.log("symbol", startDate)
            const stocksList: any[] = await stockSchema.findAll({
                where: {
                    Symbol: symbol,
                    date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            if (!stocksList) {
                throw new Error("No data between provided dates");
            } else {
                return stocksList
            }

        } catch (error) {
            console.log("Error")
            throw error;

        }

    }
    addHistoricDataToDBYF = async function () {
        try {
            const stockDataArray: any = [];
            for (const stock of constants.stocksSymbols) {
                console.log(`Adding Historic Data to DB for ${stock}`)
                //API call
                const currentDate = new Date().toISOString().split('T')[0]
                const response: any = await yahooFinance.historical({
                    symbol: stock,
                    from: '2015-01-01',
                    to: currentDate,
                    period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
                });
                stockDataArray.push(...response)
            }
            console.log(`Inserting ${stockDataArray.length} records into database`)
            // Create instances of stockSchema outside the loop
            for (const element of stockDataArray) {
                const dataObj = {
                    Symbol: element.symbol,
                    date: element.date.toISOString().split('T')[0],
                    open: element.open,
                    high: element.high,
                    low: element.low,
                    close: element.close,
                    volume: element.volume
                }
                console.log(dataObj)
                const newStockData = new stockSchema(dataObj);
                const insertResult = await newStockData.save();
            }
            return "Data added Successfully"

        } catch (error) {
            console.log("Error", error)
            throw error;
        }

    }
    addDailyDataToDBYF = async function () {
        try {
            const stockDataArray: any = [];
            for (const stock of constants.stocksSymbols) {
                console.log(`Adding Daily Data to DB for ${stock}`)
                //API call
                const currentDate = new Date().toISOString().split('T')[0]
                const response: any = await yahooFinance.historical({
                    symbol: stock,
                    from: currentDate,
                    to: currentDate,
                    period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
                });
                stockDataArray.push(...response)
            }
            console.log(`Inserting ${stockDataArray.length} records into database`)
            // Create instances of stockSchema outside the loop
            for (const element of stockDataArray) {
                const dataObj = {
                    Symbol: element.symbol,
                    date: element.date.toISOString().split('T')[0],
                    open: element.open,
                    high: element.high,
                    low: element.low,
                    close: element.close,
                    volume: element.volume
                }
                console.log(dataObj)
                const newStockData = new stockSchema(dataObj);
                const insertResult = await newStockData.save();
            }
            return "Data added Successfully"
        } catch (error) {
            console.log("Error", error)
            throw error;
        }
    }



}
