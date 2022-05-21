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
    world;

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.x = 100
        this.y = 150
        this.loadImagesArray(this.Image_Walking);


        this.moveRight(0);

        this.animationCharater(150);
    }

    /**
     * animation of the character
     */
    animationCharater() {

        /**
         * movement of the character and the background
         */
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += 5;
                this.otherDierection = false;
            }
            if (this.world.keyboard.LEFT) {
                this.x -= 5;
                this.otherDierection = true;
            }

            this.world.camera_x = -this.x;


        }, 1000 / 60);

        /**
         * Play the animation only when you press a key
         */
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation
                let i = this.currentImage % this.Image_Walking.length; // i = 0,1,2,3,4,5,6,0,1,2,3,4,5,6,...
                let path = this.Image_Walking[i];
                this.img = this.imageCache[path]
                this.currentImage++;
            }
        }, 80);
    }

    jump() {

    }
}