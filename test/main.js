var assert = require('assert');

var lang = require('../build/parser');

describe("Nothing", function() {
    it("should do nothing");
});

describe("Parser", function() {
    it("should parse", function() {
        var ast = lang.parse('count.');
        console.log('\n');
        console.log(ast);
        // assert.deepEqual(ast, {
        //     type: 'AST',
        //     data: [
        //         { type: 'LEFT'  },
        //         { type: 'DOWN'  },
        //         { type: 'UP'    },
        //         { type: 'RIGHT' }
        //     ]
        // });
    });
});
