const
    assert = require('assert'),
    {createList, setStockById, updatePriceInStockById} = require('../server/list'),
    Stock = require('../server/stock');

describe(__filename, () => {
    it('updatePriceInStockById', () => {
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
        assert.deepEqual(list[id].currentPrice, 3);
        assert.notDeepEqual(list[id].lastUpdate, time);
    })
});
