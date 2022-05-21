class Cloud extends MovableObject {
    y = 20;
    x = 0;
    height = 495;
    width = 880;


    constructor() {
        super().loadImage('beach/game_background_2/layers/cloud.png');

        this.animate();
    }
    animate() {
        this.moveLeft(0.3);
    }

}