class Enemies extends MovableObject {
    height = Math.floor(Math.random() * (350 - 320 + 1) + 320);
    width = Math.floor(Math.random() * (350 - 320 + 1) + 320);
    x = Math.floor(Math.random() * (850 - 720 + 1) + 720);
    y = Math.floor(Math.random() * (160 - 140 + 1) + 140);
    imges;
    enemyDead = false;
    dieTime = 10;
    attackTime = 10;
    enemyWalk = false;
    speed = 0.5 + Math.random() * 0.7;
    // walking_sound = new Audio('audio/chicken.mp3');

    offSetX = 120;
    offSetY = 130;
    offSetWidth = 250;
    offSetHeight = 170;


    /**
     * draw the death animation
     */
    dieAnimationEnemy = setInterval(() => {
        if (this.enemyDead && this.dieTime > 0) {
            this.animationRepeat(this.imges.Image_Die);
            this.imges.Image_Die.splice(0, 1)
            this.dieTime--;
        }
        this.showCorpse();
    }, 100);


    /**
     * draw the enemy
     * 
     * @param {number} x - positioning on the x axis
     */
    constructor(x) {
        super();
        this.loadImage('ork/1/ORK_01_WALK_000.png');
        this.x = x;
        this.selectCurrentImages();
        this.otherDierection = true;
        this.loadDifferentImages();
        this.animationEnemie();
        // this.dieTime = this.imges.Image_Die.lenght;
        // this.walking_sound.volume = 0.2;
        // this.walking_sound.loop = true;
        // this.walking_sound.play();
    }


    /**
     * view the corpse depending on the respective images
     */
    showCorpse() {
        if (this.dieTime == 0 && this.enemyIndex == 1) {
            this.dieAnimation = this.loadImage('ork/1/ORK_01_DIE_009.png');
        } else if (this.dieTime == 0 && this.enemyIndex == 2) {
            this.dieAnimation = this.loadImage('ork/2/ORK_02_DIE_009.png');
        } else if (this.dieTime == 0 && this.enemyIndex == 3) {
            this.dieAnimation = this.loadImage('ork/3/ORK_03_DIE_009.png');
        }
    }


    /**
     * load the different images of the enemy
     */
    loadDifferentImages() {
        this.loadImagesArray(this.imges.Image_Walking);
        this.loadImagesArray(this.imges.Image_Die);
    }


    /**
     * Selection of images according to the selected index
     */
    selectCurrentImages() {
        if (this.enemyIndex == 1) {
            this.loadImage('ork/1/ORK_01_WALK_000.png');
            this.imges = new Ork_Image1();
        } else if (this.enemyIndex == 2) {
            this.loadImage('ork/2/ORK_02_WALK_000.png');
            this.imges = new Ork_Image2();
        } else if (this.enemyIndex == 3) {
            this.loadImage('ork/3/ORK_03_WALK_000.png');
            this.imges = new Ork_Image3();
        }
    }


    /**
     * animation for run or die
     */
    animationEnemie() {
        this.movementOfEnemy();
        this.AnimationMove();
    }



    /**
     * moves the enemy to the left
     */
    movementOfEnemy() {
        setInterval(() => {
            if (!this.enemyDead && this.enemyWalk) {
                this.walkleft(this.speed);
            }
        }, 1000 / 60);
    }


    /**
     * animation of enemy movement
     */
    AnimationMove() {
        setInterval(() => {
            if (!this.enemyDead && this.enemyWalk) {
                this.animationRepeat(this.imges.Image_Walking);
            } else if (this.enemyDead) {
                this.dieAnimationEnemy;
                setTimeout(() => {
                    this.y += 1;
                }, 2000);
            }
        }, 120);
    }


    /**
     * query if the enemy is alive
     */
    setEnemyDead() {
        this.enemyDead = true;
    }
}