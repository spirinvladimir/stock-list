const
    {getAllStocks} = require('../list');

module.exports = (list) => (req, res) => res.json(
    getAllStocks(list)
);
