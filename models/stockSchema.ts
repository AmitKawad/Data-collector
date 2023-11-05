const { DataTypes } = require('sequelize');
const sequelize = require('./../database/sequalize');

const StockPrices = sequelize.define('StockPrices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Symbol: {
        type: DataTypes.STRING(255)
      },
      date: {
        type: DataTypes.DATE
      },
      open: {
        type: DataTypes.DECIMAL(10, 4)
      },
      high: {
        type: DataTypes.DECIMAL(10, 4)
      },
      low: {
        type: DataTypes.DECIMAL(10, 4)
      },
      close: {
        type: DataTypes.DECIMAL(10, 4)
      },
      volume: {
        type: DataTypes.INTEGER
      }
},{
    timestamps: false,
    primaryKey: false // Define primary key explicitly as false
  });

module.exports = StockPrices;