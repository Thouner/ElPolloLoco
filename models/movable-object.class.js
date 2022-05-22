class MovableObject {
    x;
    y;
    height;
    width;

    img;
    imageCache = {};
    currentImage = 0;
    otherDierection = false;
    speedY = 0;
    acceleration = 2.5;
    enemyIndex = Math.floor(Math.random() * (3 - 1 + 1) + 1);

    applyGravity(groundHight) {
        setInterval(() => {
            if (this.isAboveGround(groundHight) || this.speedY > 0) {
                this.y -= this.speedY;
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
        if (this instanceof Character || this instanceof Enemies || this instanceof Endboss) {

            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    // character.isColliding(enemie);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
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


    walkRight(walkspeed) {
        this.x += walkspeed;
        this.otherDierection = false;

    }

    walkleft(walkspeed) {
        this.x -= walkspeed;
        this.otherDierection = true;
    }


    jump() {
        this.speedY = 30;
    }
}