const
    path = require('path'),
    Stock = require('../stock'),
    createId = require('../list').createId,
    setStockById = require('../list').setStockById;

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
