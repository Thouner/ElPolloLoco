class Cloud2 extends MovableObject {
    y = 20;
    x = 0;
    height = 495;
    width = 880;
    speed = 0.3;

    constructor(x) {
        super().loadImage('beach/game_background_4/layers/cloud.png');
        this.x = x;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.walkleft(this.speed);
        }, 1000 / 60);
    }

}