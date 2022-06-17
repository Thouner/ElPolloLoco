class World {
    character = new Character();
    level = level1;
    canvas;
    ctx; // context
    keyboard;
    camera_x = 0;
    throwBombTime;


    throwableObject = [];


    statusBar = new StatusBar();
    moneyBar = new MoneyBar();
    ammoBar = new AmmoBar();

    distanceTraveled = 400;
    backgroundWidthToAdd1png = 880;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        // this.canvas.width = innerWidth;
        // this.canvas.height = innerHeight;
    }


    /**
     * pass "world" in character
     */
    setWorld() {
        this.character.world = this;
        this.level.endboss.world = this;
        // this.throwableObject.world = this;
    }



    checkCollisions() {
        setInterval(() => {

            this.level.enemies.forEach((enemy, index) => {
                if (this.character.isCollidingEnemies(enemy)) {
                    if (this.character.attackEnemy) {
                        this.level.enemies[index].setEnemyDead();
                        setTimeout(() => {
                            this.level.enemies.splice(index, 1);
                        }, 20000);
                    } else {
                        if (!this.level.enemies[index].enemyDead) {
                            this.character.hit(2);
                            this.statusBar.setPercentage(this.character.energy);
                        }
                    }
                }
            });

            this.level.endboss.forEach((boss) => {
                if (this.character.isCollidingEnemies(boss)) {
                    this.character.hit(4);
                    this.statusBar.setPercentage(this.character.energy);
                }
            });

            this.level.treasure.forEach((treas, index) => {
                if (this.character.isCollidingThings(treas)) {
                    this.character.collectTreasure();
                    this.level.treasure.splice(index, 1);
                }
            });




            //throw the bomb
            if (this.keyboard.SHIFT && !this.character.isDead()) {
                if (!this.throwBombTime) {
                    this.throwThebomb();
                } else {
                    let delta = Date.now();
                    delta = delta - this.throwBombTime;
                    if (delta > 2000) {
                        this.throwThebomb();
                    }
                }
            }



        }, 100);

    }

    throwThebomb() {

        this.throwBombTime = Date.now();
        let bomb = new ThrowableObject(this.character.x, this.character.y, this.character.otherDierection, this);
        // bomb.world = this;
        this.throwableObject.push(bomb);


    }

    /**
     * draw the world
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) //erase the world


        this.addObjectsToMap(this.level.sky) //drawing the clouds
        this.addObjectsToMap(this.level.clouds) //drawing the clouds

        this.ctx.translate(this.camera_x, 0); //movement of the camera

        this.addObjectsToMap(this.level.backgroundObjects); //drawing the backgrounds
        this.addObjectsToMap(this.level.treasure); //drawing the treasure
        this.addObjectsToMap(this.throwableObject); //drawing the bomb
        this.addToMap(this.character) //drawing the character
        this.addObjectsToMap(this.level.enemies); //drawing the enemies
        this.addObjectsToMap(this.level.endboss); //drawing the endboss

        this.ctx.translate(-this.camera_x, 0); //back movement of the camera

        this.addBackGround();

        this.drawStatusBar(this.character.energy);
        this.addToMap(this.statusBar);

        this.drawNumber(85, this.character.treasure, '#ECBC00');
        this.addToMap(this.moneyBar);

        this.drawNumber(130, '159', '#6B98A7');
        this.addToMap(this.ammoBar);



        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    /**
     * background extension from a certain distance
     */
    addBackGround() {
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
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDierection) {
            this.flipImageBack(mo);
        }
    }


    drawStatusBar(breite) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(30, 12.5, 225, 35);

        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(30, 12.5, 225, 35);

        this.ctx.fillStyle = '#D84920'
        this.ctx.fillRect(30, 17.5, (breite * 2.2), 25)
    }




    drawNumber(y, text, color) {
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, 70, y);
    }

    // drawNummber(mo) {
    //     mo.draw(this.ctx);
    //     setInterval(() => {
    //         mo.drawMoneyNumber(this.ctx);
    //     }, 200);
    // }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}