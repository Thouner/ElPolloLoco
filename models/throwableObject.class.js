class ThrowableObject extends MovableObject {

    // height = 220;
    // width = 220;
    // x = 200;
    // y = 200;
    speedForX = 10;
    bombtimer = 9;

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


    constructor(x, y, playerDierection) {
        super();
        this.loadImage('Bomb/bomb_0009_Layer-1.png');
        this.loadImagesArray(this.images_Explo);
        this.x = x;
        this.y = y;
        this.height = 250;
        this.width = 250;
        this.throw(playerDierection);
    }



    throw (playerDierection) {
        if (playerDierection) {
            this.speedY = 32;
            this.applyGravity(280);
            setInterval(() => {
                this.x -= this.speedForX;
                if (this.y > 275) {
                    this.speedForX = 0;
                    // this.exploAnimation;

                    console.log(this.bombtimer);
                    setInterval(() => {
                        if (this.bombtimer > 0) {
                            this.animationRepeat(this.images_Explo);
                            this.bombtimer--;
                            if (this.bombtimer == 1) {
                                this.images_Explo.splice(0, 9)
                            }
                        } else {
                            this.dieAnimation = this.loadImage('Bomb/bomb_0000_Layer-10.png');
                        }

                    }, 150);

                    // this.animationRepeat(this.images_Explo);
                }

            }, 25);
        } else {
            this.speedY = 32;
            this.applyGravity(280);
            setInterval(() => {
                this.x += this.speedForX;
                if (this.y > 275) {
                    this.speedForX = 0;
                    // this.exploAnimation;

                    setInterval(() => {

                        if (this.bombtimer > 0) {
                            this.animationRepeat(this.images_Explo);
                            this.bombtimer--;
                            if (this.bombtimer == 1) {
                                this.images_Explo.splice(0, 9)
                            }
                        } else {
                            this.dieAnimation = this.loadImage('Bomb/bomb_0000_Layer-10.png');
                        }

                    }, 150);

                    // this.animationRepeat(this.images_Explo);
                }
            }, 25);
        }
    }


    exploAnimation = setInterval(() => {

        if (this.bombtimer > 0) {
            // this.animationRepeat(this.images_Explo);
            this.bombtimer--;
            if (this.bombtimer == 1) {
                this.images_Explo.splice(0, 9)
            }
        } else {
            this.dieAnimation = this.loadImage('Bomb/bomb_0000_Layer-10.png');
        }

    }, 150);


}