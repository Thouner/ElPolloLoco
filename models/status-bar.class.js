class StatusBar extends MovableObject {
    x = 10;
    y = 10;
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


    /**
     * draw the red coin
     */
    constructor() {
        super();
        this.loadImage('barImages/Bronze/Bronze_11.png');
        this.loadImagesArray(this.IMAGES_Heart);
        this.animationCoin();
    }


    /**
     * animate the images
     */
    animationCoin() {
        setInterval(() => {
            this.animationRepeat(this.IMAGES_Heart);
        }, 100);

    }
}