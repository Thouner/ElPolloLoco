class Stationary_Objects {
    y;
    x;
    img;
    height;
    width;

    /**
     * loadImage('img/image1.png')
     * 
     * @param {string} path - 'img/image1.png'
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" scr>
        this.img.src = path;
    }
}