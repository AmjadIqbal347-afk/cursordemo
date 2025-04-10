const winston = require('winston');
const config = require('config');

// Custom format for the log message
const logFormat = winston.format.printf(({ timestamp, level, message, traceid, ...metadata }) => {
    const formattedTimestamp = new Date(timestamp).toISOString();
    const formattedLevel = level.toUpperCase();
    const traceId = traceid || 'N/A';
    const formattedMessage = typeof message === 'object' ? JSON.stringify(message) : message;
    
    return `[${formattedTimestamp}] [${formattedLevel}] [${traceId}] ${formattedMessage}`;
});

const logger = winston.createLogger({
    level: config.get('logging.level'),
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'traceid'] }),
        logFormat
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            )
        }),
        new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error',
            format: logFormat
        }),
        new winston.transports.File({ 
            filename: 'logs/combined.log',
            format: logFormat
        }),
        new winston.transports.File({ 
            filename: 'logs/http.log',
            format: logFormat
        })
    ]
});

module.exports = { logger }; 