let canvas;
let ctx;
let character = new MovableObject();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // character.src = '../img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-13.png'
    // ctx.drawImage(character, 20, 20, 30, 100);
    console.log(character);
}