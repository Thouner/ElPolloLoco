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
    walking_sound = new Audio('audio/walk.mp3');



    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.x = 0
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
            this.walking_sound.pause();
            this.walking_sound.playbackRate = 2.2;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += 5;
                this.otherDierection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -600) {
                this.x -= 5;
                this.otherDierection = true;
                this.walking_sound.play();
            }


            this.world.camera_x = -this.x + 100;



        }, 1000 / 60);

        /**
         * Play the animation only when you press a key
         */
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation
                this.animationRepeat();
            }
        }, 80);
    }

    jump() {

    }
}