class Endboss extends MovableObject {
    height = 800;
    width = 800;
    y = -220;
    x = 2750;
    imges;
    speed = 0;
    world;
    bossEnergy = 100;
    enemyDead = false;
    bossWalk = false;
    dieTime = 10;
    bossAttack = false;
    bossisDead = false;
    // walking_sound = new Audio('audio/chicken.mp3');

    offSetX = 270;
    offSetY = 270;
    offSetWidth = 550;
    offSetHeight = 370;
    offSetWidthAttack = 90;


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
     * draw the attack animation
     */
    attackAnimation = setInterval(() => {
        if (this.attackTime >= 0) {
            this.animationRepeat(this.imges.Image_Attack)
            this.imges.Image_Die.splice(0, 1)
            this.attackTime--;
        } else if (this.attackTime < 0) {
            clearInterval(attackAnimation);
        }
    }, 100);


    /**
     * draw the boss
     * 
     * @param {class} world - class of the world
     */
    constructor(world) {
        super();
        this.selectCurrentImages();
        this.otherDierection = true;
        this.world = world;
        this.loadDifferentImages();
        this.AnimationMove();
        this.animationEnemie();
    }


    /**
     * view the corpse depending on the respective images
     */
    showCorpse() {
        if (this.dieTime == 0 && this.enemyIndex == 1) {
            this.dieAnimation = this.loadImage('troll/1/Troll_01_1_DIE_009.png');
        } else if (this.dieTime == 0 && this.enemyIndex == 2) {
            this.dieAnimation = this.loadImage('troll/2/Troll_02_1_DIE_009.png');
        } else if (this.dieTime == 0 && this.enemyIndex == 3) {
            this.dieAnimation = this.loadImage('troll/3/Troll_03_1_DIE_009.png');
        }
    }


    /**
     * load the different images of the boss
     */
    loadDifferentImages() {
        this.loadImagesArray(this.imges.Image_Walking);
        this.loadImagesArray(this.imges.Image_Attack);
        this.loadImagesArray(this.imges.Image_Die);
        this.loadImagesArray(this.imges.Image_Hurt);
        this.loadImagesArray(this.imges.Image_Run);
    }


    /**
     * Selection of images according to the selected index
     */
    selectCurrentImages() {
        if (this.enemyIndex == 1) {
            this.loadImage('troll/1/Troll_01_1_WALK_000.png');
            this.imges = new Troll_Image1;
        } else if (this.enemyIndex == 2) {
            this.loadImage('troll/2/Troll_02_1_WALK_000.png');
            this.imges = new Troll_Image2;
        } else if (this.enemyIndex == 3) {
            this.loadImage('troll/3/Troll_03_1_WALK_000.png');
            this.imges = new Troll_Image3;
        }
    }


    /**
     * moves the boss to the left
     */
    AnimationMove() {
        setInterval(() => {
            if (!this.enemyDead) {
                this.walkleft(this.speed);
            }
            this.checkBossAlife();
        }, 1000 / 60);
    }


    /**
     * animation for run, attack or die
     */
    animationEnemie() {
        setInterval(() => {
            if (!this.enemyDead) {
                if (!this.bossAttack && this.speed > 0 && this.bossEnergy >= 51) {
                    this.animationRepeat(this.imges.Image_Walking);
                } else if (!this.bossAttack && this.speed > 0 && this.bossEnergy < 51) {
                    this.animationRepeat(this.imges.Image_Run);
                    this.speed = 3;
                }
                if (this.bossAttack && this.speed == 0) {
                    this.speed = 0
                    this.animationRepeat(this.imges.Image_Attack);
                }
            } else {
                this.bossDies();
            }
        }, 200);
    }


    /**
     * boss dies
     */
    bossDies() {
        this.bossisDead = true;
        this.dieAnimationEnemy;
        setTimeout(() => {
            this.y += 1;
        }, 2000);
    }


    /**
     * query the boss energy
     * 
     * @param {number} damage - damage dealt to the boss
     */
    setEnemyDead(damage) {
        this.bossEnergy = this.bossEnergy - damage;
        if (this.bossEnergy <= 0) {
            this.bossEnergy = 0;

        }
    }


    /**
     * query if the boss is alive
     */
    checkBossAlife() {
        if (this.bossEnergy == 0) {
            this.enemyDead = true;
        }
    }
}