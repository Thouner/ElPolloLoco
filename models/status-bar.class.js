class StatusBar extends MovableObject {
    x = 10;
    y = 10;
    // width = 250;
    // height = 60;
    width = 40;
    height = 40;


    IMAGES_Heart = [
        'barImages/Bronze/Bronze_11.png',
        'barImages/Bronze/Bronze_12.png',
        'barImages/Bronze/Bronze_13.png',
        'barImages/Bronze/Bronze_14.png',
        'barImages/Bronze/Bronze_15.png',
        'barImages/Bronze/Bronze_16.png',
        'barImages/Bronze/Bronze_17.png',
        'barImages/Bronze/Bronze_18.png',
        'barImages/Bronze/Bronze_19.png',
        'barImages/Bronze/Bronze_20.png',
    ];


    percentage = 100;


    constructor() {
        super();
        this.loadImage('barImages/Bronze/Bronze_11.png');
        this.loadImagesArray(this.IMAGES_Heart);

        this.setPercentage(100);
        this.animationCoin();
    }


    animationCoin() {
        setInterval(() => {

            this.animationRepeat(this.IMAGES_Heart);
        }, 200);

    }


    /**
     * 
     * @param {number} percent 
     */
    setPercentage(percentage) {
        this.percentage = percentage; // -> 0 ... 5
        // let path = this.IMAGES_Heart[this.resolveImageIndex()];
        // this.img = this.imageCache[path];
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