class World {
    character = new Character();
    level = level1;

    canvas;
    ctx; // context
    keyboard;
    camera_x = 0;



    distanceTraveled = 400;
    backgroundWidthToAdd1png = 880;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        // this.canvas.width = innerWidth;
        // this.canvas.height = innerHeight;
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

        this.addObjectsToMap(this.level.sky) //drawing the clouds
        this.addObjectsToMap(this.level.clouds) //drawing the clouds
        this.addObjectsToMap(this.level.backgroundObjects); //drawing the backgrounds
        this.addObjectsToMap(this.level.treasure); //drawing the treasure
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
            this.level.backgroundObjects.push(new BackgroundObject('beach/game_background_2/layers/sea.png', this.backgroundWidthToAdd1png));
            this.level.backgroundObjects.push(new BackgroundObject('beach/game_background_2/layers/island.png', this.backgroundWidthToAdd1png));
            this.level.backgroundObjects.push(new BackgroundObject('beach/game_background_2/layers/land.png', this.backgroundWidthToAdd1png));
            this.level.backgroundObjects.push(new BackgroundObject('beach/game_background_2/layers/decor.png', this.backgroundWidthToAdd1png));
            this.level.sky.push(new Sky('beach/game_background_2/layers/sky.png', this.backgroundWidthToAdd1png));

            this.distanceTraveled = this.distanceTraveled + 400;
            this.backgroundWidthToAdd1png = this.backgroundWidthToAdd1png + 880;
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