function run(node, cc) {
    exec(function() {
        runHelpers[node.type](node, cc);
    });
}

function init() {
    state = {
        n: 0,
        x: 0,
        y: 0,
        stepSize: 10
    };
    stdout.innerHTML = "";
    escreen.width = escreen.width;
    ctx.scale(resolution/100, resolution/100);
    ctx.translate(50, 50);
    ctx.scale(1, -1);
    ctx.moveTo(state.x, state.y);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
}

var breatheTime = 2;
function exec(fun) {
    setTimeout(fun, breatheTime);
}

var stdout = document.getElementById('stdout');
var code   = document.getElementById("the-code");

var env = {
    print: function(x) {
        var line = document.createElement("div");
        line.className = "line";
        var text = document.createTextNode(x);
        line.appendChild(text);
        stdout.appendChild(line);
        stdout.scrollTop = stdout.scrollHeight;
    },
    nextColor: (function() {
        var n = 0;
        var colors = [];
        for (var deg = 0; deg < 360; deg += 30) {
            colors.push("hsla(" + [
                deg,
                "80%",
                "40%",
                0.90
            ] + ")");
        }
        var m = colors.length;
        return function() {
            n += 1;
            n %= m;
            return colors[n];
        };
    })(),
    moveBy: function(dx, dy) {
        var x = state.x;
        var y = state.y;
        state.x += dx;
        state.y += dy;

        ctx.strokeStyle = env.nextColor();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(state.x, state.y);
        ctx.stroke();
        ctx.closePath();
    }
};
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

var compileAndRun = function() {
    var ast = parser.parse(editor.getValue());
    init();
    console.info("BEGIN!");
    // console.log(JSON.stringify(ast.data, null, 4));
    run(ast, function() {
        console.info("END!");
    });
};
document.getElementById("program-start").onclick = compileAndRun;
var escreen = document.getElementById("screen");
var resolution = 1000;
escreen.width  = resolution;
escreen.height = resolution;
var ctx = escreen.getContext("2d");
