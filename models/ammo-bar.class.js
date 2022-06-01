class AmmoBar extends DrawableObject {
    x = 10;
    y = 70;
    width = 250;
    height = 60;


    IMAGES_Ammo = [
        'img/Verde/0.png',
        'img/Verde/20.png',
        'img/Verde/40.png',
        'img/Verde/60.png',
        'img/Verde/80.png',
        'img/Verde/100.png',
    ];
    constructor() {
        super();
        this.loadImage('img/Verde/0.png');
        this.loadImagesArray(this.IMAGES_Ammo);


    }

}