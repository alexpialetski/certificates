const express = require('express');
const apiRouter = require('./api/index');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.get(['/', '/contest/:contestId'], (req, res) => {
    console.log('Working')
});

server.use('/api', apiRouter);

server.listen(config.port, config.host, () => {
    console.info('Express listening on port', config.port);
});
