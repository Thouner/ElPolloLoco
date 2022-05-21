class MovableObject {
    y;
    x;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    // speed = 0.5;
    otherDierection = false;

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
     * 
     * @param {number} runspeed - number of milliseconds the animation is played
     */
    animation(runspeed) {
        setInterval(() => {
            let i = this.currentImage % this.Image_Walking.length; // i = 0,1,2,3,4,5,6,0,1,2,3,4,5,6,...
            let path = this.Image_Walking[i];
            this.img = this.imageCache[path]
            this.currentImage++;
        }, runspeed);
    }

    /**
     * movement of the object to the right
     * 
     * @param {number} speed - number of pixels to be moved
     */
    moveRight(speed) {
        setInterval(() => {
            this.x += speed;

        }, 1000 / 60);
    }

    /**
     * movement of the object to the left
     * 
     * @param {number} speed - number of pixels to be moved
     */
    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;

        }, 1000 / 60);
    }
}