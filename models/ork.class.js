class Ork extends MovableObject {
    height = 300;
    width = 300;
    x = 720 + Math.random() * 160;
    y = 180 + Math.random() * 40;

    Image_Walking = [
        'ork/ORK_01_WALK_000.png',
        'ork/ORK_01_WALK_001.png',
        'ork/ORK_01_WALK_002.png',
        'ork/ORK_01_WALK_003.png',
        'ork/ORK_01_WALK_004.png',
        'ork/ORK_01_WALK_005.png',
        'ork/ORK_01_WALK_006.png',
        'ork/ORK_01_WALK_007.png',
        'ork/ORK_01_WALK_008.png',
        'ork/ORK_01_WALK_009.png',

    ];
    speed = 0.3 + Math.random() * 0.5;
    walking_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('ork/ORK_01_WALK_000.png');

        this.otherDierection = true;

        this.loadImagesArray(this.Image_Walking);

        setInterval(() => {
            this.walkleft(this.speed);
        }, 1000 / 60);
        // this.moveLeft(this.speed);
        this.animationEnemie();



        this.walking_sound.volume = 0.2;
        this.walking_sound.loop = true;
        // this.walking_sound.play();
    }

    animationEnemie() {
        setInterval(() => {
            this.animationRepeat(this.Image_Walking);
        }, 200);
    }
}