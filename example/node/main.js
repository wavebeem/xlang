var lang = require('../build/parser');

function run(node) {
    enqueue(function() {
        runHelpers[node.type](node);
    });
    execute();
}

var queue = [];
function enqueue(x) {
    queue.push(x);
}

function dequeue() {
    return queue.shift();
}

var maxCpuHogTime = 300;
var t1 = Date.now();
function execute() {
    var t2  = Date.now();
    var dt  = t2 - t1;
    var fun = dequeue();

    if (dt > maxCpuHogTime) {
        setTimeout(fun, 0);
    }
    else {
        fun();
    }

}

function write(x) {
    process.stdout.write(x);
}

var runHelpers = {
    AST: function(node) {
        node.data.forEach(run);
        write('\n');
        run(node);
    },

    UP:     function(node) { write('↑'); },
    DOWN:   function(node) { write('↓'); },
    LEFT:   function(node) { write('←'); },
    RIGHT:  function(node) { write('→'); },
};

var ast = lang.parse('kkjjhlhl');
run(ast);
