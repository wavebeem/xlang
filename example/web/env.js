(function(GLOBAL) {
    var stdout;
    var code;
    var start;
    var escreen;
    var resolution = 1000;
    var ctx;
    var runtime;
    var env = {
        oneTimeInit: function() {
            stdout  = document.getElementById('stdout');
            code    = document.getElementById("the-code");
            start   = document.getElementById("program-start")
            escreen = document.getElementById("screen");

            start.onclick = function() {
                if (runtime) {
                    runtime.stop();
                }

                runtime = compile(editor.getValue());
                env.init();
                runtime.start(function() {
                    console.info("DONE");
                });
            };

            stop.onclick = function() {
                if (runtime) {
                    runtime.stop();
                }
            };
        },
        init: function() {
            stdout.innerHTML = "";

            escreen.width  = resolution;
            escreen.height = resolution;
            ctx = escreen.getContext("2d");

            ctx.scale(resolution/100, resolution/100);
            ctx.translate(50, 50);
            ctx.scale(1, -1);
            ctx.moveTo(runtime.state.x, runtime.state.y);
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
        },
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
            var x = runtime.state.x;
            var y = runtime.state.y;
            runtime.state.x += dx;
            runtime.state.y += dy;

            ctx.strokeStyle = env.nextColor();

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(runtime.state.x, runtime.state.y);
            ctx.stroke();
            ctx.closePath();
        }
    };
    GLOBAL.env = env;
    env.oneTimeInit();
})(this);
