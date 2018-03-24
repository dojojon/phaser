
export class Load extends Phaser.State {

    preload() {

        console.log('load');
        var loadingMessage = this.game.add.text(80, 150, "Loading....", { font: '30px Courier', fill: '#fff' });
        this.game.load.image('background', 'assets/background.jpg');

        // Characters
        this.game.load.spritesheet('characters', 'assets/characters.png', 16, 16);

        // Male Player
        this.game.load.spritesheet('player_m', 'assets/Tiny16-ExpandedMaleSprites.png', 16, 16);

        // Female Player
        this.game.load.spritesheet('player_f', 'assets/Tiny16-ExpandedFemaleSprites.png', 16, 16);

        // Skeleton
        this.game.load.spritesheet('skeleton', 'assets/Tiny16-ExpandedSkeletonSprites.png', 16, 16);

        // Tile map data
        this.game.load.tilemap('test_map', 'assets/test_map.json', null, Phaser.Tilemap.TILED_JSON);

        // Tile map tiles
        this.game.load.image('basic_tiles', 'assets/basictiles.png');

        // Sprite sheet of the tiles
        this.game.load.spritesheet('tiles', 'assets/basictiles.png', 16, 16);

        // Sprite sheet of things
        this.game.load.spritesheet('things', 'assets/things.png', 16, 16);

        // Sprite sheet of keys
        this.game.load.spritesheet('keys', 'assets/keys.png', 16, 16);

        // Health Bar
        this.game.load.spritesheet('health_bar', 'assets/red-cherry-lifebar.png', 28, 8);

    }

    create() {

        this.game.state.start('play');

    }

}
