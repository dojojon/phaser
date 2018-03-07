var loadState = {

    preload: function () {

        console.log('load');
        var loadingMessage = game.add.text(80, 150, "Loading....", { font: '30px Courier', fill: '#fff' });
        game.load.image('background', 'assets/background.jpg');

        // Characters
        game.load.spritesheet('characters', 'assets/characters.png', 16, 16);

        // Male Player
        game.load.spritesheet('player_m', 'assets/Tiny16-ExpandedMaleSprites.png', 16, 16);

        // Female Player
        game.load.spritesheet('player_f', 'assets/Tiny16-ExpandedFemaleSprites.png', 16, 16);

        // Female Player
        game.load.spritesheet('skeleton', 'assets/Tiny16-Tiny16-ExpandedSkeletonSprites.png', 16, 16);

        // Tile map data
        game.load.tilemap('test_map', 'assets/test_map.json', null, Phaser.Tilemap.TILED_JSON);

        // Tile map tiles
        game.load.image('basic_tiles', 'assets/basictiles.png');

        //  Sprite sheet of the tiles
        game.load.spritesheet('tiles', 'assets/basictiles.png', 16, 16);

        //Sprite sheet of things
        game.load.spritesheet('things', 'assets/things.png', 16, 16);


    },

    create: function () {

        game.state.start('play');
    }
}