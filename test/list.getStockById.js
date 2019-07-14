const
    assert = require('assert'),
    {createList, setStockById, getStockById} = require('../server/list'),
    Stock = require('../server/stock');

describe(__filename, () =>
    it('getStockById', () => {
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
        assert.deepEqual(list[id], stock);
        assert.deepEqual(getStockById(list, id), stock);
    })
)
