const level1 = new Level(
    [
        new Ork(),
        new Ork(),
        new Ork(),
        new Endboss(),
    ], [
        new Cloud(),
    ], [
        new BackgroundObject('beach/game_background_2/layers/sky.png', -880, 0),
        new BackgroundObject('beach/game_background_2/layers/sea.png', -880, 0),
        new BackgroundObject('beach/game_background_2/layers/island.png', -880, 0),
        new BackgroundObject('beach/game_background_2/layers/land.png', -880, 0),
        new BackgroundObject('beach/game_background_2/layers/decor.png', -880, 0),

        new BackgroundObject('beach/game_background_2/layers/sky.png', 0, 0),
        new BackgroundObject('beach/game_background_2/layers/sea.png', 0, 0),
        new BackgroundObject('beach/game_background_2/layers/island.png', 0, 0),
        new BackgroundObject('beach/game_background_2/layers/land.png', 0, 0),
        new BackgroundObject('beach/game_background_2/layers/decor.png', 0, 0),

        new BackgroundObject('beach/game_background_2/layers/sky.png', 880, 0),
        new BackgroundObject('beach/game_background_2/layers/sea.png', 880, 0),
        new BackgroundObject('beach/game_background_2/layers/island.png', 880, 0),
        new BackgroundObject('beach/game_background_2/layers/land.png', 880, 0),
        new BackgroundObject('beach/game_background_2/layers/decor.png', 880, 0),
    ]
)