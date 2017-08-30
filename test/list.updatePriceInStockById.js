const
    test = require('ava'),
    createList = require('../server/list').createList,
    setStockById = require('../server/list').setStockById,
    updatePriceInStockById = require('../server/list').updatePriceInStockById,
    Stock = require('../server/stock');

test('updatePriceInStockById', t => {
	const
        list = createList(),
        id = 1,
        time = 1234567,
        stock = new Stock({
            id: id,
            name: 'USD',
            currentPrice: 2,
            lastUpdate: time
        });

    setStockById(list, stock);
    updatePriceInStockById(list, id, 3);
    t.deepEqual(list[id].currentPrice, 3);
    t.notDeepEqual(list[id].lastUpdate, time);
});
