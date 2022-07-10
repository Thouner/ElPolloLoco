class Character extends MovableObject {
    height = 280;
    width = 280;
    x = 0;
    y = -150;
    speed = 5;
    gameOver = false;
    gameWon = false;
    movePossilble = true;
    characterSelection = 1;
    imges;
    world;
    groundlevel = 180;
    dieTime = 7;
    hurtSound = true;
    offSetX = 40;
    offSetY = 65;
    offSetWidth = 170;
    offSetHeight = 90;
    offSetWidthAttack = 90;
    charName;


    /**
     * draw the death animation
     */
    dieAnimation = setInterval(() => {
        if (this.isDead() && this.dieTime > 0) {
            this.animationRepeat(this.imges.Image_Die);
            this.imges.Image_Die.splice(0, 1)
            this.dieTime--;
        }
        this.showCorpse();
    }, 150);


    /**
     * draw the character
     * 
     * @param {number} number - number of selected character
     * @param {class} world - class of the world
     */
    constructor(number, world, name) {
        super();
        this.charName = name;
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
     * view the corpse depending on the selected character
     */
    showCorpse() {
        if (this.dieTime == 0 && this.characterSelection == 1) {
            this.dieAnimation = this.loadImage('pirat/png/1/1_entity_000_DIE_006.png');
        } else if (this.dieTime == 0 && this.characterSelection == 2) {
            this.dieAnimation = this.loadImage('pirat/png/2/2_entity_000_DIE_006.png');
        } else if (this.dieTime == 0 && this.characterSelection == 3) {
            this.dieAnimation = this.loadImage('pirat/png/3/Dead8.png');
        }
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
        this.movementsOfCharacter;
        this.animationTheMovementsOfCharacter();
    }


    /**
     * movements of the character
     */
    movementsOfCharacter = setInterval(() => {
        if (!this.isDead() && !this.gameWon) {
            this.playWalkSound();
            this.moveToTheRight();
            this.moveToTheLeft();
            this.jumpMovement();
            this.world.camera_x = -this.x + 100;
            this.goBoss();
        }
    }, 1000 / 60);



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


    /**
     * check the collision with enemies
     */
    checkEnemieCollusion() {
        this.jumpOnOrk();
        this.ckeckAttackOrDamage();
    }


    /**
     * animation of the different movements
     */
    animateDifferentMovements() {
        this.animationToIdle();
        this.animationToHurt();
        this.animationToWalk();
        this.animationToAttack();
        this.animationToJump();
        this.attack();
    }


    /**
     * character dies
     */
    characterDies() {
        this.gameOver = true;
        this.dieAnimation;
    }


    /**
     * animation to idle
     */
    animationToIdle() {
        if (!this.isAboveGround() && !this.isDead() && !this.isHurt() && !this.gameWon) {
            this.animationRepeat(this.imges.Image_Idle);
        }
    }


    /**
     * animation to hurt
     */
    animationToHurt() {
        if (this.isHurt() && !this.isDead() && !this.gameWon) {
            this.animationRepeat(this.imges.Image_Hurt);
            if (this.hurtSound) {
                this.world.audio[9].play();
                this.hurtSound = false;
                setTimeout(() => {
                    this.hurtSound = true;
                }, 1500);
            }
        }
    }


    /**
     * animation to walk
     */
    animationToWalk() {
        if (this.world.keyboard.RIGHT && !this.isAboveGround(this.groundlevel) || this.world.keyboard.LEFT && !this.isAboveGround(this.groundlevel)) {
            this.animationRepeat(this.imges.Image_Walking);
        }
    }


    /**
     * animation to attack
     */
    animationToAttack() {
        if (this.isAttack() && !this.isDead() && !this.gameWon) {
            this.animationRepeat(this.imges.Image_Attack);
        }
    }


    /**
     * animation to jump
     */
    animationToJump() {
        if (this.isAboveGround(this.groundlevel)) {
            this.animationRepeat(this.imges.Image_Jump);
        }
    }


    /**
     * check whether character attacks or takes damage
     */
    ckeckAttackOrDamage() {
        if (this.attackEnemy) {
            this.world.audio[7].play();
            this.world.audio[7].volume = 0.3;
            this.checkAttackCollusion();
            this.checkAttackBossCollusion();
        } else {
            this.world.audio[7].pause();
            this.checkBossCollusion();
            this.checkOrkCollusion();
        }
    }


    /**
     * moves the character to the right
     */
    moveToTheRight() {
        // if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.gameWon && !this.gameOver) {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.gameOver) {
            this.walkRight(this.speed);
            if (!this.isAboveGround(this.groundlevel)) {
                this.world.audio[5].play();
                this.world.audio[5].volume = 0.3;
            }
            this.currentPosion = this.x;
        }
    }


    /**
     * moves the character to the left
     */
    moveToTheLeft() {
        // if (this.world.keyboard.LEFT && this.x > -600 && !this.gameWon && !this.gameOver) {
        if (this.world.keyboard.LEFT && this.x > -600 && !this.gameOver) {
            this.walkleft(this.speed);
            if (!this.isAboveGround(this.groundlevel)) {
                this.world.audio[5].play();
                this.world.audio[5].volume = 0.3;
            }
        }
    }


    /**
     * makes the character jump
     */
    jumpMovement() {
        // if (this.world.keyboard.SPACE && !this.isAboveGround(this.groundlevel) && !this.gameWon && !this.gameOver) {
        if (this.world.keyboard.SPACE && !this.isAboveGround(this.groundlevel) && !this.gameOver) {
            this.jump();
            this.world.audio[6].play();
            this.world.audio[6].volume = 1;
        }
    }


    /**
     * plays running sounds
     */
    playWalkSound() {
        this.world.audio[5].pause();
        this.world.audio[5].playbackRate = 2.4;
    }


    /**
     * check jumping on an enemy
     */
    jumpOnOrk() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.jumpsOnTop(enemy) && this.isAboveGround(this.groundlevel)) {
                let i = this.world.level.enemies.indexOf(enemy);
                this.world.level.enemies[i].setEnemyDead();
                this.removeDeadOrc(i);
            }
        });
    }


    /**
     * removing the dead orc
     */
    removeDeadOrc(i) {
        setTimeout(() => {
            this.world.level.enemies.splice(i, 1);
        }, 20000);
    }


    /**
     * attack the boss
     */
    checkAttackBossCollusion() {
        this.world.level.endboss.forEach((boss) => {
            if (this.isCollidingAttackEnemies(boss) && this.isAttack()) {
                let i = this.world.level.endboss.indexOf(boss);
                this.world.level.endboss[i].setEnemyDead(0.5);

            }
        });
    }


    /**
     * attack the enemy
     */
    checkAttackCollusion() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.isCollidingAttackEnemies(enemy)) {
                let i = this.world.level.enemies.indexOf(enemy);
                this.world.level.enemies[i].setEnemyDead();
                this.removeDeadOrc(i);
            }
        });
    }


    /**
     * get damage from boss
     */
    checkBossCollusion() {
        this.world.level.endboss.forEach((boss) => {
            if (!boss.enemyDead && this.isCollidingEnemies(boss)) {
                this.hit(4);
            }
        });
    }


    /**
     * get damage from enemy
     */
    checkOrkCollusion() {
        this.world.level.enemies.forEach((enemy) => {
            if (!enemy.enemyDead && this.isCollidingEnemies(enemy)) {
                this.hit(2);
            }
        });
    }
}