const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
    ], [
        new Cloud(),
    ], [
        // new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', -720, 0),
        // new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', -720, -30),
        // new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', -720, -20),
        // new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', -720, 0),

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