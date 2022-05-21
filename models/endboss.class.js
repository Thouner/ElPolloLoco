class Endboss extends MovableObject {
    height = 400
    width = 400
    Image_Walking = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png',
    ];

    speed = 0.7;
    walking_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png');

        this.x = 720;
        this.y = 60;

        this.loadImagesArray(this.Image_Walking);
        this.moveLeft(this.speed);
        this.animation(200);
        this.walking_sound.volume = 0.2;
        this.walking_sound.loop = true;
        // this.walking_sound.play();
    }





}