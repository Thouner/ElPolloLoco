class MovableObject {
    // x;
    // y;
    // height;
    // width;

    // xBox;
    // yBox;
    // heightBox;
    // widthBox;

    img;
    imageCache = {};
    currentImage = 0;
    otherDierection = false;
    speedY = 0;
    acceleration = 2.5;
    enemyIndex = Math.floor(Math.random() * (3 - 1 + 1) + 1);

    ernergy = 100;

    lastHit = 0;


    applyGravity(groundHight) {
        setInterval(() => {
            if (this.isAboveGround(groundHight) || this.speedY > 0) {
                this.y -= this.speedY;
                this.yBox -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 180;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character) {

            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.xBox, this.yBox, this.widthBox, this.heightBox);
            ctx.stroke();
        }
        if (this instanceof Enemies) {

            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 120, this.y + 130, this.width - 240, this.height - 170);
            ctx.stroke();
        }
        if (this instanceof Endboss) {

            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x + 270, this.y + 270, this.width - 550, this.height - 370);
            ctx.stroke();
        }

    }

    hit() {
        if (this.ernergy > 0) {

            this.ernergy -= 5;
            console.log(this.ernergy)
        } else {
            this.lastHit = new Date().getTime();
        }

    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 5;
    }


    isDead() {
        return this.ernergy == 0;
    }


    // character.isColliding(enemie);
    isColliding(mo) {
        return this.xBox + this.widthBox > mo.xBox &&
            this.yBox + this.heightBox > mo.yBox &&
            this.xBox < mo.xBox &&
            this.yBox < mo.yBox + mo.heightBox;
    }

    /**
     * loadImage('img/image1.png')
     * 
     * @param {string} path - 'img/image1.png'
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" scr>
        this.img.src = path;
    }

    /**
     * loadImage Array
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', 'img/image3.png',...] 
     */
    loadImagesArray(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

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

    animationRepeatToDead(animationArray) {
        for (let i = 0; index < animationArray.length; index++) {

            // this.img = this.imageCache[i]

        }

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