class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    treasure;
    sky;
    level_end_x = 2900;

    constructor(enemies, endboss, clouds, backgroundObjects, treasure, sky) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.treasure = treasure;
        this.sky = sky;
    }
}