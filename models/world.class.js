class World {
    character = new Character();
    level = level1;
    canvas;
    ctx; // context
    keyboard;
    camera_x = 0;
    throwBombTime;
    randomNumber;
    insultBar = true;


    throwableObject = [];

    insult = new Insults();
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

    }



    checkCollisions() {
        setInterval(() => {
            this.level.treasure.forEach((treas, index) => {
                if (this.character.isCollidingThings(treas)) {
                    this.character.collectTreasure();
                    this.level.treasure.splice(index, 1);
                }
            });


            this.level.bomb.forEach((bomb, index) => {
                if (this.character.isCollidingBombs(bomb)) {
                    this.character.collectBombs();
                    this.level.bomb.splice(index, 1);
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
        if (this.character.bombs > 0) {
            this.character.minusBombs();
            this.throwBombTime = Date.now();
            let bomb = new ThrowableObject(this.character.x, this.character.y, this.character.otherDierection, this);
            // bomb.world = this;
            this.throwableObject.push(bomb);
        }

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
        this.addObjectsToMap(this.level.bomb); //drawing the bomb
        this.addObjectsToMap(this.throwableObject); //drawing the throw bomb
        this.addToMap(this.character) //drawing the character
        this.addObjectsToMap(this.level.enemies); //drawing the enemies
        this.addObjectsToMap(this.level.endboss); //drawing the endboss
        if (this.character.isAttack()) {
            if (!this.randomNumber)
                this.randomNumber = Math.floor(Math.random() * (15 - 0 + 1) + 0);
            this.drawInsultBar();
        } else {
            this.randomNumber = null;
        }

        this.ctx.translate(-this.camera_x, 0); //back movement of the camera

        this.addBackGround();

        this.drawStatusBar(this.character.energy);
        this.addToMap(this.statusBar);

        this.drawNumber(85, this.character.treasure, '#ECBC00');
        this.addToMap(this.moneyBar);

        this.drawNumber(130, this.character.bombs, '#6B98A7');
        this.addToMap(this.ammoBar);

        this.drawBossStatusBar(this.level.endboss[0].bossEnergy);



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

    drawInsultBar(text) {
        // let randomNumber = Math.floor(Math.random() * (15 - 0 + 1) + 0);
        let randomText = this.insult.insults[this.randomNumber];
        // console.log(this.insult.Insults);
        // console.log(this.insult.insults[11]);
        let textLength = randomText.length;
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.character.x, this.character.y + 30, textLength * 10.2, 35);

        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(randomText, this.character.x + 5, this.character.y + 55);

        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(this.character.x, this.character.y + 30, textLength * 10.2, 35);


    }


    drawBossStatusBar(breite) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(this.canvas.width - 30, 12.5, -225, 35);

        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(this.canvas.width - 30, 12.5, -225, 35);

        this.ctx.fillStyle = '#000'
        this.ctx.fillRect(this.canvas.width - 30, 17.5, -(breite * 2.2), 25)
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