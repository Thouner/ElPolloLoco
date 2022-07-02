class Character extends MovableObject {
    height = 280;
    width = 280;
    x = 0;
    y = -150;
    speed = 5;
    gameOver = false;
    gameWon = false;
    characterSelection = 1;
    imges;
    world;
    groundlevel = 180;
    dieTime = 7;

    offSetX = 40;
    offSetY = 65;
    offSetWidth = 170;
    offSetHeight = 90;

    offSetWidthAttack = 90;

    walking_sound = new Audio('audio/walk.mp3');


    /**
     * draw the death animation
     */
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


    /**
     * draw the silver character
     * 
     * @param {number} number - number of selected character
     * @param {class} world - class of the world
     */
    constructor(number, world) {
        super();
        this.world = world;
        this.characterSelection = number;
        this.energy = 100;
        this.selectCurrentCharacter();
        this.applyGravity(this.groundlevel);
        this.loadDifferentImages();
        this.animationCharater();
        this.dieTime = this.imges.Image_Die.length;
    }


    /**
     * load the different images of the character
     */
    loadDifferentImages() {
        this.loadImagesArray(this.imges.Image_Walking);
        this.loadImagesArray(this.imges.Image_Jump);
        this.loadImagesArray(this.imges.Image_Idle);
        this.loadImagesArray(this.imges.Image_Die);
        this.loadImagesArray(this.imges.Image_Attack);
        this.loadImagesArray(this.imges.Image_Hurt);
    }


    /**
     * Selection of images according to the selected character
     */
    selectCurrentCharacter() {
        if (this.characterSelection == 1) {
            this.selectFirstCharacter();
        } else if (this.characterSelection == 2) {
            this.selectSecondCharacter();
        } else if (this.characterSelection == 3) {
            this.selectThirdCharacter();
        }
    }


    /**
     * loading the first character
     */
    selectFirstCharacter() {
        this.loadImage('pirat/png/1/1_entity_000_IDLE_000.png');
        this.imges = new Pirat_Image1();
    }


    /**
     * loading the secound character
     */
    selectSecondCharacter() {
        this.offSetWidthAttack = 0;
        this.energy = 80;
        this.loadImage('pirat/png/2/2_entity_000_IDLE_000.png');
        this.imges = new Pirat_Image2();
    }


    /**
     * loading the third character
     */
    selectThirdCharacter() {
        this.loadImage('pirat/png/3/Idle1.png');
        this.imges = new Pirat_Image3();
        this.width = 180;
        this.height = 180;
        this.offSetX = 65;
        this.offSetY = 15;
        this.offSetWidth = 85;
        this.offSetHeight = 10;
        this.groundlevel = 250;
    }


    /**
     * animation of the character
     */
    animationCharater() {
        this.movementsOfCharacter();
        this.animationTheMovementsOfCharacter();
    }

    /**
     * movements of the character   
     */
    movementsOfCharacter() {
        setInterval(() => {
            if (!this.isDead() && !this.gameWon) {
                this.playWalkSound();
                this.moveToTheRight();
                this.moveToTheLeft();
                this.jumpMovement();
                this.world.camera_x = -this.x + 100;
                this.goBoss();
            }
        }, 1000 / 60);
    }


    /**
     * animate the various movements of the character
     */
    animationTheMovementsOfCharacter() {
        setInterval(() => {
            this.checkEnemieCollusion();
            if (!this.isDead()) {
                this.animateDifferentMovements();
            } else {
                this.characterDies();
            }
        }, 120);
    }


    checkEnemieCollusion() {
        // this.goBoss();
        this.jumpOnOrk();
        this.ckeckAttackOrDamage();
    }


    animateDifferentMovements() {
        this.animationToIdle();
        this.animationToHurt();
        this.animationToWalk();
        this.animationToAttack();
        this.animationToJump();
        this.attack();
    }


    characterDies() {
        this.gameOver = true;
        this.dieAnimation;
    }


    animationToIdle() {
        if (!this.isAboveGround() && !this.isDead() && !this.isHurt() && !this.gameWon) {
            this.animationRepeat(this.imges.Image_Idle);
        }
    }
    animationToHurt() {
        if (this.isHurt() && !this.isDead() && !this.gameWon) {
            this.animationRepeat(this.imges.Image_Hurt);
        }
    }
    animationToWalk() {
        if (this.world.keyboard.RIGHT && !this.isAboveGround(this.groundlevel) || this.world.keyboard.LEFT && !this.isAboveGround(this.groundlevel)) {
            this.animationRepeat(this.imges.Image_Walking);
        }
    }
    animationToAttack() {
        if (this.isAttack() && !this.isDead() && !this.gameWon) {
            this.animationRepeat(this.imges.Image_Attack);
        }
    }
    animationToJump() {
        if (this.isAboveGround(this.groundlevel)) {
            this.animationRepeat(this.imges.Image_Jump);
        }
    }



    ckeckAttackOrDamage() {
        if (this.attackEnemy) {
            this.checkAttackCollusion();
            this.checkAttackBossCollusion();
        } else {
            this.checkBossCollusion();
            this.checkOrkCollusion();
        }
    }


    moveToTheRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.walkRight(this.speed);
            this.walking_sound.play();
            this.currentPosion = this.x;
        }
    }

    moveToTheLeft() {
        if (this.world.keyboard.LEFT && this.x > -600) {
            this.walkleft(this.speed);
            this.walking_sound.play();
        }
    }

    jumpMovement() {
        if (this.world.keyboard.SPACE && !this.isAboveGround(this.groundlevel)) {
            this.jump();
        }
    }


    playWalkSound() {
        this.walking_sound.pause();
        this.walking_sound.playbackRate = 2.4;
    }


    jumpOnOrk() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.jumpsOnTop(enemy) && this.isAboveGround(this.groundlevel)) {
                let i = this.world.level.enemies.indexOf(enemy);
                this.world.level.enemies[i].setEnemyDead();
                this.removeDeadOrc(i);
            }
        });
    }


    removeDeadOrc(i) {
        setTimeout(() => {
            this.world.level.enemies.splice(i, 1);
        }, 20000);
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
                this.removeDeadOrc(i);
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
                if (!this.isAboveGround(this.groundlevel)) {
                    this.jump();
                }
            }, 1300);
            setTimeout(() => {
                this.world.level.endboss[0].bossWalk = true;
                this.world.level.endboss[0].bossAttack = false;
                this.world.level.endboss[0].speed = 1.2;
            }, 1700);
        }
    }


    letCharacterJump() {
        setTimeout(() => {
            if (!this.isAboveGround(this.groundlevel)) {
                this.jump();
            }
        }, 1300);
    }


    letBossGo() {
        setTimeout(() => {
            this.world.level.endboss[0].bossWalk = true;
            this.world.level.endboss[0].bossAttack = false;
            this.world.level.endboss[0].speed = 1.2;
        }, 1700);
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