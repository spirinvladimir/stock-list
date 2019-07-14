const
    assert = require('assert'),
    request = require('supertest'),
    port = require('../server/port'),
    webserver = require('../server/webserver'),
    {createList} = require('../server/list');

describe(__filename, () => {
it('POST /api/stocks (create a stock)', done => {
    const
        app = webserver(createList(), port());

    request(app)
        .post('/api/stocks')
        .send({name: 'EUR', currentPrice: 1})
        .set('Accept', 'application/json')
        .then((res) => {
            const
                id = res.body.id,
                name = res.body.name,
                currentPrice = res.body.currentPrice,
                lastUpdate = res.body.lastUpdate;

            assert.deepEqual(id, 1);
            assert.deepEqual(name, 'EUR');
            assert.deepEqual(currentPrice, 1);
            assert.deepEqual(typeof lastUpdate, 'number');

            app.close();
            done();
        });
});

it('GET /api/stocks (get a list of stocks)', done => {
    const
        app = webserver(createList(), port()),
        send = (stock) => request(app)
            .post('/api/stocks')
            .send(stock)
            .expect(200);

    Promise.all([
        send({name: 'EUR', currentPrice: 1}),
        send({name: 'USD', currentPrice: 2})
    ]).then(() => {
        request(app)
            .get('/api/stocks')
            .set('Accept', 'application/json')
            .then((res) => {
                app.close();
                assert.deepEqual(res.body.length, 2);
                done();
            });
    });
});

it('GET /api/stocks/1 (get one stock from the list)', done => {
    const
        app = webserver(createList(), port());

    request(app)
        .post('/api/stocks')
        .send({name: 'EUR', currentPrice: 1})
        .expect(200)
        .then(res => res.body.id)
        .then(id => request(app)
            .get('/api/stocks/' + id)
            .set('Accept', 'application/json')
            .expect(200))
        .then((res) => {
            app.close();
            assert.deepEqual(res.body.hasOwnProperty("id"), true);
            assert.deepEqual(res.body.hasOwnProperty("name"), true);
            assert.deepEqual(res.body.hasOwnProperty("currentPrice"), true);
            assert.deepEqual(res.body.hasOwnProperty("lastUpdate"), true);
            done();
        });
});

it('PUT /api/stocks/1 (update the price of a single stock)', done => {
    const
        app = webserver(createList(), port());

    request(app)
        .post('/api/stocks')
        .send({name: 'EUR', currentPrice: 1})
        .expect(200)
        .then(res => res.body.id)
        .then(id => request(app)
            .put('/api/stocks/' + id)
            .send({currentPrice: 2})
            .set('Accept', 'application/json')
            .expect(200)
            .then(() => id))
        .then(id => request(app)
            .get('/api/stocks/' + id)
            .set('Accept', 'application/json')
            .expect(200))
        .then(res => res.body.currentPrice)
        .then((currentPrice) => {
            app.close();
            assert.deepEqual(currentPrice, 2);
            done();
        });
});

})
