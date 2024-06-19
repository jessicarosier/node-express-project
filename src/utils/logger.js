const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(), // adds a timestamp property
        winston.format.json() // formats the message as JSON
    ),
    transports: [new winston.transports.Console()], // logs to the console
});

module.exports = logger;