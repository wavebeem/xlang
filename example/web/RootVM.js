function RootVM() {
    var stdout  = document.getElementById('stdout');
    var code    = document.getElementById("the-code");
    var escreen = document.getElementById("screen");

    var resolution;
    var ctx;
    var runtime = ko.observable(new Xlang("", {}));
    var onProgramEnd = function() {
        console.log("DONE!");
    };
    var compile = function() {
        var text = editor.getValue();
        runtime(new Xlang(text, env));
        init();
    };
    var play = function() {
        if (runtime().state() === "paused") {
            runtime().unpause();
        } else {
            compile();
            runtime().start(onProgramEnd);
        }
    };
    var stop = function() {
        runtime().stop();
        onProgramEnd();
    };
    var pause = function() {
        runtime().pause();
    };
    var step = function() {
        if (runtime().state() === "stopped") {
            compile();
        }
        runtime().step(onProgramEnd);
    };
    var colorIndex = 0;
    var colors = _(_.range(0, 360, 30)).map(function(d) {
        return "hsla(" + [
            d,
            "80%",
            "40%",
            0.90
        ] + ")";
    });
    var nextColor = function() {
        var i = colorIndex;
        colorIndex += 1;
        colorIndex %= colors.length;
        return colors[i];
    };
    var init = function() {
        colorIndex = 0;

        stdout.innerHTML = "";

        resolution = 1000;
        escreen.width  = resolution;
        escreen.height = resolution;
        ctx = escreen.getContext("2d");

        ctx.scale(resolution/100, resolution/100);
        ctx.translate(50, 50);
        ctx.scale(1, -1);
        var turtle = runtime().turtle;
        ctx.moveTo(turtle.x(), turtle.y());
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
    };
    var env = {
        print: function(x) {
            var line = document.createElement("div");
            line.className = "line";
            var text = document.createTextNode(x);
            line.appendChild(text);
            stdout.appendChild(line);
            stdout.scrollTop = stdout.scrollHeight;
        },
        moveBy: function(dx, dy) {
            var turtle = runtime().turtle;
            var x = turtle.x;
            var y = turtle.y;

            var x1 = x();
            var y1 = y();
            var x2 = x1 + dx;
            var y2 = y1 + dy;

            x(x2);
            y(y2);

            ctx.strokeStyle = nextColor();

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
        }
    };

    var getState = ko.computed(function() {
        return runtime().state();
    });

    var playPause = function() {
        if (canPlay()) play();
        else pause();
    };

    var canPlay = ko.computed(function() {
        return getState() !== "playing";
    });

    var notStopped = ko.computed(function() {
        return getState() !== "stopped";
    });

    var state = ko.computed(function() {
        return runtime().state();
    });

    this.canPlay = canPlay;
    this.notStopped = notStopped;
    this.playPause = playPause;
    this.play  = play;
    this.pause = pause;
    this.stop  = stop;
    this.step  = step;
    this.state = state;
}

var $root = new RootVM();
ko.applyBindings($root);
