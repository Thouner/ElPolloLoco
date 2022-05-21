let canvas;
let world;
let keyboard = new Keyboard();

/**
 * canvas initiate
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * key pressed = true
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;

    }
});

/**
 * key released = false
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});