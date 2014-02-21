var compile = function(code) {
    var ast = parser.parse(code);
    var done = false;
    function run(node, cc) {
        exec(function() {
            runHelpers[node.type](node, cc);
        });
    }

    function init(ast, cc) {
        state.n = 0;
        state.x = 0;
        state.y = 0;
        state.stepSize = 10;
        run(ast, cc);
    }

    var breatheTime = 2;
    function exec(fun) {
        if (done) return;
        setTimeout(fun, breatheTime);
    }

    var state = {};
    var runHelpers = {
        BLOCK: function(node, cc) {
            if (node.body.length === 0) {
                exec(cc);
            } else {
                run(node.body[0], function() {
                    run({
                        type: "BLOCK",
                        body: node.body.slice(1)
                    }, cc);
                });
            }
        },
        TWICE: function(node, cc) {
            run(node.body, function() {
                run(node.body, cc);
            });
        },
        COUNT: function(node, cc) {
            state.n += 1;
            env.print(state.n);
            exec(cc);
        },
        UP      : function(node, cc) { env.moveBy(0, +state.stepSize); exec(cc); },
        DOWN    : function(node, cc) { env.moveBy(0, -state.stepSize); exec(cc); },
        LEFT    : function(node, cc) { env.moveBy(-state.stepSize, 0); exec(cc); },
        RIGHT   : function(node, cc) { env.moveBy(+state.stepSize, 0); exec(cc); }
    };
    (function() {
        this.AST = this.BLOCK
    }).call(runHelpers);

    return {
        start: function(cc) {
            init(ast, cc);
        },
        stop: function() {
            done = true;
        },
        state: state
    };
};
