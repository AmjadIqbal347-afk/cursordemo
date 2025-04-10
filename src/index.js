const express = require('express');
const config = require('config');
const { logger } = require('./utils/logger');
const httpLogger = require('./middlewares/httpLogger');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();

// Parse JSON bodies
app.use(express.json());

// Use HTTP logging middleware
app.use(httpLogger);

// Base route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Score routes
app.use('/api/scores', scoreRoutes);

const serverConfig = config.get('server');
const PORT = serverConfig.port;
const HOST = serverConfig.host;

app.listen(PORT, HOST, () => {
    logger.info(`Server is running on http://${HOST}:${PORT}`);
}); 