const
    assert = require('assert'),
    {createList, createId} = require('../server/list');

describe(__filename, () =>
    it('createId should create uuid', () => {
        const
            list = createList();

        assert.deepEqual(createId(list), 1);
        assert.deepEqual(createId(list), 2);
        assert.deepEqual(list.id, 2);
    })
)
