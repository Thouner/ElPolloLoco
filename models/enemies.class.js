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
    dieTime = 10;


    speed = 0.3 + Math.random() * 0.5;
    // walking_sound = new Audio('audio/chicken.mp3');

    offSetX = 120;
    offSetY = 130;
    offSetWidth = 250;
    offSetHeight = 170;


    dieAnimationEnemy = setInterval(() => {
        if (this.enemyDead && this.dieTime > 0) {
            this.animationRepeat(this.imges.Image_Die);
            this.imges.Image_Die.splice(0, 1)
            this.dieTime--;
        }
        if (this.dieTime == 0 && this.enemyIndex == 1) {
            this.dieAnimation = this.loadImage('ork/1/ORK_01_DIE_009.png');
        } else if (this.dieTime == 0 && this.enemyIndex == 2) {
            this.dieAnimation = this.loadImage('ork/2/ORK_02_DIE_009.png');
        } else if (this.dieTime == 0 && this.enemyIndex == 3) {
            this.dieAnimation = this.loadImage('ork/3/ORK_03_DIE_009.png');
        }
    }, 100);



    constructor(x) {
        super().loadImage('ork/1/ORK_01_WALK_000.png');
        this.x = x;
        if (this.enemyIndex == 1) {
            this.imges = new Ork_Image1();
        } else if (this.enemyIndex == 2) {
            this.imges = new Ork_Image2();
        } else if (this.enemyIndex == 3) {
            this.imges = new Ork_Image3();
        }

        this.otherDierection = true;

        this.loadImagesArray(this.imges.Image_Walking);
        this.loadImagesArray(this.imges.Image_Die);


        this.animationEnemie();
        this.dieTime = this.imges.Image_Die.lenght;
        // this.walking_sound.volume = 0.2;
        // this.walking_sound.loop = true;
        // this.walking_sound.play();
    }

    animationEnemie() {

        setInterval(() => {

            if (!this.enemyDead) {
                this.walkleft(this.speed);
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.enemyDead) {
                this.animationRepeat(this.imges.Image_Walking);
            } else {
                this.dieAnimationEnemy;
                setTimeout(() => {
                    this.y += 1;
                }, 2000);
            }
        }, 120);


    }

    setEnemyDead() {
        this.enemyDead = true;
    }



}