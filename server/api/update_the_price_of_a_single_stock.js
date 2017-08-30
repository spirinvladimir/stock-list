const
    path = require('path'),
    updatePriceInStockById = require('../list').updatePriceInStockById;

module.exports = (list) => (req, res) => res.json(
    updatePriceInStockById(list, req.params.id, req.body.currentPrice)
);
