class MoneyBar extends DrawableObject {
    x = 10;
    y = 30;
    width = 250;
    height = 60;


    IMAGES_Money = [
        'img/azul/0.png',
        'img/azul/20.png',
        'img/azul/40.png',
        'img/azul/60.png',
        'img/azul/80.png',
        'img/azul/100.png',
    ];
    constructor() {
        super();
        this.loadImage('img/azul/0.png');
        this.loadImagesArray(this.IMAGES_Money);


    }

}