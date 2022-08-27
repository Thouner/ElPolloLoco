class FunctionForWorld {
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
            // this.level.enemies.forEach(enemy => {
            //     // enemy.setEnemyDead();
            //     enemy.enemyWalk = false;
            // });
            setTimeout(() => {
                this.audio[0].pause();
                this.audio[1].volume = 0.2;
                this.audio[1].play();
                this.displayWinScreen();
            }, 1000);
        }
    }


    /**
     * play the music when the game is won
     */
    playTheWinSound() {
        if (this.playWinSound) {
            this.audio[2].play();
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
            this.audio[3].play();
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
            this.audio[0].pause();
            this.audio[1].volume = 0.2;
            this.audio[1].play();
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
            this.audio[0].pause();
            this.audio[1].volume = 0.2;
            this.audio[1].play();
            if (!this.showEndScreeen) {
                document.getElementById('loseScreen').classList.remove('d-none')
                document.getElementById('loseScreen').classList.add('d-flex')
                this.showEndScreeen = true;
            }
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
        clearInterval(this.level.plusscloud);
        this.level.clouds.forEach(cloud => {
            clearInterval(cloud.animate);
        });
        this.level = null;
        this.level = level2;
        this.camera_x = 0
        this.character.x = 0;
        this.character.treasure = 0;
        this.level.endboss[0].bossEnergy = 100;
        this.level.endboss[0].bossWalk = false;
        if (this.character.bombs < 5) {
            this.character.bombs = 5;
        }
        this.showGrave = false;
    }


    /**
     * diplay the tombstone
     */
    showTheTombstone() {
        setTimeout(() => {
            this.audio[1].pause();
            this.audio[1].muted = true;
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
            if (this.showThunder) {
                this.audio[4].play();
            }
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
            clearInterval(this.character.movementsOfCharacter);
            this.character = new Character(this.characterSelectionWorld, this, 'zomie');
            this.character.gameOver = false;
            this.character.dieTime = 7;
            this.character.energy = 100;
            this.orkDistance = 400;
            this.orkMultiplikator = 1;
            this.addOrk();
        }, 2000);
    }
}