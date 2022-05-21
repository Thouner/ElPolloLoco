class Chicken extends MovableObject {
    height = 300;
    width = 300;
    x = 720 + Math.random() * 160;
    y = 150 + Math.random() * 20;

    Image_Walking = [
        'ork/1_ORK/ORK_01_WALK_000.png',
        'ork/1_ORK/ORK_01_WALK_001.png',
        'ork/1_ORK/ORK_01_WALK_002.png',
        'ork/1_ORK/ORK_01_WALK_003.png',
        'ork/1_ORK/ORK_01_WALK_004.png',
        'ork/1_ORK/ORK_01_WALK_005.png',
        'ork/1_ORK/ORK_01_WALK_006.png',
        'ork/1_ORK/ORK_01_WALK_007.png',
        'ork/1_ORK/ORK_01_WALK_008.png',
        'ork/1_ORK/ORK_01_WALK_009.png',

    ];
    speed = 0.3 + Math.random() * 0.5;
    walking_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('ork/1_ORK/ORK_01_WALK_000.png');
        // this.Image_Walking.translate(this.Image_Walking.width, 0);
        // this.Image_Walking.scale(-1, 1);
        // this.Image_Walking.x = this.Image_Walking.x * -1;
        // this.x = 720 + Math.random() * 160;
        // this.y = 350 + Math.random() * 20;

        this.loadImagesArray(this.Image_Walking);
        this.moveLeft(this.speed);
        this.animation(200);
        this.walking_sound.volume = 0.2;
        this.walking_sound.loop = true;
        // this.walking_sound.play();
    }


}