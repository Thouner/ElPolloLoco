class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 720;
    constructor() {
        super().loadImages('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = 50;

        this.changeXValue();
    }
    changeXValue() {
        setInterval(() => {
            this.x -= 0.5;
        }, 1000 / 60);
    }

}