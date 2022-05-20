class Character extends MovableObject {
    height = 300
    width = 210
    Image_Walking = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ];


    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.x = 50
        this.y = 150
        this.loadImagesArray(this.Image_Walking);
        this.moveRight(0.7);
        this.animation(150);
    }



    jump() {

    }
}

// animation() {
//     setInterval(() => {
//         let i = this.currentImage % this.Image_Walking.length; // i = 0,1,2,3,4,5,6,0,1,2,3,4,5,6,...
//         let path = this.Image_Walking[i];
//         this.img = this.imageCache[path]
//         this.currentImage++;
//               }, 200);
// }