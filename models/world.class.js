class World {
    character = new Character();
    level = level1;

    canvas;
    ctx; // context
    keyboard;
    camera_x = 0;

    distanceTraveled = 700;
    backgroundWidthToAdd1png = 1440;
    backgroundWidthToAdd2png = 2160;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

    }

    /**
     * pass "world" in character
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * draw the world
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) //erase the world

        this.ctx.translate(this.camera_x, 0); //movement of the camera

        this.addObjectsToMap(this.level.backgroundObjects); //drawing the backgrounds
        this.addObjectsToMap(this.level.clouds) //drawing the clouds
        this.addToMap(this.character) //drawing the character
        this.addObjectsToMap(this.level.enemies); //drawing the enemies

        this.ctx.translate(-this.camera_x, 0); //back movement of the camera

        this.addbackground();

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * background extension from a certain distance
     */
    addbackground() {
        if (this.character.x == this.distanceTraveled) {
            console.log('bin bei ', this.distanceTraveled)
            console.log(' einfügen bei ', this.backgroundWidthToAdd1png)
            console.log(' einfügen bei ', this.backgroundWidthToAdd2png)

            this.level.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', this.backgroundWidthToAdd1png, 0));
            this.level.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', this.backgroundWidthToAdd2png, 0));
            this.level.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', this.backgroundWidthToAdd1png, -30));
            this.level.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', this.backgroundWidthToAdd2png, -30));
            this.level.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', this.backgroundWidthToAdd1png, -20));
            this.level.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', this.backgroundWidthToAdd2png, -20));
            this.level.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', this.backgroundWidthToAdd1png, 0));
            this.level.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', this.backgroundWidthToAdd2png, 0));

            this.distanceTraveled = this.distanceTraveled + 1400;
            this.backgroundWidthToAdd1png = this.backgroundWidthToAdd1png + 1440;
            this.backgroundWidthToAdd2png = this.backgroundWidthToAdd2png + 1440;
        }
    }

    /**
     * draw each object from an array
     * 
     * @param {array} objectes - objects that occur multiple times in the world
     */
    addObjectsToMap(objectes) {
        objectes.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * object drawn in the world
     * 
     * @param {class} mo - class to draw in the world
     */
    addToMap(mo) {
        if (mo.otherDierection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDierection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }



}