class Character extends MovableObject {
    height = 280;
    width = 280;
    x = 0;
    y = -150;
    speed = 5;
    characterSelection = 1;
    imges;

    world;
    walking_sound = new Audio('audio/walk.mp3');


    xBox = this.x + 40;
    yBox = this.y + 65;
    heightBox = this.height - 90;
    widthBox = this.width - 150;


    constructor() {
        // super().loadImage('pirat/png/1/1_entity_000_IDLE_000.png');
        super().applyGravity(200);
        if (this.characterSelection == 1) {
            this.loadImage('pirat/png/1/1_entity_000_IDLE_000.png');
            this.imges = new Pirat_Image1;
        } else if (this.characterSelection == 2) {
            this.loadImage('pirat/png/2/2_entity_000_IDLE_000.png');
            this.imges = new Pirat_Image2;
        }

        this.loadImagesArray(this.imges.Image_Walking);

        this.loadImagesArray(this.imges.Image_Jump);
        this.loadImagesArray(this.imges.Image_Idle);
        this.loadImagesArray(this.imges.Image_Die);
        this.loadImagesArray(this.imges.Image_Attack);
        this.loadImagesArray(this.imges.Image_Hurt);



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
                this.walkRight(this.speed);
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -600) {
                this.walkleft(this.speed);
                this.walking_sound.play();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround(180)) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        /**
         * Play the animation only when you press a key
         */
        setInterval(() => {

            if (this.isDead()) {
                this.animationRepeat(this.imges.Image_Die);
                // console.log('dead')
            }

            if (!this.isAboveGround() && !this.isDead()) {
                this.animationRepeat(this.imges.Image_Idle);
            }
            if (this.world.keyboard.RIGHT && !this.isAboveGround(180) || this.world.keyboard.LEFT && !this.isAboveGround(180)) {
                // walk animation
                this.animationRepeat(this.imges.Image_Walking);
            }

        }, 80);


        setInterval(() => {
            if (this.isAboveGround(180)) {
                this.animationRepeat(this.imges.Image_Jump);
            }

        }, 400);

    }

}