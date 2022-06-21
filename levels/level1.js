const level1 = new Level(
    [
        new Enemies(800),
        // new Enemies(1200),
        // new Enemies(1600),

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

    ],
)
let cloudCount = 5;
let backgroundCount = 3;
let minusDistanceMultiplier = 1;


timecountCloud();
timecountBackground();


function timecountCloud() {
    setInterval(() => {
        addClouds();
        cloudCount += 1
        minusDistanceMultiplier += 1
    }, 15000);
}

function timecountBackground() {
    setInterval(() => {
        addBackgrounds();
        backgroundCount += 1
    }, 5000);
}


function addClouds() {
    level1.clouds.push(new Cloud(880 * cloudCount - 282 * minusDistanceMultiplier));
}

function addBackgrounds() {

    level1.backgroundObjects.push(new BackgroundObject('beach/game_background_2/layers/sea.png', 880 * backgroundCount));
    level1.backgroundObjects.push(new BackgroundObject('beach/game_background_2/layers/island.png', 880 * backgroundCount));
    level1.backgroundObjects.push(new BackgroundObject('beach/game_background_2/layers/land.png', 880 * backgroundCount));
    level1.backgroundObjects.push(new BackgroundObject('beach/game_background_2/layers/decor.png', 880 * backgroundCount));
    level1.sky.push(new Sky('beach/game_background_2/layers/sky.png', 880 * backgroundCount));
}