const
    webserver = require('./server/webserver'),
    createList = require('./server/list').createList,
    port = require('./server/port');

module.exports = webserver(createList(), port());
