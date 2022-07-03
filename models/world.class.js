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
    playWinSound = true;
    playDeadSound = true;
    background_sound = new Audio('audio/bgSound.mp3');
    end_sound = new Audio('audio/endSound.mp3');
    win_sound = new Audio('audio/win.mp3');
    dead_sound = new Audio('audio/playerDead.mp3');



    /**
     * draw the world
     * 
     * @param {string} canvas - Content for the canvas
     * @param {class} keyboard - class for the keys or buttons that are pressed
     * @param {number} number - number of selected character
     */
    constructor(canvas, keyboard, number) {
        this.ctx = canvas.getContext('2d');
        this.characterSelectionWorld = number;
        this.character = new Character(this.characterSelectionWorld, this);
        this.character.characterSelection = number;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.playBgSound();
        this.background_sound.play();
        this.draw();
        this.setWorld();
        this.checkInteraction();
        this.keyboard.touchPress();
    }


    /**
     * play the background music
     */
    playBgSound() {
        if (typeof this.background_sound.loop == 'boolean') {
            this.background_sound.loop = true;
        } else {
            this.background_sound.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
                this.volume = 0.2;
            }, false);
        }
        this.background_sound.play();
    }


    /**
     * inserting "world" in another class
     */
    setWorld() {
        this.level.endboss.world = this;
        this.movableObject = this;
    }


    checkInteraction() {
        setInterval(() => {
            this.collectCoins();
            this.collectBomb();
            this.timerForBomb();
            this.addGrave();
            this.setFullScreen();
            this.goReturn();
            this.goEnemies();
            this.gameWinning();
            this.attackBoss();
            this.addOrk();
        }, 100);

    }


    /**
     * collect the coins
     */
    collectCoins() {
        this.level.treasure.forEach((treas, index) => {
            if (this.character.isCollidingEnemies(treas)) {
                this.character.collectTreasure();
                this.level.treasure.splice(index, 1);
            }
        });
    }


    /**
     * collect the bombs
     */
    collectBomb() {
        this.level.bomb.forEach((bomb, index) => {
            if (this.character.isCollidingEnemies(bomb)) {
                this.character.collectBombs();
                this.level.bomb.splice(index, 1);
            }
        });

    }


    /**
     * timer for next bomb
     */
    timerForBomb() {
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
    }


    /**
     * throw the next bomb
     */
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
        this.addSkyObjekts();
        this.ctx.translate(this.camera_x, 0); //movement of the camera
        this.objectsThatMove();
        this.ctx.translate(-this.camera_x, 0); //back movement of the camera
        this.addBars();
        this.selfDraw();
    }


    /**
     * add the objects that move
     */
    objectsThatMove() {
        this.addLevelObjekts();
        this.addObjectsToMap(this.throwableObject); //drawing the throw bomb
        this.addCharacter();
        this.addEnemies();
        this.showInsultBar();
        this.addTheGrave();
        this.addGold();
        this.addthunder();
    }


    /**
     * adding the tombstone
     */
    addTheGrave() {
        if (this.showGrave) {
            this.graveyard = new Graveyard(this.character.x, this.character.y);
            this.addToMap(this.graveyard); //drawing the graveyard
        }
    }


    /**
     * draw() is called again and again
     */
    selfDraw() {
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    /**
     * adding the sky
     */
    addSkyObjekts() {
        this.addObjectsToMap(this.level.sky) //drawing the clouds
        this.addObjectsToMap(this.level.clouds) //drawing the clouds

    }


    /**
     * add the character
     */
    addCharacter() {
        if (!this.showGrave) {
            this.addToMapCharacter(this.character) //drawing the character
        }
    }


    /**
     * add the enemies
     */
    addEnemies() {
        this.addObjectsToMap(this.level.enemies); //drawing the enemies
        this.addObjectsToMap(this.level.endboss); //drawing the endboss
    }


    /**
     * add the level objects
     */
    addLevelObjekts() {
        this.addObjectsToMap(this.level.backgroundObjects); //drawing the backgrounds
        this.addObjectsToMap(this.level.treasure); //drawing the treasure
        this.addObjectsToMap(this.level.bomb); //drawing the bomb
        this.addObjectsToMap(this.level.goldChest); //drawing the bomb
        this.addObjectsToMap(this.level.leftoverMeat); //drawing the meat
    }


    /**
     * add the insult bar
     */
    showInsultBar() {
        if (this.character.isAttack()) {
            if (!this.randomNumber)
                this.randomNumber = Math.floor(Math.random() * (15 - 0 + 1) + 0);
            this.drawInsultBar();
        } else {
            this.randomNumber = null;
        }
    }


    /**
     * add the gold when winning the level
     */
    addGold() {
        if (this.character.gameWon) {
            this.winMoney = new MacGuffin(this.character.x, this.character.y);
            this.addToMap(this.winMoney); //drawing the graveyard
        }
    }


    /**
     *  add the thunder
     */
    addthunder() {
        if (this.showThunder) {
            this.addToMap(this.thunder); //drawing the thunder
        }
    }


    /**
     * add the different bars
     */
    addBars() {
        this.drawStatusBar(this.character.energy);
        this.addToMap(this.statusBar);
        this.drawNumber(85, this.character.treasure, '#ECBC00');
        this.addToMap(this.moneyBar);
        this.drawNumber(130, this.character.bombs, '#6B98A7');
        this.addToMap(this.ammoBar);
        this.drawBossStatusBar(this.level.endboss[0].bossEnergy);
    }


    /**
     * add the orcs
     */
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
     * object drawn in the world and turn it over
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


    /**
     * character drawn in the world and turn him over
     * 
     * @param {class} mo - class to draw in the world
     */
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


    /**
     * draw of character's life bar
     * 
     * @param {number} energy - energy of the character
     */
    drawStatusBar(energy) {
        if (this.character.characterSelection == 2) {
            this.character2StatusBar(energy);
        } else {
            this.character1And3StatusBar(energy);
        }
    }


    /**
     * draw Second character's life bar
     * 
     * @param {number} energy - energy of the character
     */
    character2StatusBar(energy) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(30, 12.5, 181, 35);
        this.ctx.strokeStyle = 'D84920';
        this.ctx.strokeRect(30, 12.5, 181, 35);
        this.changeBarColor(energy);
    }


    /**
     * draw first and third character life bars
     * 
     * @param {number} energy - energy of the character
     */
    character1And3StatusBar(energy) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(30, 12.5, 225, 35);
        this.ctx.strokeStyle = '#D84920';
        this.ctx.strokeRect(30, 12.5, 225, 35);
        this.changeBarColor(energy);
    }


    /**
     * changing the color of the life bar
     * 
     * @param {number} energy - energy of the character
     */
    changeBarColor(energy) {
        if (energy > 66) {
            this.ctx.fillStyle = 'green';
        } else if (energy > 33 && energy <= 66) {
            this.ctx.fillStyle = 'orange';
        } else {
            this.ctx.fillStyle = 'red';
        }
        this.ctx.fillRect(30, 17.5, (energy * 2.2), 25)
    }


    /**
     * draw the insultbar
     */
    drawInsultBar() {
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


    /**
     * draw of the boss's life bar
     * 
     * @param {number} energy - energy of the character
     */
    drawBossStatusBar(energy) {
        if (this.level.endboss[0].bossWalk) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(this.canvas.width - 30, 12.5, -225, 35);
            this.ctx.strokeStyle = 'red';
            this.ctx.strokeRect(this.canvas.width - 30, 12.5, -225, 35);
            this.ctx.fillStyle = '#000'
            this.ctx.fillRect(this.canvas.width - 30, 17.5, -(energy * 2.2), 25)
        }
    }


    /**
     * 
     * 
     * @param {number} y - positioning on the x axis
     * @param {number} number - number to be displayed
     * @param {string} color - color of the number 
     */
    drawNumber(y, number, color) {
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = color;
        this.ctx.fillText(number, 70, y);
    }


    /**
     * rotate object
     * 
     * @param {class} mo - current class to rotate
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * rotate character
     * 
     * @param {class} mo - current class to rotate
     */
    flipCharacter(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width - 90, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * rotate object back
     * 
     * @param {class} mo - current class to rotate
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * game was won
     */
    gameWinning() {
        if (this.level.endboss[0].bossisDead && this.character.x > 2900) {
            this.playTheWinSound();
            this.character.gameWon = true;
            this.level.enemies.forEach(enemy => {
                enemy.setEnemyDead();
            });
            setTimeout(() => {
                this.background_sound.pause();
                this.end_sound.volume = 0.2;
                this.end_sound.play();
                this.displayWinScreen();
            }, 1000);
        }
    }


    /**
     * play the music when the game is won
     */
    playTheWinSound() {
        if (this.playWinSound) {
            this.win_sound.play();
            setTimeout(() => {
                this.playWinSound = false;
            }, 1500);
        }
    }


    /**
     * display the winscreen
     */
    displayWinScreen() {
        document.getElementById('winScreen').classList.remove('d-none')
        document.getElementById('winScreen').classList.add('d-flex')
        document.getElementById('coinNumber').innerHTML = `You have ${this.character.treasure} Points`;
    }


    /**
     * let the boss attack and gets anrage
     */
    attackBoss() {
        if (!this.level.endboss[0].bossisDead && this.level.endboss[0].x - this.character.x <= -15 && this.character.energy > 0) {
            this.bossAttackCharacter();
        } else if (!this.level.endboss[0].bossisDead && this.level.endboss[0].bossWalk) {
            this.increaseBossSpeed();
        }
    }


    /**
     * boss attacks character when standing in front of him
     */
    bossAttackCharacter() {
        this.level.endboss[0].bossAttack = true;
        this.level.endboss[0].speed = 0;
        setTimeout(() => {
            if (this.level.endboss[0].x - this.character.x <= -15) {
                this.character.hit(2);
            }
        }, 1300);
    }


    /**
     * Increase boss speed when power is below 51%
     */
    increaseBossSpeed() {
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


    /**
     * enemy starts movement
     */
    goEnemies() {
        if (this.character.x > 0) {
            this.level.enemies.forEach(enemy => {
                enemy.enemyWalk = true;
            });
        }
    }


    /**
     * reload the page
     */
    goReturn() {
        if (this.keyboard.RETURN) {
            location.reload()
        }

    }


    /**
     * make the game fullscreen
     */
    setFullScreen() {
        if (this.keyboard.F) {
            document.getElementById('canvas_container').requestFullscreen();
        }
    }


    /**
     * character has died
     */
    addGrave() {
        if (this.character.gameOver && !this.showGrave) {
            this.playTheDeadSound();
            if (this.characterSelectionWorld == 3) {
                this.openLoseScreenUndead();
            } else {
                this.openLoseScreenNormal();
            }
        }
    }


    /**
     * play the music when the game is lost
     */
    playTheDeadSound() {
        if (this.playDeadSound) {
            this.dead_sound.play();
            setTimeout(() => {
                this.playDeadSound = false;
            }, 1500);
        }
    }

    /**
     * opens losescreen at character three
     */
    openLoseScreenUndead() {
        setTimeout(() => {
            this.background_sound.pause();
            this.end_sound.volume = 0.2;
            this.end_sound.play();
            document.getElementById('loseScreen').classList.remove('d-none')
            document.getElementById('loseScreen').classList.add('d-flex')
            document.getElementById('undead').classList.add('d-none')
        }, 1500);
    }


    /**
     * opens normal losescreen
     */
    openLoseScreenNormal() {
        setTimeout(() => {
            this.showGrave = true;
        }, 1200);
        setTimeout(() => {
            this.background_sound.pause();
            this.end_sound.volume = 0.2;
            this.end_sound.play();
            document.getElementById('loseScreen').classList.remove('d-none')
            document.getElementById('loseScreen').classList.add('d-flex')
        }, 2000);
    }


    /**
     * start the undead game
     */
    undeadGame() {
        this.initiateNextLevel();
        this.showTheTombstone();
        this.showTheThunder();
        this.startUndeadGame();
    }


    /**
     * initiate the next level
     */
    initiateNextLevel() {
        this.level = level2;
        world.camera_x = 100
        this.character.x = 0;
        this.character.treasure = 0;
        this.level.endboss[0].bossEnergy = 100;
        this.level.endboss[0].bossWalk = false;
        if (this.character.bombs < 5) {
            this.character.bombs = 5;
        }
        this.showGrave = false;
        document.getElementById('loseScreen').classList.add('d-none')
        document.getElementById('loseScreen').classList.remove('d-flex')
    }


    /**
     * diplay the tombstone
     */
    showTheTombstone() {
        setTimeout(() => {
            this.end_sound.pause();
            this.showGrave = true;
        }, 10);
        this.showTheThunder
    }


    /**
     * diplay the lightning
     */
    showTheThunder() {
        setTimeout(() => {
            this.showThunder = true;
        }, 1000);
    }


    /**
     * resetting the variables for the next level
     */
    startUndeadGame() {
        setTimeout(() => {
            this.playBgSound();
            this.showThunder = false;
            this.showGrave = false;
            this.characterSelectionWorld = 3;
            this.character.characterSelection = 3;
            this.character = new Character(this.characterSelectionWorld, this);
            this.character.gameOver = false;
            this.character.dieTime = 7;
            this.character.energy = 100;
            this.level.enemies = [];
            this.orkDistance = 400;
            this.orkMultiplikator = 1;
            this.addOrk();
        }, 2000);
    }

}