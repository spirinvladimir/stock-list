const
    test = require('ava'),
    createList = require('../server/list').createList,
    setStockById = require('../server/list').setStockById,
    getStockById = require('../server/list').getStockById,
    Stock = require('../server/stock');

test('getStockById', t => {
	const
        list = createList(),
        id = 1,
        stock = new Stock({
            id: id,
            name: 'USD',
            currentPrice: 10,
            lastUpdate: Date.now()
        });

    setStockById(list, stock);
    t.deepEqual(list[id], stock);
    t.deepEqual(getStockById(list, id), stock);
});
