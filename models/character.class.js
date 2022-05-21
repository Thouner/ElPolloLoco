class Character extends MovableObject {
    height = 280;
    width = 280;
    x = 0;
    y = 180

    Image_Idle = [
        'pirat/png/1/1_entity_000_IDLE_000.png',
        'pirat/png/1/1_entity_000_IDLE_001.png',
        'pirat/png/1/1_entity_000_IDLE_002.png',
        'pirat/png/1/1_entity_000_IDLE_003.png',
        'pirat/png/1/1_entity_000_IDLE_004.png',
        'pirat/png/1/1_entity_000_IDLE_005.png',
        'pirat/png/1/1_entity_000_IDLE_006.png',
    ];

    Image_Walking = [
        'pirat/png/1/1_entity_000_RUN_000.png',
        'pirat/png/1/1_entity_000_RUN_001.png',
        'pirat/png/1/1_entity_000_RUN_002.png',
        'pirat/png/1/1_entity_000_RUN_003.png',
        'pirat/png/1/1_entity_000_RUN_004.png',
        'pirat/png/1/1_entity_000_RUN_005.png',
        'pirat/png/1/1_entity_000_RUN_006.png',
    ];
    world;
    walking_sound = new Audio('audio/walk.mp3');



    constructor() {
        super().loadImage('pirat/png/1/1_entity_000_IDLE_000.png');

        // this.loadImagesArray(this.Image_Idle);
        this.loadImagesArray(this.Image_Walking);


        // this.moveRight(0);

        this.animationCharater(150);
    }

    /**
     * animation of the character
     */
    animationCharater() {

        /**
         * movement of the character and the background
         */
        setInterval(() => {
            this.walking_sound.pause();
            this.walking_sound.playbackRate = 2.4;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += 5;
                this.otherDierection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -600) {
                this.x -= 5;
                this.otherDierection = true;
                this.walking_sound.play();
            }


            this.world.camera_x = -this.x + 100;



        }, 1000 / 60);

        /**
         * Play the animation only when you press a key
         */
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation
                this.animationRepeat();
            }
        }, 80);
    }

    jump() {

    }
}