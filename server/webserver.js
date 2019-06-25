const
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    get_a_list_of_stocks = require('./api/get_a_list_of_stocks'),
    get_one_stock_from_the_list = require('./api/get_one_stock_from_the_list'),
    update_the_price_of_a_single_stock = require('./api/update_the_price_of_a_single_stock'),
    create_a_stock = require('./api/create_a_stock');

module.exports = (list, port) => {
    const
        app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('public'));

    app.get('/api/stocks', get_a_list_of_stocks(list));
    app.get('/api/stocks/:id', get_one_stock_from_the_list(list));
    app.put('/api/stocks/:id', update_the_price_of_a_single_stock(list));
    app.post('/api/stocks', create_a_stock(list));

    return app.listen(port);
};
