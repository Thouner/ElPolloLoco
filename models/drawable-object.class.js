class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;

    x;
    y;
    height;
    width;

    xBox;
    yBox;
    heightBox;
    widthBox;

   





    /**
     * loadImage('img/image1.png')
     * 
     * @param {string} path - 'img/image1.png'
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" scr>
        this.img.src = path;
    }


    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error type:', e);
            // debugger;
            console.log('image', this.img.src);
        }
    }

    /**
     * loadImage Array
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', 'img/image3.png',...] 
     */
    loadImagesArray(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }


    drawFrame(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.xBox, this.yBox, this.widthBox, this.heightBox);
            ctx.stroke();
        }
        if (this instanceof Enemies) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + 120, this.y + 130, this.width - 240, this.height - 170);
            ctx.stroke();
        }
        if (this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x + 270, this.y + 270, this.width - 550, this.height - 370);
            ctx.stroke();
        }
    }



}