function run(node) {
    enqueue(function() {
        runHelpers[node.type](node);
    });
    execute();
}

function init() {
    state.n = 0;
    stdout.innerHTML = "";
}

var queue = [];
function enqueue(x) {
    queue.push(x);
}

function dequeue() {
    return queue.shift();
}

var breatheTime   = 50;
var maxCpuHogTime = 10000;
var maxCallStack  = 300;
var curCallStack  = 0;
var t1 = Date.now();
function execute() {
    var t2  = Date.now();
    var dt  = t2 - t1;
    var fun = dequeue();

    setTimeout(fun, breatheTime);
    // if (curCallStack > maxCallStack || dt > maxCpuHogTime) {
    //     curCallStack = 0;
    //     setTimeout(fun, breatheTime);
    // }
    // else {
    //     curCallStack += 1;
    //     fun();
    // }
}

var stdout  = document.getElementById('stdout');
var code    = document.getElementById("the-code");

var state = {
    n: 0
};
var runHelpers = {
    AST: function(node) {
        node.data.forEach(run);
    },
    TWICE: function(node) {
        node.body.forEach(run);
        node.body.forEach(run);
    },
    COUNT: function(node) {
        state.n += 1;
        var line = document.createElement("div");
        line.className = "line";
        var text = document.createTextNode(state.n);
        line.appendChild(text);
        stdout.appendChild(line);
    }
};

var compileAndRun = function() {
    var ast = parser.parse(editor.getValue());
    init();
    run(ast);
};
document.getElementById("compile-and-run").onclick = compileAndRun;
