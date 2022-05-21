class Cloud extends MovableObject {
    y = 20;
    x = 0;
    height = 495;
    width = 880;
    speed = 0.3;

    constructor() {
        super().loadImage('beach/game_background_2/layers/cloud.png');

        this.animate();
    }
    animate() {
        setInterval(() => {
            this.walkleft(this.speed);
        }, 1000 / 60);
    }

}