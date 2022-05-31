class StatusBar extends DrawableObject {
    x = 10;
    y = -10;
    width = 300;
    height = 80;


    IMAGES = [
        'img/Naranja/0.png',
        'img/Naranja/20.png',
        'img/Naranja/40.png',
        'img/Naranja/60.png',
        'img/Naranja/80.png',
        'img/Naranja/100.png',
    ];

    percentage = 100;




    constructor() {
        super();
        this.loadImage('img/Naranja/100.png');
        this.loadImagesArray(this.IMAGES);

        this.setPercentage(100);

    }

    /**
     * 
     * @param {number} percent 
     */
    setPercentage(percentage) {
        this.percentage = percentage; // -> 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else if (this.percentage > 5) {
            return 0;
        } else {
            return 0;
        }

    }




}