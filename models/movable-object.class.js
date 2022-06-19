class MovableObject extends DrawableObject {

    otherDierection = false;
    speedY = 0;
    acceleration = 2.5;
    enemyIndex = Math.floor(Math.random() * (3 - 1 + 1) + 1);

    characterSelection = 2;

    lastHit = 0;
    lastAtack = 0;
    attackEnemy = false;
    attackTime;


    energy = 100;

    applyGravity(groundHight) {

        setInterval(() => {
            if (this.isAboveGround(groundHight) || this.speedY > 0) {
                this.y -= this.speedY;
                this.yBox -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround(groundHight) {
        if (this instanceof Enemies || Endboss) {
            if (this.enemyDead) {
                return true
            }
        }
        return this.y < groundHight;
    }


    hit(damages) {
        this.energy -= damages;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    attack() {
        if (this.world.keyboard.STRG) {
            if (!this.attackTime) {
                this.setAttackTimer();
            } else {
                let delta = Date.now();
                delta = delta - this.attackTime;
                if (delta > 1500) {
                    this.setAttackTimer();
                }
            }
        }

    }


    setAttackTimer() {
        this.attackTime = Date.now();
        this.attackEnemy = true;
        this.lastAtack = new Date().getTime();
        setTimeout(() => {
            this.attackEnemy = false;
        }, 1000);
    }


    isAttack() {
        let timepassed = new Date().getTime() - this.lastAtack;
        timepassed = timepassed / 1000;

        return timepassed < 1.0;
    }


    isDead() {
        return this.energy == 0;
    }


    // character.isColliding(enemie);
    isCollidingEnemies(mo) {

        if (
            // no collision
            this.x + 40 > mo.x + 120 + mo.width - 240 ||
            this.x + 40 + this.width - 170 < mo.x + 120 ||
            this.y + 65 > mo.y + 130 + mo.height - 170 ||
            this.y + 65 + this.height - 90 < mo.y + 130) {
            return false;
        } else {
            // collision detected!
            return true;
        }
    }

    isCollidingAttackEnemies(mo) {
        if (
            // no collision
            this.x + 40 > mo.x + 120 + mo.width - 240 ||
            this.x + 40 + this.width - 90 < mo.x + 120 ||
            this.y + 65 > mo.y + 130 + mo.height - 170 ||
            this.y + 65 + this.height - 90 < mo.y + 130) {
            return false;
        } else {
            // collision detected!
            return true;
        }

    }


    isCollidingAttackBoss(mo) {
        if (
            // no collision
            this.x + 40 > mo.x + 270 + mo.width - 550 ||
            this.x + 40 + this.width - 170 < mo.x + 270 ||
            this.y + 65 > mo.y + 270 + mo.height - 370 ||
            this.y + 65 + this.height - 90 < mo.y + 270) {
            return false;
        } else {
            // collision detected!
            return true;
        }

    }


    isCollidingBoss(mo) {
        if (
            // no collision
            this.x + 40 > mo.x + 270 + mo.width - 550 ||
            this.x + 40 + this.width - 170 < mo.x + 270 ||
            this.y + 65 > mo.y + 270 + mo.height - 370 ||
            this.y + 65 + this.height - 90 < mo.y + 270) {
            return false;
        } else {
            // collision detected!
            return true;
        }
    }


    // character.isColliding(treaser);
    isCollidingThings(mo) {

        if ((this.x + 40) + (this.width - 170) > mo.x &&
            (this.y + 65) + (this.height - 90) > mo.y &&
            this.x + 40 < mo.x + mo.width - 60 &&
            this.y + 65 < mo.y + mo.height) {
            // collision detected!
            return true;

        } else {
            // no collision
            return false;
        }

    }


    isCollidingBombs(mo) {
        if ((this.x + 40) + (this.width - 170) > (mo.x + 100) &&
            (this.y + 65) + (this.height - 90) > (mo.y + 100) &&
            (this.x + 40) < (mo.x + 100) + (mo.width - 200) &&
            (this.y + 65) < (mo.y + 100) + (mo.height - 200)) {
            // collision detected!
            return true;
        } else {
            // no collision
            return false;
        }

    }


    isCollidingThrowBomb(mo) {
        if ((this.x + 100) + (this.width - 200) > mo.x + 120 &&
            (this.y + 100) + (this.height - 200) > mo.y + 130 &&
            this.x + 100 < mo.x + 120 + mo.width - 280 &&
            this.y + 100 < mo.y + 130 + mo.height - 170) {
            // collision detected!
            return true;
        } else {
            // no collision
            return false;
        }
    }


    isCollidingBossThrowBomb(mo) {
        if ((this.x + 100) + (this.width - 200) > mo.x + 270 &&
            (this.y + 100) + (this.height - 200) > mo.y + 270 &&
            this.x + 100 < mo.x + 270 + mo.width - 550 &&
            this.y + 100 < mo.y + 270 + mo.height - 370) {
            // collision detected!
            return true;
        } else {
            // no collision
            return false;
        }
    }


    jumpsOnTop(mo) {
        return this.y + 40 + this.height - 90 > mo.y + 130 &&
            this.y + 65 + this.height - 90 < mo.y + 130 + mo.height - 170 &&
            this.x + 40 + this.width - 170 > mo.x + 120 &&
            this.x + 40 + this.width - 170 < (mo.x + 120 + mo.width - 280);
    }


    /**
     * run through the individual images of the animation
     */
    animationRepeat(animationArray) {
        let i = this.currentImage % animationArray.length; // i = 0,1,2,3,4,5,6,0,1,2,3,4,5,6,...
        let path = animationArray[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }


    walkRight(walkspeed) {
        this.x += walkspeed;
        this.xBox += walkspeed;
        this.otherDierection = false;
    }


    walkleft(walkspeed) {
        this.x -= walkspeed;
        this.xBox -= walkspeed;
        this.otherDierection = true;
    }


    jump() {
        this.speedY = 32;
    }
}