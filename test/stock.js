const
    test = require('ava'),
    Stock = require('../server/stock');

test('Stock constructor should create stock incstanse with all fields from arguments', t => {
	const
        stock = new Stock({
            id: 1,
            name: 'USD',
            currentPrice: 10,
            lastUpdate: 1503655752740
        });

    t.deepEqual(stock.id, 1);
    t.deepEqual(stock.name, 'USD');
    t.deepEqual(stock.currentPrice, 10);
    t.deepEqual(stock.lastUpdate, 1503655752740);
});
