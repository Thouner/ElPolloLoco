class MovableObject extends DrawableObject {

    otherDierection = false;
    speedY = 0;
    acceleration = 2.5;
    enemyIndex = Math.floor(Math.random() * (3 - 1 + 1) + 1);

    lastHit = 0;


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


    hit() {
        this.energy -= 15;
        // console.log(this.energy)
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


    isDead() {
        return this.energy == 0;
    }


    // character.isColliding(enemie);
    isColliding(mo) {
        if (this.xBox + this.widthBox > mo.xBox &&
            this.yBox + this.heightBox > mo.yBox &&
            this.xBox < mo.xBox &&
            this.yBox < mo.yBox + mo.heightBox) {
            // collision detected!
            return true;

        } else {
            // no collision
            return false;
        }
    }

    // isColliding(mo) {
    //     if (this.xBox < mo.xBox + mo.widthBox &&
    //         this.xBox + this.widthBox > mo.xBox &&
    //         this.yBox < mo.yBox + mo.heightBox &&
    //         this.heightBox + this.yBox > mo.yBox) {
    //         // collision detected!
    //         return true;
    //     } else {
    //         // no collision
    //         return false;
    //     }
    // }

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
        this.speedY = 30;
    }
}