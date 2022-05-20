class Cloud extends MovableObject {
    y = 20;
    x = 0;
    height = 250;
    width = 1440;



    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/Completo.png');

        this.animate();
    }
    animate() {
        this.moveLeft(0.3);
    }




}