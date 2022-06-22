class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    treasure;
    bomb;
    sky;
    level_end_x = 3000;

    constructor(enemies, endboss, clouds, backgroundObjects, treasure, sky, bomb) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.treasure = treasure;
        this.sky = sky;
        this.bomb = bomb;
    }
}