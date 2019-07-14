const
    assert = require('assert'),
    {createList, setStockById, getAllStocks} = require('../server/list'),
    Stock = require('../server/stock');

describe(__filename, () =>
    it('getAllStocks', () => {
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

        assert.deepEqual(getAllStocks(list).length, 2);
        assert.deepEqual(list[stock1.id], stock1);
        assert.deepEqual(list[stock2.id], stock2);
    })
)
