class AmmoBar extends MovableObject {
    x = 10;
    y = 100;
    width = 40;
    height = 40;
    IMAGES_Ammo = [
        'barImages/Silver/Silver_23.png',
        'barImages/Silver/Silver_24.png',
        'barImages/Silver/Silver_25.png',
        'barImages/Silver/Silver_26.png',
        'barImages/Silver/Silver_27.png',
        'barImages/Silver/Silver_28.png',
        'barImages/Silver/Silver_29.png',
        'barImages/Silver/Silver_30.png',
        'barImages/Silver/Silver_21.png',
        'barImages/Silver/Silver_22.png',
    ];


    /**
     * draw the silver coin
     */
    constructor() {
        super();
        this.loadImage('barImages/Silver/Silver_23.png');
        this.loadImagesArray(this.IMAGES_Ammo);
        this.animationCoin();
    }


    /**
     * animate the images
     */
    animationCoin() {
        setInterval(() => {
            this.animationRepeat(this.IMAGES_Ammo);
        }, 200);

    }
}