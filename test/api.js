const
    test = require('ava'),
    request = require('supertest'),
    port = require('../server/port'),
    webserver = require('../server/webserver'),
    {createList} = require('../server/list');

test.cb('POST /api/stocks (create a stock)', t => {
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

            t.deepEqual(id, 1);
            t.deepEqual(name, 'EUR');
            t.deepEqual(currentPrice, 1);
            t.deepEqual(typeof lastUpdate, 'number');

            app.close();
            t.end();
        });
});

test.cb('GET /api/stocks (get a list of stocks)', t => {
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
                t.deepEqual(res.body.length, 2);
                t.end();
            });
    });
});

test.cb('GET /api/stocks/1 (get one stock from the list)', t => {
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
            t.deepEqual(res.body.hasOwnProperty("id"), true);
            t.deepEqual(res.body.hasOwnProperty("name"), true);
            t.deepEqual(res.body.hasOwnProperty("currentPrice"), true);
            t.deepEqual(res.body.hasOwnProperty("lastUpdate"), true);
            t.end();
        });
});

test.cb('PUT /api/stocks/1 (update the price of a single stock)', t => {
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
            t.deepEqual(currentPrice, 2);
            t.end();
        });
});

test.cb('GET / (main page)', t => {
    const
        app = webserver(createList(), port());

    request(app)
        .get('/')
        .send()
        .expect(200)
        .then(() => {
            app.close();
            t.end();
        });
});
