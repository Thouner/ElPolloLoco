class Endboss extends MovableObject {
    height = 800;
    width = 800;
    y = -250;
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

        this.x = 720;


        this.loadImagesArray(this.Image_Walking);
        this.moveLeft(this.speed);
        this.animation(200);
        this.walking_sound.volume = 0.2;
        this.walking_sound.loop = true;
        // this.walking_sound.play();
    }





}