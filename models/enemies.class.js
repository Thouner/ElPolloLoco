class Enemies extends MovableObject {
    // height = 300;
    height = Math.floor(Math.random() * (350 - 320 + 1) + 320);
    // width = 300;
    width = Math.floor(Math.random() * (350 - 320 + 1) + 320);
    // x = 720 + Math.random() * 160;
    x = Math.floor(Math.random() * (850 - 720 + 1) + 720);
    // y = 180 + Math.random() * 30;
    y = Math.floor(Math.random() * (160 - 140 + 1) + 140);

    imges;
    enemyDead = false;

    xBox = this.x + 120;
    yBox = this.y + 130;
    widthBox = this.width - 240;
    heightBox = this.height - 170;

    speed = 0.3 + Math.random() * 0.5;
    // walking_sound = new Audio('audio/chicken.mp3');



    constructor() {
        super().loadImage('ork/1/ORK_01_WALK_000.png');

        if (this.enemyIndex == 1) {
            this.imges = new Ork_Image1;
        } else if (this.enemyIndex == 2) {
            this.imges = new Ork_Image2;
        } else if (this.enemyIndex == 3) {
            this.imges = new Ork_Image3;
        }

        this.otherDierection = true;

        this.loadImagesArray(this.imges.Image_Walking);
        this.loadImagesArray(this.imges.Image_Die);


        this.animationEnemie();

        // this.walking_sound.volume = 0.2;
        // this.walking_sound.loop = true;
        // this.walking_sound.play();
    }

    animationEnemie() {

        setInterval(() => {
            // console.log(this.enemyDead);
            if (!this.enemyDead) {
                this.walkleft(this.speed);
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.enemyDead) {
                this.animationRepeat(this.imges.Image_Walking);
            } else {
                this.animationRepeat(this.imges.Image_Die);
            }
        }, 200);


    }

    setEnemyDead() {
        this.enemyDead = true;
    }

    // dieEnemyAnimation = setInterval(() => {
    //     if (this.isDead() && this.dieTime > 0) {
    //         this.animationRepeat(this.imges.Image_Die);
    //         this.dieTime--;
    //         if (this.dieTime == 1) {
    //             this.imges.Image_Die.splice(0, 6)
    //         }
    //     } else if (this.dieTime == 0 && this.characterSelection == 1) {
    //         this.dieAnimation = this.loadImage('pirat/png/1/1_entity_000_DIE_006.png');
    //     } else if (this.dieTime == 0 && this.characterSelection == 2) {
    //         this.dieAnimation = this.loadImage('pirat/png/2/2_entity_000_DIE_006.png');
    //     } else if (this.dieTime == 0 && this.characterSelection == 3) {
    //         this.dieAnimation = this.loadImage('pirat/png/3/Dead8.png');
    //     }
    // }, 150);
}