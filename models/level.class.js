class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    treasure;
    bomb;
    goldChest;
    leftoverMeat;
    sky;
    level_end_x = 3000;


    /**
     * draw all objects of the respective level
     * 
     * @param {class} enemies - class of the enemy 
     * @param {class} endboss - class of the boss
     * @param {class} clouds - class of the cloud
     * @param {class} backgroundObjects - class of the background  
     * @param {class} treasure - class of the treasure
     * @param {class} sky - class of the sky
     * @param {class} bomb - class of the bomb
     * @param {class} goldChest - class of the chest  
     * @param {class} leftoverMeat - class of the meat 
     */
    constructor(enemies, endboss, clouds, backgroundObjects, treasure, sky, bomb, goldChest, leftoverMeat) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.treasure = treasure;
        this.sky = sky;
        this.bomb = bomb;
        this.goldChest = goldChest;
        this.leftoverMeat = leftoverMeat;
    }
}