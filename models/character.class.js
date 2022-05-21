class Character extends MovableObject {
    height = 280;
    width = 280;
    x = 0;
    y = -150

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

    Image_Jump = [
        'pirat/png/1/1_entity_000_JUMP_000.png',
        'pirat/png/1/1_entity_000_JUMP_001.png',
        'pirat/png/1/1_entity_000_JUMP_002.png',
        'pirat/png/1/1_entity_000_JUMP_003.png',
        'pirat/png/1/1_entity_000_JUMP_004.png',
        'pirat/png/1/1_entity_000_JUMP_005.png',
        'pirat/png/1/1_entity_000_JUMP_006.png',
    ];


    world;
    walking_sound = new Audio('audio/walk.mp3');



    constructor() {
        super().loadImage('pirat/png/1/1_entity_000_IDLE_000.png');

        this.loadImagesArray(this.Image_Walking);
        this.loadImagesArray(this.Image_Jump);
        this.loadImagesArray(this.Image_Idle);

        this.applyGravity(200);

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
            // if (!this.isAboveGround(180)) {

            //     if (this.world.keyboard.SPACE) {
            //         this.speedY = 20;
            //     }
            // }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround(180)) {
                this.speedY = 30;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 2);

        setInterval(() => {
            if (this.world.keyboard.SPACE && this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.isAboveGround(180)) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 1);


        /**
         * Play the animation only when you press a key
         */
        setInterval(() => {
            if (this.isAboveGround(180)) {
                this.animationRepeat(this.Image_Jump);
            } else {
                this.animationRepeat(this.Image_Idle);
            }
            if (this.world.keyboard.RIGHT && !this.isAboveGround(180) || this.world.keyboard.LEFT && !this.isAboveGround(180)) {
                // walk animation
                this.animationRepeat(this.Image_Walking);
            }
        }, 80);
    }

}