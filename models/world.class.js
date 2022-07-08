class World extends FunctionForWorld {
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
    audio = [
        new Audio('audio/bgSound.mp3'),
        new Audio('audio/endSound.mp3'),
        new Audio('audio/win.mp3'),
        new Audio('audio/playerDead.mp3'),
        new Audio('audio/thunder.mp3'),
        new Audio('audio/walk.mp3'),
        new Audio('audio/jump.mp3'),
        new Audio('audio/attack.mp3'),
        new Audio('audio/collect.mp3'),
        new Audio('audio/hurt.mp3'),
    ]
    showEndScreeen = false;
    lmutetTime;
    lastMute;
    mutPossilble = false;
    soundOn;





    /**
     * draw the world
     * 
     * @param {string} canvas - Content for the canvas
     * @param {class} keyboard - class for the keys or buttons that are pressed
     * @param {number} number - number of selected character
     */
    constructor(canvas, keyboard, number, soundOn) {
        super();
        this.ctx = canvas.getContext('2d');
        this.characterSelectionWorld = number;
        this.character = new Character(this.characterSelectionWorld, this);
        this.character.characterSelection = number;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.playBgSound();
        this.draw();
        this.setWorld();
        this.checkInteraction();
        this.keyboard.touchPress();
        this.soundOn = soundOn;
        this.muteAudio();

    }


    muteAudio() {
        if (!this.soundOn) {
            for (let i = 0; i < this.audio.length; i++) {
                const element = this.audio[i];
                element.muted = true;
            }

        } else {
            for (let i = 0; i < this.audio.length; i++) {
                const element = this.audio[i];
                element.muted = false;
            }
        }
    }


    letMute() {
        setInterval(() => {
            if (keyboard.Q) {
                if (!mutetTime) {
                    muteTimer();
                } else {
                    let delta = Date.now();
                    delta = delta - mutetTime;
                    if (delta > 200) {
                        muteTimer();
                    }
                }
            }
        }, 200);
    }


    /**
     * play the background music
     */
    playBgSound() {
        if (typeof this.audio[0].loop == 'boolean') {
            this.audio[0].loop = true;
        } else {
            this.audio[0].addEventListener('ended', function() {
                this.currentTime = 0;
                audioVolume();
                this.play();
            }, false);
        }
        this.audio[0].play();
    }


    /**
     * inserting "world" in another class
     */
    setWorld() {
        this.level.endboss.world = this;
        this.movableObject = this;
    }


    /**
     * querying interactions
     */
    checkInteraction() {
        setInterval(() => {
            // this.muteAudio();
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


    // muteAudio() {
    //     if (this.keyboard.Q)
    //         this.audio.forEach(sound => {
    //             sound.muted = !sound.muted;
    //         });
    // }


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
}