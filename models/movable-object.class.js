class MovableObject extends DrawableObject {

    otherDierection = false;
    speedY = 0;
    acceleration = 2.5;
    enemyIndex = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    world;
    // characterSelection = 2;

    lastHit = 0;
    lastAtack = 0;
    attackEnemy = false;
    attackTime;


    energy;

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
            this.x + this.offSetX > mo.x + mo.offSetX + mo.width - mo.offSetWidth ||
            this.x + this.offSetX + this.width - this.offSetWidth < mo.x + mo.offSetX ||
            this.y + this.offSetY > mo.y + mo.offSetY + mo.height - mo.offSetHeight ||
            this.y + this.offSetY + this.height - this.offSetHeight < mo.y + mo.offSetY) {
            return false;
        } else {
            // collision detected!
            return true;
        }
    }

    isCollidingAttackEnemies(mo) {
        if (
            // no collision
            this.x + this.offSetX > mo.x + mo.offSetX + mo.width - mo.offSetWidth ||
            this.x + this.offSetX + this.width - this.offSetWidthAttack < mo.x + mo.offSetX ||
            this.y + this.offSetY > mo.y + mo.offSetY + mo.height - mo.offSetHeight ||
            this.y + this.offSetY + this.height - this.offSetHeight < mo.y + mo.offSetY) {
            return false;
        } else {
            // collision detected!
            return true;
        }

    }


    // // character.isColliding(treaser);
    // isCollidingThings(mo) {

    //     if ((this.x + this.offSetX) + (this.width - this.offSetWidth) > mo.x + mo.offSetX &&
    //         (this.y + this.offSetY) + (this.height - this.offSetHeight) > mo.y + mo.offSetY &&
    //         this.x + this.offSetX < mo.x + mo.offSetX + mo.width - mo.offSetWidth &&
    //         this.y + this.offSetY < mo.y + mo.offSetY + mo.height - mo.offSetHeight) {
    //         // collision detected!
    //         return true;

    //     } else {
    //         // no collision
    //         return false;
    //     }

    // }


    jumpsOnTop(mo) {
        return this.y + this.offSetY + this.height - this.offSetHeight > mo.y + mo.offSetY &&
            this.y + this.offSetY + this.height - this.offSetHeight < mo.y + mo.offSetY + mo.height - mo.offSetHeight &&
            this.x + this.offSetX + this.width - this.offSetWidth > mo.x + mo.offSetX &&
            this.x + this.offSetX < (mo.x + mo.offSetX + mo.width - mo.offSetWidth);
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