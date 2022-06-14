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
        if (!this.enemyDead) {
            setInterval(() => {
                console.log(this.enemyDead);
                this.walkleft(this.speed);
            }, 1000 / 60);

            setInterval(() => {
                this.animationRepeat(this.imges.Image_Walking);
            }, 200);
        } else if (this.enemyDead) {
            this.animateDie();
        }
    }

    setDieAnmimate() {
        this.enemyDead = true;
    }

    animateDie() {

        setInterval(() => {
            this.animationRepeat(this.imges.Image_Die);
        }, 200);
    }
}