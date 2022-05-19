let canvas;
let ctx;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);


    // console.log('my character is ', world['character'], ' and ', world.enemies); 
    // console.log('my character is ', world.character); ist das gleiche
}