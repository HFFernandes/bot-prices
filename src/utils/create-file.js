const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new  winston.transports.Console({ level: "debug" }),    
    new winston.transports.File({ filename: 'logs/alerts.log' })
  ]
});

module.exports = logger;