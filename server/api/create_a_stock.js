const
    path = require('path'),
    Stock = require('../stock'),
    {createId, setStockById} = require('../list');

module.exports = (list) => (req, res) => res.json(
    setStockById(
        list,
        new Stock({
            id: createId(list),
            name: req.body.name,
            currentPrice: req.body.currentPrice,
            lastUpdate: Date.now()
        })
    )
);
