let canvas;
let ctx;
let world;
let keyboard = new keyboards();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}

window.addEventListener('keydown', (e) => {
    if (e.keycode == 39) {
        keybord.RIGHT = true;
    } else {
        keybord.RIGHT = false;
    }
    if (e.keycode == 37) {
        keybord.LEFT = true;
    } else {
        keybord.LEFT = false;
    }
    if (e.keycode == 32) {
        keybord.SPACE = true;
    } else {
        keybord.SPACE = false;
    }
});

// window.addEventListener('keyup', (e) => {
//     if (e.keycode == 39) {
//         keybord.RIGHT = false;
//     }
//     if (e.keycode == 37) {
//         keybord.LEFT = false;
//     }
//     if (e.keycode == 32) {
//         keybord.SPACE = false;
//     }
// });