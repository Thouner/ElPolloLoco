const level1 = new Level(
    [
        new Enemies(),
        new Enemies(),
        new Enemies(),
        new Endboss(),
    ], [
        new Cloud(-880),
        new Cloud(0),
        new Cloud(880),
        new Cloud(880 * 2),
        new Cloud(880 * 3),
        new Cloud(880 * 4),
    ], [
        new BackgroundObject('beach/game_background_2/layers/sea.png', -880, 0),
        new BackgroundObject('beach/game_background_2/layers/island.png', -880, 0),
        new BackgroundObject('beach/game_background_2/layers/land.png', -880, 0),
        new BackgroundObject('beach/game_background_2/layers/decor.png', -880, 0),

        new BackgroundObject('beach/game_background_2/layers/sea.png', 0, 0),
        new BackgroundObject('beach/game_background_2/layers/island.png', 0, 0),
        new BackgroundObject('beach/game_background_2/layers/land.png', 0, 0),
        new BackgroundObject('beach/game_background_2/layers/decor.png', 0, 0),

        new BackgroundObject('beach/game_background_2/layers/sea.png', 880, 0),
        new BackgroundObject('beach/game_background_2/layers/island.png', 880, 0),
        new BackgroundObject('beach/game_background_2/layers/land.png', 880, 0),
        new BackgroundObject('beach/game_background_2/layers/decor.png', 880, 0),
    ], [
        new Treasure(),
    ], [
        new Sky('beach/game_background_2/layers/sky.png', -880, 0),
        new Sky('beach/game_background_2/layers/sky.png', 0, 0),
        new Sky('beach/game_background_2/layers/sky.png', 880, 0),
    ],
)
let cloudCount = 5;
let minusDistanceMultiplier = 1;


timecount();


function timecount() {
    setInterval(() => {
        addClouds();
        cloudCount += 1
        minusDistanceMultiplier += 1
    }, 15000);
}


function addClouds() {
    level1.clouds.push(new Cloud(880 * cloudCount - 282 * minusDistanceMultiplier));
}