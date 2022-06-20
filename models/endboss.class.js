class Endboss extends MovableObject {
    height = 800;
    width = 800;
    y = -220;
    x = 1420;
    imges;
    speed = 0.7;
    world;
    bossEnergy = 100;
    enemyDead = false;
    dieTime = 10;
    // walking_sound = new Audio('audio/chicken.mp3');

    offSetX = 270;
    offSetY = 270;
    offSetWidth = 550;
    offSetHeight = 370;

    offSetWidthAttack = 90;

    dieAnimationEnemy = setInterval(() => {
        if (this.enemyDead && this.dieTime > 0) {
            this.animationRepeat(this.imges.Image_Die);
            this.imges.Image_Die.splice(0, 1)
            this.dieTime--;
        }
        if (this.dieTime == 0 && this.enemyIndex == 1) {
            this.dieAnimation = this.loadImage('troll/1/Troll_01_1_DIE_009.png');
        } else if (this.dieTime == 0 && this.enemyIndex == 2) {
            this.dieAnimation = this.loadImage('troll/2/Troll_02_1_DIE_009.png');
        } else if (this.dieTime == 0 && this.enemyIndex == 3) {
            this.dieAnimation = this.loadImage('troll/3/Troll_03_1_DIE_009.png');
        }
    }, 100);


    constructor(world) {
        super().loadImage('troll/1/Troll_01_1_WALK_000.png');
        if (this.enemyIndex == 1) {
            this.imges = new Troll_Image1;
        } else if (this.enemyIndex == 2) {
            this.imges = new Troll_Image2;
        } else if (this.enemyIndex == 3) {
            this.imges = new Troll_Image3;
        }
        this.otherDierection = true;
        this.world = world;
        this.loadImagesArray(this.imges.Image_Walking);
        this.loadImagesArray(this.imges.Image_Attack);
        this.loadImagesArray(this.imges.Image_Die);
        this.loadImagesArray(this.imges.Image_Hurt);
        this.AnimationMove();

        this.animationEnemie();
        // this.checkCollision();
        // this.walking_sound.volume = 0.2;
        // this.walking_sound.loop = true;
        // this.walking_sound.play();
    }


    AnimationMove() {
        setInterval(() => {
            if (!this.enemyDead) {
                this.walkleft(this.speed);
            }
            this.checkBossAlife();
        }, 1000 / 60);
    }


    animationEnemie() {
        setInterval(() => {
            if (!this.enemyDead) {
                this.animationRepeat(this.imges.Image_Walking);
            } else {
                this.dieAnimationEnemy;
                setTimeout(() => {
                    this.y += 1;
                }, 2000);
            }




        }, 200);
    }


    setEnemyDead(damage) {
        this.bossEnergy = this.bossEnergy - damage;
        if (this.bossEnergy <= 0) {
            this.bossEnergy = 0;

        }
    }



    checkBossAlife() {
        // console.log(this.bossEnergy);
        if (this.bossEnergy == 0) {
            this.enemyDead = true;
        }

    }
}