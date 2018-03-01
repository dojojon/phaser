var loadState = {

    preload: function () {

        console.log('load');
        var loadingMessage = game.add.text(80, 150, "Loading....", { font: '30px Courier', fill: '#fff' });
        game.load.image('background', 'assets/background.jpg');
        game.load.image('player', 'assets/player.png');
        game.load.spritesheet('characters', 'assets/characters.png', 16, 16);

        game.load.tilemap('test_map', 'assets/test_map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('basic_tiles', 'assets/basictiles.png');

        game.load.spritesheet('tiles', 'assets/basictiles.png', 16, 16);
        game.load.spritesheet('things', 'assets/things.png', 16, 16);


    },

    create: function () {

        game.state.start('play');
    }
}