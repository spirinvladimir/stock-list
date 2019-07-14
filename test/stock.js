const
    assert = require('assert'),
    Stock = require('../server/stock');

describe(__filename, () =>
    it('Stock constructor should create stock incstanse with all fields from arguments', () => {
        const
            stock = new Stock({
                id: 1,
                name: 'USD',
                currentPrice: 10,
                lastUpdate: 1503655752740
            });

        assert.deepEqual(stock.id, 1);
        assert.deepEqual(stock.name, 'USD');
        assert.deepEqual(stock.currentPrice, 10);
        assert.deepEqual(stock.lastUpdate, 1503655752740);
    })
);
