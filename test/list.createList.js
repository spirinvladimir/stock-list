const
    assert = require('assert'),
    {createList} = require('../server/list');

describe(__filename, () =>
    it('createList should create hash-map with id for uuid', () => {
        const
            list = createList();

       assert.deepEqual(typeof list, 'object');
       assert.deepEqual(list.id, 0);
       assert.deepEqual(list.id, list.__proto__.id);
       assert.deepEqual(Object.keys(list).length, 0);
    })
)
