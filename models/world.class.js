class World {
    character = new Character();
    // enemies = [
    //     new Chicken(),
    //     new Chicken(),
    //     new Chicken()
    // ];
    enemies = new Chicken();


    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        // this.ctx.drawImage(this.enemies.img, this.enemies.x, this.enemies.y, this.enemies.width, this.enemies.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x = 50, enemy.y, enemy.width, enemy.height);

        });

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });


    }
}