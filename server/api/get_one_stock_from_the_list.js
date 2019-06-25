const
    {getStockById} = require('../list');

module.exports = (list) => (req, res) => res.json(
    getStockById(list, req.params.id)
);
