class Character extends MovableObject {
    height = 280;
    width = 280;
    x = 0;
    y = -150;
    speed = 5;

    imges;
    world;
    groundlevel = 180;
    dieTime = 7;

    walking_sound = new Audio('audio/walk.mp3');

    dieAnimation = setInterval(() => {
        if (this.isDead() && this.dieTime > 0) {
            this.animationRepeat(this.imges.Image_Die);
            this.imges.Image_Die.splice(0, 1)
            this.dieTime--;
        }
        if (this.dieTime == 0 && this.characterSelection == 1) {
            this.dieAnimation = this.loadImage('pirat/png/1/1_entity_000_DIE_006.png');
        } else if (this.dieTime == 0 && this.characterSelection == 2) {
            this.dieAnimation = this.loadImage('pirat/png/2/2_entity_000_DIE_006.png');
        } else if (this.dieTime == 0 && this.characterSelection == 3) {
            this.dieAnimation = this.loadImage('pirat/png/3/Dead8.png');
        }
    }, 150);


    constructor() {
        super();
        this.selectCurrentCharacter();
        this.applyGravity(this.groundlevel);

        this.setgroundLevel();

        this.loadImagesArray(this.imges.Image_Walking);
        this.loadImagesArray(this.imges.Image_Jump);
        this.loadImagesArray(this.imges.Image_Idle);
        this.loadImagesArray(this.imges.Image_Die);
        this.loadImagesArray(this.imges.Image_Attack);
        this.loadImagesArray(this.imges.Image_Hurt);

        this.animationCharater();
    }


    selectCurrentCharacter() {
        if (this.characterSelection == 1) {
            this.loadImage('pirat/png/1/1_entity_000_IDLE_000.png');
            this.imges = new Pirat_Image1();
        } else if (this.characterSelection == 2) {
            this.loadImage('pirat/png/2/2_entity_000_IDLE_000.png');
            this.imges = new Pirat_Image2();
        } else if (this.characterSelection == 3) {
            this.loadImage('pirat/png/3/Idle1.png');
            this.imges = new Pirat_Image3();
            this.width = 180;
            this.height = 180;
        }
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
                this.dieAnimation;
            }
        }, 120);
    }


    jumpOnOrk() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.jumpsOnTop(enemy) && this.isAboveGround()) {
                let i = this.world.level.enemies.indexOf(enemy);
                // console.log('treffer', i);
                this.world.level.enemies[i].setEnemyDead();
            }
        });
    }


    checkBossCollusion() {
        this.world.level.endboss.forEach((boss) => {
            if (!boss.enemyDead && this.isCollidingBoss(boss)) {
                this.hit(4);
                this.world.statusBar.setPercentage(this.energy);
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



    checkOrkCollusion() {
        this.world.level.enemies.forEach((enemy) => {
            if (!enemy.enemyDead && this.isCollidingEnemies(enemy)) {
                this.hit(2);
                this.world.statusBar.setPercentage(this.energy);
            }
        });
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