const
    test = require('ava'),
    createList = require('../server/list').createList;

test('createList should create hash-map with id for uuid', t => {
    const
        list = createList();

	t.deepEqual(typeof list, 'object');
	t.deepEqual(list.id, 0);
	t.deepEqual(list.id, list.__proto__.id);
	t.deepEqual(Object.keys(list).length, 0);
});
