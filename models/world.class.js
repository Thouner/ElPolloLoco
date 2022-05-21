class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = new Cloud();
    backgroundObjects = [
        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', -1439, 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/completo.png', -1439, -20),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/completo.png', -1439, -10),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/completo.png', -1439, 0),

        new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0, 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/completo.png', 0, -20),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/completo.png', 0, -10),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/completo.png', 0, 0),

        // new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 1439, 0),
        // new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/completo.png', 1439, -20),
        // new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/completo.png', 1439, -10),
        // new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/completo.png', 1439, 0)
    ]
    canvas;
    ctx; // context
    keyboard;
    camera_x = 0;

    distanceTraveled = 700;
    backgroundWidthToAdd = 1439;

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

        this.addObjectsToMap(this.backgroundObjects); //drawing the backgrounds
        this.addToMap(this.clouds) //drawing the clouds
        this.addToMap(this.character) //drawing the character
        this.addObjectsToMap(this.enemies); //drawing the enemies

        this.ctx.translate(-this.camera_x, 0); //back movement of the camera

        this.addbackground();

        // if (this.character.x == this.distanceTraveled) {
        //     console.log('bin bei ', this.distanceTraveled)
        //     console.log(' einfügen bei ', this.backgroundWidthToAdd)

        //     this.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', this.backgroundWidthToAdd, 0));
        //     this.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/completo.png', this.backgroundWidthToAdd, -20));
        //     this.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/completo.png', this.backgroundWidthToAdd, -10));
        //     this.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/completo.png', this.backgroundWidthToAdd, 0));

        //     this.distanceTraveled = this.distanceTraveled + 700;
        //     this.backgroundWidthToAdd = this.backgroundWidthToAdd + 1439;
        // }


        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    addbackground() {
        if (this.character.x == this.distanceTraveled) {
            console.log('bin bei ', this.distanceTraveled)
            console.log(' einfügen bei ', this.backgroundWidthToAdd)

            this.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', this.backgroundWidthToAdd, 0));
            this.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/completo.png', this.backgroundWidthToAdd, -20));
            this.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/completo.png', this.backgroundWidthToAdd, -10));
            this.backgroundObjects.push(new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/completo.png', this.backgroundWidthToAdd, 0));

            this.distanceTraveled = this.distanceTraveled + 700;
            this.backgroundWidthToAdd = this.backgroundWidthToAdd + 1439;
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