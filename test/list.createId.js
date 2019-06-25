const
    test = require('ava'),
    {createList, createId} = require('../server/list');

test('createId should create uuid', t => {
    const
        list = createList();

	t.deepEqual(createId(list), 1);
	t.deepEqual(createId(list), 2);
	t.deepEqual(list.id, 2);
});
