const
    createList = () => Object.create({id: 0}),
    createId = (list) => ++list.__proto__.id,
    setStockById = (list, stock) => {
        list[stock.id] = stock;
        return stock;
    },
    getStockById = (list, id) => list[id],
    getAllStocks = (list) => Object.keys(list).map(id => list[id]),
    updatePriceInStockById = (list, id, currentPrice) => {
        const
            stock = getStockById(list, id);

        stock.currentPrice = currentPrice;
        stock.lastUpdate = Date.now();
        return stock.lastUpdate;
    };

module.exports.createId = createId;
module.exports.createList = createList;
module.exports.setStockById = setStockById;
module.exports.getStockById = getStockById;
module.exports.getAllStocks = getAllStocks;
module.exports.updatePriceInStockById = updatePriceInStockById;
