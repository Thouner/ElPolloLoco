class ThrowableObject extends MovableObject {

    height = 220;
    width = 220;
    x = 200;
    y = 200;
    speedForX = 10;
    bombtimer = 10;
    exploNow = false;
    smokeNow = false;
    positionOptimize = false;
    world;

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


    exploAnimation = setInterval(() => {
        if (this.exploNow) {
            this.animationRepeat(this.images_Explo);
            this.bombtimer--;
            this.images_Explo.splice(0, 1)

        }
        if (this.bombtimer <= 0) {
            if (!this.positionOptimize) {
                this.x += 80;
                this.y += 40;
                this.positionOptimize = true;
            }
            this.smokeNow = true
            this.height = 100;
            this.width = 100;
            this.animationRepeat(this.images_Smoke);
        }
        if (this.bombtimer == -10) {
            // console.log(this.world.throwableObject);
            let i = this.world.throwableObject.indexOf(this);
            this.world.level.throwableObject.splice(i, 1);
        }
    }, 100);


    constructor(x, y, playerDierection) {
        super();
        this.loadImage('Bomb/bomb_0009_Layer-1.png');
        this.loadImagesArray(this.images_Explo);
        this.loadImagesArray(this.images_Smoke);
        this.x = x;
        this.y = y;
        this.height = 250;
        this.width = 250;
        this.throw(playerDierection);
    }



    throw (playerDierection) {
        this.speedY = 32;
        this.applyGravity(280);


        if (playerDierection) {
            setInterval(() => {
                this.x -= this.speedForX;
                if (this.y > 275) {
                    this.speedForX = 0;
                    this.exploNow = true;
                    this.exploAnimation;
                    // setInterval(() => {
                    //     if (this.bombtimer > 0) {
                    //         this.animationRepeat(this.images_Explo);
                    //         this.bombtimer--;
                    //         if (this.bombtimer == 1) {
                    //             this.images_Explo.splice(0, 9)
                    //         }
                    //     } else {
                    //         this.animationRepeat(this.images_Smoke);
                    //     }

                    // }, 2000);


                }

            }, 25);
        } else {

            setInterval(() => {
                this.x += this.speedForX;
                if (this.y > 275) {
                    this.speedForX = 0;
                    this.exploNow = true;
                    this.exploAnimation;
                    // setInterval(() => {

                    //     if (this.bombtimer > 0) {
                    //         this.animationRepeat(this.images_Explo);
                    //         this.bombtimer--;
                    //         if (this.bombtimer == 1) {
                    //             this.images_Explo.splice(0, 9)
                    //         }
                    //     } else {
                    //         this.animationRepeat(this.images_Smoke);
                    //     }

                    // }, 2000);


                }
            }, 25);
        }
    }





}