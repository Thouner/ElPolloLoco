class Level {
    enemies;
    clouds;
    backgroundObjects;
    treasure;
    sky;
    level_end_x = 2900;

    constructor(enemies, clouds, backgroundObjects, treasure, sky) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.treasure = treasure;
        this.sky = sky;
    }
}