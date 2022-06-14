class MovableObject extends DrawableObject {

    otherDierection = false;
    speedY = 0;
    acceleration = 2.5;
    enemyIndex = Math.floor(Math.random() * (3 - 1 + 1) + 1);

    lastHit = 0;
    lastAtack = 0;
    attackEnemy = false;


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
            this.attackEnemy = true;
            this.lastAtack = new Date().getTime();
            setTimeout(() => {
                this.attackEnemy = false;
            }, 1000);
        }

    }


    isAttack() {
        let timepassed = new Date().getTime() - this.lastAtack;
        timepassed = timepassed / 1000;

        return timepassed < 0.8;
    }


    isDead() {
        return this.energy == 0;
    }


    // character.isColliding(enemie);
    isCollidingEnemies(mo) {
            if (this.attackEnemy) {
                // console.log('MovableObject', this.attackEnemy);
                if (
                    // no collision
                    this.x + 40 > mo.xBox + mo.widthBox ||
                    this.x + 40 + this.width - 90 < mo.xBox ||
                    this.y + 65 > mo.yBox + mo.heightBox ||
                    this.y + 65 + this.height - 90 < mo.yBox) {
                    return false;
                } else {
                    // collision detected!
                    return true;
                }
            } else {
                if (
                    // no collision
                    this.x + 40 > mo.xBox + mo.widthBox ||
                    this.x + 40 + this.width - 170 < mo.xBox ||
                    this.y + 65 > mo.yBox + mo.heightBox ||
                    this.y + 65 + this.height - 90 < mo.yBox) {
                    return false;
                } else {
                    // collision detected!
                    return true;
                }
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



    jumpsOnTop(mo) {
        return this.y + this.height > mo.y &&
            this.y + this.height < mo.y + mo.height &&
            this.x + this.width > mo.x &&
            this.x + this.width < (mo.x + mo.width + 70);
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