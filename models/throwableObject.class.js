class ThrowableObject extends MovableObject {

    height = 220;
    width = 220;
    x = 200;
    y = 200;
    speedForX = 10;
    bombtimer = 10;
    exploNow = false;
    smokeNow = false;
    smokePositionOptimize = false;
    bombContacktEnemy = false;
    addGavity = 280;
    world;
    soundPlay = true;
    throw_sound = new Audio('audio/throw.mp3');
    explo_sound = new Audio('audio/bomb.mp3');
    offSetX = 100;
    offSetY = 100;
    offSetWidth = 200;
    offSetHeight = 200;

    images_Explo = [
        'Bomb/bomb_0009_Layer-1.png',
        'Bomb/bomb_0008_Layer-2.png',
        'Bomb/bomb_0007_Layer-3.png',
        'Bomb/bomb_0006_Layer-4.png',
        'Bomb/bomb_0005_Layer-5.png',
        'Bomb/bomb_0004_Layer-6.png',
        'Bomb/bomb_0003_Layer-7.png',
        'Bomb/bomb_0002_Layer-8.png',
        'Bomb/bomb_0001_Layer-9.png',
        'Bomb/bomb_0000_Layer-10.png',
    ];
    images_Smoke = [
        'Bomb/smoke/Explosion_1_1.png',
        'Bomb/smoke/Explosion_1_2.png',
        'Bomb/smoke/Explosion_1_3.png',
        'Bomb/smoke/Explosion_1_4.png',
        'Bomb/smoke/Explosion_1_5.png',
        'Bomb/smoke/Explosion_1_6.png',
    ];


    /**
     * all animations for the bomb exploding
     */
    exploAnimation = setInterval(() => {
        this.animateExplo();
        this.animateSmoke();
        this.removeBomb();
    }, 120);


    /**
     * draw the bomb
     * 
     * @param {number} x - positioning on the x axis
     * @param {number} y - positioning on the y axis
     * @param {boolean} playerDierection - true if the character walks to the left
     * @param {class} world - class of the world
     */
    constructor(x, y, playerDierection, world) {
        super();
        this.playThrowsound();
        this.world = world;
        this.loadImage('Bomb/bomb_0009_Layer-1.png');
        this.loadImagesArray(this.images_Explo);
        this.loadImagesArray(this.images_Smoke);
        this.x = x;
        this.y = y;
        this.height = 250;
        this.width = 250;
        this.throw(playerDierection);
        this.applyGravity(this.addGavity);
        this.addGavity;
    }


    /**
     * play the throw sound
     */
    playThrowsound() {
        this.throw_sound.play();
        // this.world.audio[10].play();
        this.throw_sound.loop = false;
        this.throw_sound.volume = 0.3;
    }


    /**
     * animation for the exploding bomb
     */
    animateExplo() {
        if (this.exploNow) {
            this.playExplosound();
            this.animationRepeat(this.images_Explo);
            this.bombtimer--;
            this.images_Explo.splice(0, 1)
        }
    }


    playExplosound() {
        if (this.soundPlay) {
            this.explo_sound.play();
            this.explo_sound.loop = false;
            this.explo_sound.volume = 0.1;
            setTimeout(() => {
                this.soundPlay = false;
            }, 250);
        }
    }


    /**
     * animation for the smoke after the explosion
     */
    animateSmoke() {
        if (this.bombtimer <= 0) {
            if (!this.smokePositionOptimize) {
                this.x += 80;
                this.y += 40;
                this.smokePositionOptimize = true;
            }
            this.smokeNow = true
            this.height = 100;
            this.width = 100;
            this.animationRepeat(this.images_Smoke);
        }
    }


    /**
     * remove the bomb/smoke
     */
    removeBomb() {
        if (this.bombtimer == -15) {
            let i = this.world.throwableObject.indexOf(this);
            this.world.throwableObject.splice(i, 1);
        }
    }


    /**
     * determines the direction in which the bomb is thrown
     * 
     * @param {boolean} playerDierection - true if the character walks to the left
     */
    throw (playerDierection) {
        this.speedY = 32;
        if (playerDierection) {
            this.throwLeft();
        } else {
            this.throwRight();
        }
    }


    /**
     * throw the bomb to the left
     */
    throwLeft() {
        setInterval(() => {
            this.x -= this.speedForX;
            this.exploOnGround();
            this.checkEnemyCollusin();
        }, 25);
    }


    /**
     * throw the bomb to the right
     */
    throwRight() {
        setInterval(() => {
            this.x += this.speedForX;
            this.exploOnGround();
            this.checkEnemyCollusin();
        }, 25);
    }


    /**
     * The bomb will explode when it hits the ground
     */
    exploOnGround() {
        if (this.y > 275) {
            this.speedForX = 0;
            this.exploNow = true;
            this.exploAnimation;
        }
    }


    /**
     * query bomb collided with enemy
     */
    checkEnemyCollusin() {
        this.bombCollidesBoss();
        this.bombCollidesEnemy();
    }


    /**
     * bomb collides with boss
     */
    bombCollidesBoss() {
        this.world.level.endboss.forEach(boss => {
            if (this.isCollidingEnemies(boss) && !boss.enemyDead) {
                this.speedForX = 0;
                this.bombHasCollided();
                let i = this.world.level.endboss.indexOf(boss);
                if (!this.exploNow) {
                    this.world.level.endboss[i].setEnemyDead(25);
                }
                this.detonatesBomb();
            }
        });
    }


    /**
     * bomb collides with enemy
     */
    bombCollidesEnemy() {
        this.world.level.enemies.forEach(enemie => {
            if (this.isCollidingEnemies(enemie) && !enemie.enemyDead) {
                this.speedForX = 0;
                this.bombHasCollided();
                let i = this.world.level.enemies.indexOf(enemie);
                if (!this.exploNow) {
                    this.world.level.enemies[i].setEnemyDead();
                }
                this.detonatesBomb();
            }
        });
    }


    /**
     * bomb falls down after collision
     */
    bombHasCollided() {
        if (!this.bombContacktEnemy) {
            this.addGavity = this.y;
            this.applyGravity(this.addGavity);
            this.bombContacktEnemy = true;
        }
    }


    /**
     * detonates the bomb
     */
    detonatesBomb() {
        this.exploNow = true;
        this.exploAnimation;
    }

}