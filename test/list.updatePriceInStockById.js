const
    test = require('ava'),
    {createList, setStockById, updatePriceInStockById} = require('../server/list'),
    Stock = require('../server/stock');

test('updatePriceInStockById', t => {
	const
        list = createList(),
        id = 1,
        time = 1234567,
        stock = new Stock({
            id,
            name: 'USD',
            currentPrice: 2,
            lastUpdate: time
        });

    setStockById(list, stock);
    updatePriceInStockById(list, id, 3);
    t.deepEqual(list[id].currentPrice, 3);
    t.notDeepEqual(list[id].lastUpdate, time);
});
