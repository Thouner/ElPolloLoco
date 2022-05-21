class Endboss extends MovableObject {
    height = 800;
    width = 800;
    y = -220;

    Image_Walking = [
        'troll/1_TROLL/Troll_01_1_WALK_000.png',
        'troll/1_TROLL/Troll_01_1_WALK_001.png',
        'troll/1_TROLL/Troll_01_1_WALK_002.png',
        'troll/1_TROLL/Troll_01_1_WALK_003.png',
        'troll/1_TROLL/Troll_01_1_WALK_004.png',
        'troll/1_TROLL/Troll_01_1_WALK_005.png',
        'troll/1_TROLL/Troll_01_1_WALK_006.png',
        'troll/1_TROLL/Troll_01_1_WALK_007.png',
        'troll/1_TROLL/Troll_01_1_WALK_008.png',
        'troll/1_TROLL/Troll_01_1_WALK_009.png',

    ];

    speed = 0.7;
    walking_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('troll/1_TROLL/Troll_01_1_WALK_000.png');
        this.otherDierection = true;

        this.x = 1420;


        this.loadImagesArray(this.Image_Walking);
        this.moveLeft(this.speed);
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