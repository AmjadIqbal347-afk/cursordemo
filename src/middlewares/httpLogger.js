const { logger } = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

const httpLogger = (req, res, next) => {
    const start = Date.now();
    const traceId = uuidv4();
    
    // Log request details
    logger.info('Incoming Request', {
        traceid: traceId,
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body
    });

    // Capture response data
    const originalSend = res.send;
    res.send = function (body) {
        const responseTime = Date.now() - start;
        
        // Log response details
        logger.info('Outgoing Response', {
            traceid: traceId,
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            responseTime: `${responseTime}ms`,
            body: body
        });

        return originalSend.call(this, body);
    };

    next();
};

module.exports = httpLogger; 