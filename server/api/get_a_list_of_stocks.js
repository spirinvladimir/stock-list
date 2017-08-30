const
    getAllStocks = require('../list').getAllStocks;

module.exports = (list) => (req, res) => res.json(
    getAllStocks(list)
);
