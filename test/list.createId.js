const
    test = require('ava'),
    createList = require('../server/list').createList,
    createId = require('../server/list').createId;

test('createId should create uuid', t => {
    const
        list = createList();

	t.deepEqual(createId(list), 1);
	t.deepEqual(createId(list), 2);
	t.deepEqual(list.id, 2);
});
