class MovableObject {
    y;
    x;
    img;
    height;
    width;
    imageCache = [];

    // loadImage('img/test.png)
    loadImages(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" scr>
        this.img.src = path;
    }

    loadImages(arr) {

    }

    moveRight() {
        console.log('moving right');
    }


    moveLeft() {
        console.log('moving left');
    }
}