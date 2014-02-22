function Xlang(code, env) {
    var ast = parser.parse(code);
    var state = ko.observable("stopped");
    var turtle = {
        x: ko.observable(0),
        y: ko.observable(0),
        angle: ko.observable(0),
        speed: ko.observable(10)
    };
    var stepping = false;
    var n = 0;
    var lastCallback;
    function run(node, cc) {
        schedule(function() {
            runHelpers[node.type](node, cc);
        });
    }

    var breatheTime = 2;
    var funQ = [];
    var enQ = function(f) {
        funQ.push(f);
    };
    var deQ = function() {
        return funQ.shift();
    };
    function schedule(fun) {
        enQ(fun);
        if (fun === lastCallback) {
            state("stopped");
            process();
        } else if (state() === "playing") {
            setTimeout(process, breatheTime);
        }
    }
    function process() {
        var fun = deQ();
        if (fun) {
            fun();
            if (stepping) {
                state("paused");
                stepping = false;
            }
        } else {
            state("stopped");
            console.log("Ran out of funs to process");
        }
    }

    var runHelpers = {
        BLOCK: function(node, cc) {
            if (node.body.length === 0) {
                schedule(cc);
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
            n += 1;
            env.print(n);
            schedule(cc);
        },
        UP      : function(node, cc) { env.moveBy(0, +turtle.speed()); schedule(cc); },
        DOWN    : function(node, cc) { env.moveBy(0, -turtle.speed()); schedule(cc); },
        LEFT    : function(node, cc) { env.moveBy(-turtle.speed(), 0); schedule(cc); },
        RIGHT   : function(node, cc) { env.moveBy(+turtle.speed(), 0); schedule(cc); }
    };
    (function() {
        this.AST = this.BLOCK
    }).call(runHelpers);

    var api = {
        start: function(cc) {
            state("playing");
            lastCallback = cc;
            run(ast, cc);
        },
        stop: function() {
            state("stopped")
        },
        pause: function() {
            state("paused");
        },
        unpause: function() {
            state("playing");
            process();
        },
        step: function(cc) {
            stepping = true;
            if (state() === "stopped") {
                api.start(cc);
            } else {
                state("playing");
                process();
            }
        },
        state: readOnly(state),
        turtle: turtle
    };

    return api;
};
