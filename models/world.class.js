class World {
    character;
    level = level1;
    canvas;
    ctx; // context
    keyboard;
    camera_x = 0;
    throwBombTime;
    randomNumber;
    insultBar = true;
    orkDistance = 400;
    orkMultiplikator = 1;
    showGrave = false;
    showWinMoney = false;
    characterSelectionWorld;
    winMoney;
    graveyard;
    showThunder = false;
    throwableObject = [];
    movableObject = new MovableObject();
    insult = new Insults();
    statusBar = new StatusBar();
    moneyBar = new MoneyBar();
    ammoBar = new AmmoBar();
    thunder = new Thunder();
    distanceTraveled = 400;
    backgroundWidthToAdd1png = 880;


    constructor(canvas, keyboard, number) {
        this.ctx = canvas.getContext('2d');
        this.characterSelectionWorld = number;
        this.character = new Character(this.characterSelectionWorld);
        this.character.characterSelection = number;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollekting();
    }


    /**
     * pass "world" in character
     */
    setWorld() {
        this.character.world = this;
        this.level.endboss.world = this;
        this.movableObject = this;
    }



    checkCollekting() {
        setInterval(() => {
            this.level.treasure.forEach((treas, index) => {
                if (this.character.isCollidingEnemies(treas)) {
                    this.character.collectTreasure();
                    this.level.treasure.splice(index, 1);
                }
            });


            this.level.bomb.forEach((bomb, index) => {
                if (this.character.isCollidingEnemies(bomb)) {
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
            this.addGrave();
            this.setFullScreen();
            this.goReturn();
            this.goEnemies();
            this.gameWinning();
            this.attackBoss();
            this.addOrk();
        }, 100);

    }

    throwThebomb() {
        if (this.character.bombs > 0) {
            this.character.minusBombs();
            this.throwBombTime = Date.now();
            let bomb = new ThrowableObject(this.character.x, this.character.y, this.character.otherDierection, this);
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
        this.addObjectsToMap(this.level.goldChest); //drawing the bomb
        this.addObjectsToMap(this.level.leftoverMeat); //drawing the meat
        this.addObjectsToMap(this.throwableObject); //drawing the throw bomb
        if (!this.showGrave) {
            this.addToMapCharacter(this.character) //drawing the character
        }
        this.addObjectsToMap(this.level.enemies); //drawing the enemies
        this.addObjectsToMap(this.level.endboss); //drawing the endboss


        if (this.character.isAttack()) {
            if (!this.randomNumber)
                this.randomNumber = Math.floor(Math.random() * (15 - 0 + 1) + 0);
            this.drawInsultBar();
        } else {
            this.randomNumber = null;
        }
        if (this.showGrave) {
            this.graveyard = new Graveyard(this.character.x, this.character.y);
            this.addToMap(this.graveyard); //drawing the graveyard
        }
        if (this.character.gameWon) {
            this.winMoney = new MacGuffin(this.character.x, this.character.y);
            this.addToMap(this.winMoney); //drawing the graveyard
        }
        if (this.showThunder) {
            this.addToMap(this.thunder); //drawing the thunder
        }

        this.ctx.translate(-this.camera_x, 0); //back movement of the camera

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


    addOrk() {
        if (!this.level.endboss[0].bossWalk && this.level.enemies.length < 10) {
            this.level.enemies.push(new Enemies(400 + this.orkDistance * this.orkMultiplikator));
            this.orkMultiplikator += 1;
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

    addToMapCharacter(mo) {

        if (mo.otherDierection) {
            this.flipCharacter(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDierection) {
            this.flipImageBack(mo);
        }

    }

    drawStatusBar(widthText) {
        if (this.character.characterSelection == 2) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(30, 12.5, 181, 35);

            this.ctx.strokeStyle = 'D84920';
            this.ctx.strokeRect(30, 12.5, 181, 35);

            if (widthText > 66) {
                this.ctx.fillStyle = 'green';
            } else if (widthText > 33 && widthText <= 66) {
                this.ctx.fillStyle = 'orange';
            } else {
                this.ctx.fillStyle = 'red';
            }
            this.ctx.fillRect(30, 17.5, (widthText * 2.2), 25)
        } else {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(30, 12.5, 225, 35);

            this.ctx.strokeStyle = '#D84920';
            this.ctx.strokeRect(30, 12.5, 225, 35);

            if (widthText > 66) {
                this.ctx.fillStyle = 'green';
            } else if (widthText > 33 && widthText <= 66) {
                this.ctx.fillStyle = 'orange';
            } else {
                this.ctx.fillStyle = 'red';
            }

            this.ctx.fillRect(30, 17.5, (widthText * 2.2), 25)
        }
    }

    drawInsultBar(text) {
        let randomText = this.insult.insults[this.randomNumber];
        let textLength = randomText.length;
        this.ctx.fillStyle = 'rgba(255,255,255,0.7)';
        this.ctx.fillRect(this.character.x, this.character.y + 30, textLength * 10.2, 35);
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(randomText, this.character.x + 5, this.character.y + 55);
        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(this.character.x, this.character.y + 30, textLength * 10.2, 35);
    }


    drawBossStatusBar(widthText) {
        if (this.level.endboss[0].bossWalk) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(this.canvas.width - 30, 12.5, -225, 35);
            this.ctx.strokeStyle = 'red';
            this.ctx.strokeRect(this.canvas.width - 30, 12.5, -225, 35);
            this.ctx.fillStyle = '#000'
            this.ctx.fillRect(this.canvas.width - 30, 17.5, -(widthText * 2.2), 25)
        }
    }


    drawNumber(y, text, color) {
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, 70, y);
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipCharacter(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width - 90, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    gameWinning() {
        if (this.level.endboss[0].bossisDead && this.character.x > 2900) {

            // console.log('gewonnen');
            this.character.gameWon = true;
            this.level.enemies.forEach(enemy => {
                enemy.setEnemyDead();
            });
            // this.removeOrks;
            setTimeout(() => {
                document.getElementById('winScreen').classList.remove('d-none')
                document.getElementById('winScreen').classList.add('d-flex')
                document.getElementById('coinNumber').innerHTML = `You have ${this.character.treasure} Points`;

            }, 1000);
        }
    }

    // removeOrks = setTimeout(() => {
    //     this.level.enemies = [];
    //     setTimeout(() => {
    //         clearTimeout(removeOrks);
    //     }, );
    // }, 20000);

    attackBoss() {
        if (!this.level.endboss[0].bossisDead && this.level.endboss[0].x - this.character.x <= -15 && this.character.energy > 0) {
            this.level.endboss[0].bossAttack = true;
            this.level.endboss[0].speed = 0;
            setTimeout(() => {
                if (this.level.endboss[0].x - this.character.x <= -15) {
                    this.character.hit(2);
                }
            }, 1300);
        } else if (!this.level.endboss[0].bossisDead && this.level.endboss[0].bossWalk) {
            setTimeout(() => {
                this.level.endboss[0].bossWalk = true;
                this.level.endboss[0].bossAttack = false;
                if (this.level.endboss[0].bossEnergy >= 51) {
                    this.level.endboss[0].speed = 0.7;
                } else if (this.level.endboss[0].bossEnergy < 51) {
                    this.level.endboss[0].speed = 2;
                }

            }, 1700);
        }
    }


    goEnemies() {
        if (this.character.x > 0) {
            this.level.enemies.forEach(enemy => {
                enemy.enemyWalk = true;
            });
        }
    }


    goReturn() {
        if (this.keyboard.RETURN) {
            location.reload()
        }

    }

    setFullScreen() {
        if (this.keyboard.F) {
            document.getElementById('canvas_container').requestFullscreen();
        }
    }

    addGrave() {
        if (this.character.gameOver && !this.showGrave) {
            setTimeout(() => {
                this.showGrave = true;
            }, 1200);

            setTimeout(() => {
                document.getElementById('loseScreen').classList.remove('d-none')
                document.getElementById('loseScreen').classList.add('d-flex')
            }, 2000);
        }
    }

    undeadGame() {
        console.log('Undead start');
        document.getElementById('loseScreen').classList.add('d-none')
        document.getElementById('loseScreen').classList.remove('d-flex')
        this.level = level2;
        this.character.x = 0;
        this.showGrave = false;
        setTimeout(() => {
            this.showGrave = true;
        }, );
        setTimeout(() => {
            this.showThunder = true;
            this.characterSelectionWorld = 3;
            this.character.characterSelection = 3;
        }, 3000);
        setTimeout(() => {
            this.showThunder = false;
            this.character.gameOver = false;
            this.character.dieTime = 7;
            this.character.energy = 100;
            this.showGrave = false;
        }, 4000);
    }
}