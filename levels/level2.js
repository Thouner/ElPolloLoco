const level2 = new Level(
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
        new Cloud2(-880),
        new Cloud2(0),
        new Cloud2(880),
        new Cloud2(880 * 2),
        new Cloud2(880 * 3),
        new Cloud2(880 * 4),
    ], [
        new BackgroundObject('beach/game_background_4/layers/sea.png', -880),
        new BackgroundObject('beach/game_background_4/layers/land.png', -880),
        new BackgroundObject('beach/game_background_4/layers/decor.png', -880),

        new BackgroundObject('beach/game_background_4/layers/sea.png', 0),
        new BackgroundObject('beach/game_background_4/layers/land.png', 0),
        new BackgroundObject('beach/game_background_4/layers/decor.png', 0),

        new BackgroundObject('beach/game_background_4/layers/sea.png', 880),
        new BackgroundObject('beach/game_background_4/layers/land.png', 880),
        new BackgroundObject('beach/game_background_4/layers/decor.png', 880),

        new BackgroundObject('beach/game_background_4/layers/sea.png', 880 * 2),
        new BackgroundObject('beach/game_background_4/layers/land.png', 880 * 2),
        new BackgroundObject('beach/game_background_4/layers/decor.png', 880 * 2),
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
        new Sky('beach/game_background_4/layers/sky.png', -880),
        new Sky('beach/game_background_4/layers/sun.png', -880),
        new Sky('beach/game_background_4/layers/sky.png', 0),
        new Sky('beach/game_background_4/layers/sun.png', 0),
        new Sky('beach/game_background_4/layers/sky.png', 880),
        new Sky('beach/game_background_4/layers/sun.png', 880),
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
let cloudCount2 = 5;
let backgroundCount2 = 3;
let minusDistanceMultiplier2 = 1;

timecountCloud();
timecountBackground();



function timeOrk() {
    level2.enemies.push(new Enemies(800 + this.orkDistance * this.orkMultiplikator));
}

function timecountCloud() {
    setInterval(() => {
        addClouds();
        cloudCount2 += 1
        minusDistanceMultiplier2 += 1
    }, 15000);
}

function timecountBackground() {
    setInterval(() => {
        addBackgrounds();
        backgroundCount2 += 1
    }, 5000);
}


function addClouds() {
    level2.clouds.push(new Cloud2(880 * cloudCount2 - 282 * minusDistanceMultiplier2));
}

function addBackgrounds() {

    level2.backgroundObjects.push(new BackgroundObject('beach/game_background_4/layers/sea.png', 880 * backgroundCount2));
    level2.backgroundObjects.push(new BackgroundObject('beach/game_background_4/layers/land.png', 880 * backgroundCount2));
    level2.backgroundObjects.push(new BackgroundObject('beach/game_background_4/layers/decor.png', 880 * backgroundCount2));
    level2.sky.push(new Sky('beach/game_background_4/layers/sky.png', 880 * backgroundCount2));
    level2.sky.push(new Sky('beach/game_background_4/layers/sun.png', 880 * backgroundCount2));
}