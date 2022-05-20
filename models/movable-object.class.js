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

    // loadImage('img/test.png)
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" scr>
        this.img.src = path;
    }


    /**
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


    animation(runspeed) {
        setInterval(() => {
            let i = this.currentImage % this.Image_Walking.length; // i = 0,1,2,3,4,5,6,0,1,2,3,4,5,6,...
            let path = this.Image_Walking[i];
            this.img = this.imageCache[path]
            this.currentImage++;
        }, runspeed);
    }


    moveRight(speed) {
        setInterval(() => {
            this.x += speed;

        }, 1000 / 60);
    }



    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;

        }, 1000 / 60);
    }
}