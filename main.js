let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let COLOR_WHITE = '#ecf0f1';
let COLOR_BLACK = '#34495e';
let BOX = 10;
let play = false;
let map = [];

function init() {

    for(let v = 0; v < 70; v++) {
        map[v] = [];
        for (let h = 0; h < 100; h++) {
            map[v][h] = 0;
        }
    }

    canvas.addEventListener("click", (event) => {
        let v = Math.floor(event.offsetY / BOX);
        let h = Math.floor(event.offsetX / BOX);
        map[v][h] = 1;
    })


    tic();
}

function tic() {
    draw();
    if (play) {
        calculate()
    }

    setTimeout(tic, 1000/20);
}

function calculate() {
    let k = 0;
    let new_map = [];
    for (let v = 0; v < map.length; v++) {
        new_map[v] = [];

        for (let h = 0; h < map[v].length; h++) {
            new_map[v][h] = 0

            let neighbours = 0;
            if (v - 1 > 0 && v + 1 < map.length) {
                if (h - 1 > 0 && h + 1 < map.length) {
                    k++
                    neighbours += map[v - 1][h - 1]
                    neighbours += map[v - 1][h]
                    neighbours += map[v - 1][h + 1]

                    neighbours += map[v][h - 1]
                    neighbours += map[v][h + 1]

                    neighbours += map[v + 1][h - 1]
                    neighbours += map[v + 1][h]
                    neighbours += map[v + 1][h + 1]

                    if (map[v][h]) {
                        if (neighbours < 2 || neighbours > 3) {
                            new_map[v][h] = 0
                        } else {
                            new_map[v][h] = 1
                        }
                    } else {
                        if (neighbours === 3) {
                            new_map[v][h] = 1
                        }
                    }
                }
            }
        }
    }
    map = [...new_map];
}

function draw() {
    for (let v = 0; v < map.length; v++) {
        for (let h = 0; h < map[v].length; h++) {
            if (map[v][h]) {
                ctx.fillStyle = COLOR_BLACK;
            } else {
                ctx.fillStyle = COLOR_WHITE;
            }
            ctx.fillRect(h * BOX, v * BOX, BOX, BOX);
        }
    }
}

function play_stop() {
    play = !play;
}

init()