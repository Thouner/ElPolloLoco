const level1 = new Level(
    [
        // new Enemies(800),
        // new Enemies(1200),
        // new Enemies(1600),
        // new Enemies(2000),
        // new Enemies(2400),
        // new Enemies(2800),
        // new Enemies(3200),
        // new Enemies(3600),
        // new Enemies(4000),
        // new Enemies(4400),
        // new Enemies(4800),
        // new Enemies(5200),
        // new Enemies(5600),
        // new Enemies(6000),

    ], [
        new Endboss(),
    ], [
        new Cloud(-880),
        new Cloud(0),
        new Cloud(880),
        new Cloud(880 * 2),
        new Cloud(880 * 3),
        new Cloud(880 * 4),
    ], [
        new BackgroundObject('beach/game_background_2/layers/sea.png', -880),
        new BackgroundObject('beach/game_background_2/layers/island.png', -880),
        new BackgroundObject('beach/game_background_2/layers/land.png', -880),
        new BackgroundObject('beach/game_background_2/layers/decor.png', -880),

        new BackgroundObject('beach/game_background_2/layers/sea.png', 0),
        new BackgroundObject('beach/game_background_2/layers/island.png', 0),
        new BackgroundObject('beach/game_background_2/layers/land.png', 0),
        new BackgroundObject('beach/game_background_2/layers/decor.png', 0),

        new BackgroundObject('beach/game_background_2/layers/sea.png', 880),
        new BackgroundObject('beach/game_background_2/layers/island.png', 880),
        new BackgroundObject('beach/game_background_2/layers/land.png', 880),
        new BackgroundObject('beach/game_background_2/layers/decor.png', 880),

        new BackgroundObject('beach/game_background_2/layers/sea.png', 880 * 2),
        new BackgroundObject('beach/game_background_2/layers/island.png', 880 * 2),
        new BackgroundObject('beach/game_background_2/layers/land.png', 880 * 2),
        new BackgroundObject('beach/game_background_2/layers/decor.png', 880 * 2),

        new BackgroundObject('beach/game_background_2/layers/sea.png', 880 * 3),
        new BackgroundObject('beach/game_background_2/layers/island.png', 880 * 3),
        new BackgroundObject('beach/game_background_2/layers/land.png', 880 * 3),
        new BackgroundObject('beach/game_background_2/layers/decor.png', 880 * 3),

        new BackgroundObject('beach/game_background_2/layers/sea.png', 880 * 4),
        new BackgroundObject('beach/game_background_2/layers/island.png', 880 * 4),
        new BackgroundObject('beach/game_background_2/layers/land.png', 880 * 4),
        new BackgroundObject('beach/game_background_2/layers/decor.png', 880 * 4),
    ], [
        new Treasure(-325, 380),
        new Treasure(-350, 410),
        new Treasure(-300, 410),
        new Treasure(-225, 380),
        new Treasure(-250, 410),
        new Treasure(-200, 410),

        new Treasure(200, 150),
        new Treasure(250, 100),
        new Treasure(300, 50),
        new Treasure(350, 50),
        new Treasure(400, 100),
        new Treasure(450, 150),

        new Treasure(1200, 150),
        new Treasure(1250, 100),
        new Treasure(1300, 50),
        new Treasure(1350, 50),
        new Treasure(1400, 100),
        new Treasure(1450, 150),

        new Treasure(2200, 150),
        new Treasure(2250, 100),
        new Treasure(2300, 50),
        new Treasure(2350, 50),
        new Treasure(2400, 100),
        new Treasure(2450, 150),
    ], [
        new Sky('beach/game_background_2/layers/sky.png', -880),
        new Sky('beach/game_background_2/layers/sky.png', 0),
        new Sky('beach/game_background_2/layers/sky.png', 880),
    ], [
        new bomb(250, 300),
        new bomb(750, 300),
        new bomb(1250, 300),
        new bomb(1750, 300),
        new bomb(2250, 300),
    ], [
        new goldChest(3000, 250),
    ], [
        new leftoverMeat(2450, 400, 1),
        new leftoverMeat(2550, 420, 2),
        new leftoverMeat(2650, 410, 3),
        new leftoverMeat(2720, 430, 4),
        new leftoverMeat(2770, 420, 5),
        new leftoverMeat(2800, 400, 6),
        new leftoverMeat(2830, 420, 7),
        new leftoverMeat(2860, 410, 8),
        new leftoverMeat(2890, 430, 9),
        new leftoverMeat(2910, 410, 10),
        new leftoverMeat(2940, 400, 11),
        new leftoverMeat(2980, 420, 12),
        new leftoverMeat(3000, 390, 13),
        new leftoverMeat(3050, 420, 14),
        new leftoverMeat(3100, 400, 15),
    ],
)
let cloudCount = 5;
let backgroundCount = 5;
let minusDistanceMultiplier = 1;

this.plusscloud;


/**
 * interval for adding the clouds
 */
plusscloud = setInterval(() => {
    addClouds();
    cloudCount += 1
    minusDistanceMultiplier += 1
}, 15000);



/**
 * adding the next clouds
 */
function addClouds() {
    level1.clouds.push(new Cloud(880 * cloudCount - 282 * minusDistanceMultiplier));
}