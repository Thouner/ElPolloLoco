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




    groundlevel = 180;



    xBox = this.x + 40;
    yBox = this.y + 65;
    widthBox = this.width - 150;
    heightBox = this.height - 90;
    attackWidth = this.width - 90;


    dieTime = 6;



    dieAnimation = setInterval(() => {
        if (this.isDead() && this.dieTime > 0) {
            this.animationRepeat(this.imges.Image_Die);
            this.dieTime--;
            if (this.dieTime == 1) {
                this.imges.Image_Die.splice(0, 6)
            }
        } else if (this.dieTime == 0 && this.characterSelection == 1) {
            this.dieAnimation = this.loadImage('pirat/png/1/1_entity_000_DIE_006.png');
        } else if (this.dieTime == 0 && this.characterSelection == 2) {
            this.dieAnimation = this.loadImage('pirat/png/2/2_entity_000_DIE_006.png');
        } else if (this.dieTime == 0 && this.characterSelection == 3) {
            this.dieAnimation = this.loadImage('pirat/png/3/Dead8.png');
        }
    }, 150);



    constructor() {
        super();
        if (this.characterSelection == 1) {
            this.loadImage('pirat/png/1/1_entity_000_IDLE_000.png');
            this.imges = new Pirat_Image1;
        } else if (this.characterSelection == 2) {
            this.loadImage('pirat/png/2/2_entity_000_IDLE_000.png');
            this.imges = new Pirat_Image2;
        } else if (this.characterSelection == 3) {
            this.loadImage('pirat/png/3/Idle1.png');
            this.imges = new Pirat_Image3;
            this.height = 200;
            this.width = 200;
            this.y = -100;
        }
        this.applyGravity(this.groundlevel);

        this.setgroundLevel();
        this.loadImagesArray(this.imges.Image_Walking);
        this.loadImagesArray(this.imges.Image_Jump);
        this.loadImagesArray(this.imges.Image_Idle);
        this.loadImagesArray(this.imges.Image_Die);
        this.loadImagesArray(this.imges.Image_Attack);
        this.loadImagesArray(this.imges.Image_Hurt);

        this.animationCharater(150);
    }


    setgroundLevel() {
        if (this.characterSelection == 3) {
            this.groundlevel = 250;
            this.applyGravity(this.groundlevel)
        }
    }

    /**
     * animation of the character
     */
    animationCharater() {
        /**
         * movement of the character and the background
         */
        setInterval(() => {

            if (!this.isDead()) {
                this.walking_sound.pause();
                this.walking_sound.playbackRate = 2.4;
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.walkRight(this.speed);
                    this.walking_sound.play();
                    this.currentPosion = this.x;
                }
                if (this.world.keyboard.LEFT && this.x > -600) {
                    this.walkleft(this.speed);
                    this.walking_sound.play();
                }
                if (this.world.keyboard.SPACE && !this.isAboveGround(180)) {
                    this.jump();
                }

                this.world.camera_x = -this.x + 100;


            }
        }, 1000 / 60);


        setInterval(() => {
            if (!this.isDead()) {
                if (!this.isAboveGround() && !this.isDead() && !this.isHurt()) {
                    this.animationRepeat(this.imges.Image_Idle);
                }
                if (this.isHurt() && !this.isDead()) {
                    this.animationRepeat(this.imges.Image_Hurt);
                }
                if (this.world.keyboard.RIGHT && !this.isAboveGround(180) || this.world.keyboard.LEFT && !this.isAboveGround(180)) {

                    this.animationRepeat(this.imges.Image_Walking); // walk animation
                }
                if (this.isAttack() && !this.isDead()) {
                    this.animationRepeat(this.imges.Image_Attack);
                }
                this.attack();
            }
        }, 120);


        setInterval(() => {
            if (this.isAboveGround(180)) {
                this.animationRepeat(this.imges.Image_Jump);
            }

        }, 400);

        this.dieAnimation;
    }


    collectTreasure() {
        this.treasure++;
    }

    // collisionWithEnemie() {
    //     this.world.level.chicken.forEach((chicken) => {
    //         if (this.isColliding(chicken) && !chicken.isDead && !this.isAboveGround()) {
    //             this.hit();
    //         }

    //         if (this.jumpsOnTop(chicken) && this.speedY < 0) {
    //             chicken.isDead = true;
    //         }
    //     })

    // }


}