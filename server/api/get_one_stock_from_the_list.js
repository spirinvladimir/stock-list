const
    getStockById = require('../list').getStockById;

module.exports = (list) => (req, res) => res.json(
    getStockById(list, req.params.id)
);
