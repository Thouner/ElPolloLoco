class Chicken extends MovableObject {
    height = 80
    width = 80
    Image_Walking = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];
    speed = 0.3 + Math.random() * 0.5;

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png');

        // this.x = 200 + Math.random() * 500;
        this.x = 720 + Math.random() * 160;
        this.y = 350 + Math.random() * 20;

        this.loadImagesArray(this.Image_Walking);
        this.moveLeft(this.speed);
        this.animation(200);

    }


}