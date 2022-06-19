class MoneyBar extends MovableObject {
    x = 10;
    y = 55;
    width = 40;
    height = 40;


    IMAGES_Money = [

        'barImages/Gold/Gold_2.png',
        'barImages/Gold/Gold_3.png',
        'barImages/Gold/Gold_4.png',
        'barImages/Gold/Gold_5.png',
        'barImages/Gold/Gold_6.png',
        'barImages/Gold/Gold_7.png',
        'barImages/Gold/Gold_8.png',
        'barImages/Gold/Gold_9.png',
        'barImages/Gold/Gold_10.png',
        'barImages/Gold/Gold_1.png',
    ];


    constructor() {
        super();
        this.loadImage('barImages/Gold/Gold_2.png');
        this.loadImagesArray(this.IMAGES_Money);
        this.animationCoin();
    }

    animationCoin() {
        setInterval(() => {

            this.animationRepeat(this.IMAGES_Money);
        }, 200);

    }

}