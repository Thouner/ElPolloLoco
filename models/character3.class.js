class Character3 extends MovableObject {
    height = 180;
    width = 180;
    x = 0;
    y = -150;
    speed = 5;
    gameOver = false;
    gameWon = false;

    imges;
    world;
    groundlevel = 250;
    dieTime = 7;

    offSetX = 40;
    offSetY = 65;
    offSetWidth = 170;
    offSetHeight = 90;

    enemyIndex = Math.floor(Math.random() * (3 - 1 + 1) + 1);

    offSetWidthAttack = 90;

    walking_sound = new Audio('audio/walk.mp3');

    dieAnimation = setInterval(() => {
        if (this.isDead() && this.dieTime > 0) {
            this.animationRepeat(this.imges.Image_Die);
            this.imges.Image_Die.splice(0, 1)
            this.dieTime--;
        }
        if (this.dieTime == 0) {
            this.dieAnimation = this.loadImage('pirat/png/3/Dead8.png');
        }
    }, 150);


    constructor() {
        super();
        this.selectCurrentCharacter();
        this.applyGravity(this.groundlevel);

        this.loadImagesArray(this.imges.Image_Walking);
        this.loadImagesArray(this.imges.Image_Jump);
        this.loadImagesArray(this.imges.Image_Idle);
        this.loadImagesArray(this.imges.Image_Die);
        this.loadImagesArray(this.imges.Image_Attack);
        this.loadImagesArray(this.imges.Image_Hurt);

        this.animationCharater();
        this.dieTime = this.imges.Image_Die.length;
    }


    selectCurrentCharacter() {
        this.loadImage('pirat/png/3/Idle1.png');
        this.imges = new Pirat_Image3();
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

            this.goBoss();
        }, 1000 / 60);


        setInterval(() => {
            this.jumpOnOrk();
            if (this.attackEnemy) {
                this.checkAttackCollusion();
                this.checkAttackBossCollusion();
            } else {
                this.checkBossCollusion();
                this.checkOrkCollusion();
            }

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
                if (this.isAboveGround(180)) {
                    this.animationRepeat(this.imges.Image_Jump);
                }
                this.attack();
            } else {
                this.gameOver = true;
                this.dieAnimation;
            }
        }, 120);
    }


    jumpOnOrk() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.jumpsOnTop(enemy) && this.isAboveGround(180)) {

                let i = this.world.level.enemies.indexOf(enemy);
                this.world.level.enemies[i].setEnemyDead();
                setTimeout(() => {
                    this.world.level.enemies.splice(i, 1);
                }, 20000);
            }
        });
    }


    checkAttackBossCollusion() {
        this.world.level.endboss.forEach((boss) => {
            if (this.isCollidingAttackEnemies(boss) && this.isAttack()) {
                let i = this.world.level.endboss.indexOf(boss);
                this.world.level.endboss[i].setEnemyDead(0.5);

            }
        });
    }


    checkAttackCollusion() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.isCollidingAttackEnemies(enemy)) {
                let i = this.world.level.enemies.indexOf(enemy);
                this.world.level.enemies[i].setEnemyDead();
                setTimeout(() => {
                    this.world.level.enemies.splice(i, 1);
                }, 20000);
            }
        });
    }


    checkBossCollusion() {
        this.world.level.endboss.forEach((boss) => {
            if (!boss.enemyDead && this.isCollidingEnemies(boss)) {
                this.hit(4);
            }
        });
    }


    checkOrkCollusion() {
        this.world.level.enemies.forEach((enemy) => {
            if (!enemy.enemyDead && this.isCollidingEnemies(enemy)) {
                this.hit(2);
            }
        });
    }


    goBoss() {
        if (this.x == 2450 && !this.world.level.endboss[0].bossWalk) {
            this.world.level.endboss[0].bossAttack = true;
            setTimeout(() => {
                if (!this.isAboveGround(180)) {
                    this.jump();
                }
            }, 1300);
            setTimeout(() => {
                this.world.level.endboss[0].bossWalk = true;
                this.world.level.endboss[0].bossAttack = false;
                this.world.level.endboss[0].speed = 0.7;
            }, 1700);
        }
    }

    collectTreasure() {
        this.treasure++;
    }


    collectBombs() {
        this.bombs++;
    }


    minusBombs() {
        this.bombs--;
        if (this.bombs < 0) {
            this.bombs = 0
        }
    }

}