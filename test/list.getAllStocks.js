const
    test = require('ava'),
    createList = require('../server/list').createList,
    setStockById = require('../server/list').setStockById,
    getAllStocks = require('../server/list').getAllStocks,
    Stock = require('../server/stock');

test('getAllStocks', t => {
	const
        list = createList(),
        stock1 = new Stock({
            id: 1,
            name: 'USD',
            currentPrice: 10,
            lastUpdate: Date.now()
        }),
        stock2 = new Stock({
            id: 2,
            name: 'EUR',
            currentPrice: 10,
            lastUpdate: Date.now()
        });

    setStockById(list, stock1);
    setStockById(list, stock2);

    t.deepEqual(getAllStocks(list).length, 2);
    t.deepEqual(list[stock1.id], stock1);
    t.deepEqual(list[stock2.id], stock2);
});
