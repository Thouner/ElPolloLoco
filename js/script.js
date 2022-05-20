let canvas;
let ctx;
let world;
let keybord = new Keybords();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

}

window.addEventListener('keypress', (e) => {

});