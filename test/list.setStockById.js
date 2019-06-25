const
    test = require('ava'),
    {createList, setStockById} = require('../server/list'),
    Stock = require('../server/stock');

test('getStockById', t => {
	const
        list = createList(),
        id = 1,
        stock = new Stock({
            id,
            name: 'USD',
            currentPrice: 10,
            lastUpdate: Date.now()
        });

    setStockById(list, stock);
    t.deepEqual(list[id], stock);
});
