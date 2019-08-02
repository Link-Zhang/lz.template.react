const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const partition = require('./modules/index');
const server = restify.createServer({
    name: 'Home Mock Server',
    version: '1.0.0',
});

server.use(restify.plugins.bodyParser());

const cors = corsMiddleware({
    origins: ['http://localhost:3000','http://localhost:4000', 'http://localhost:5000','http://0.0.0.0:4000'],
    credentials: true,
});
server.pre(cors.preflight);
server.use(cors.actual);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
partition(server);
