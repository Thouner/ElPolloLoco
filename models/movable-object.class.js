class MovableObject extends DrawableObject {
    otherDierection = false;
    speedY = 0;
    acceleration = 2.5;
    enemyIndex = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    world;
    lastHit = 0;
    lastAtack = 0;
    attackEnemy = false;
    attackTime;
    energy;
    attack_sound = new Audio('audio/attack.mp3');


    /**
     * falling of the object when above the ground
     * 
     * @param {number} groundHight - height on the y-axis at which the object stops falling
     */
    applyGravity(groundHight) {
        setInterval(() => {
            if (this.isAboveGround(groundHight) || this.speedY > 0) {
                this.y -= this.speedY;
                this.yBox -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * query whether the object is above the ground
     * 
     * @param {number} groundHight - height on the y-axis at which the object stops falling
     * @returns - true if y-value is above ground or the enemy  is dead
     */
    isAboveGround(groundHight) {
        if (this instanceof Enemies || Endboss) {
            if (this.enemyDead) {
                return true
            }
        }
        return this.y < groundHight;
    }


    /**
     * damage is inflicted
     * 
     * @param {number} damages - amount of damage dealt
     */
    hit(damages) {
        this.energy -= damages;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * query the time after the last damage
     * 
     * @returns - true if the last damage was less than a second ago
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * deals damage to the enemy when attacked
     */
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


    /**
     * deals damage to the enemy for 1 second
     */
    setAttackTimer() {
        this.attackTime = Date.now();
        this.attackEnemy = true;
        this.lastAtack = new Date().getTime();
        setTimeout(() => {
            this.attackEnemy = false;
        }, 1000);
    }


    /**
     * query when the last attack was carried out
     * 
     * @returns true if last attack was less than one second ago
     */
    isAttack() {
        let timepassed = new Date().getTime() - this.lastAtack;
        timepassed = timepassed / 1000;
        return timepassed < 1.0;
    }


    /**
     * query the level of energy
     * 
     * @returns - true if energy is zero
     */
    isDead() {
        return this.energy == 0;
    }


    // character.isColliding(enemie);

    /**
     * query if the character collides with an enemy
     * 
     * @param {class} mo - class of the enemy or boss
     * @returns - true if character collides with an enemy or boss
     */
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


    /**
     * Query if the character collides with an enemy when attacking
     * 
     * @param {class} mo - class of the enemy or boss
     * @returns - true if the character collides with an enemy or boss when attacking
     */
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


    /**
     * Query if the character collides with an enemy when jumping
     * 
     * @param {class} mo - class of the enemy or boss
     * @returns - True if the character collides with an enemy or boss when jumping
     */
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


    /**
     * movement of the object to the right
     * 
     * @param {number} walkspeed - distance traveled on the x axis
     */
    walkRight(walkspeed) {
        this.x += walkspeed;
        this.xBox += walkspeed;
        this.otherDierection = false;
    }


    /**
     * movement of the object to the left
     * 
     * @param {number} walkspeed - distance traveled on the x axis
     */
    walkleft(walkspeed) {
        this.x -= walkspeed;
        this.xBox -= walkspeed;
        this.otherDierection = true;
    }


    /**
     * object is moved up on the y axis
     */
    jump() {
        this.speedY = 32;
    }
}