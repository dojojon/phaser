
const FADE_ITEM_ALPHA = 0.3;

export class HeadsUpDisplay extends Phaser.Group {

    constructor(game) {

        super(game);

        this.player = game.player;

        this.key_gold = this.createKey(0);
        this.key_red = this.createKey(1);
        this.key_green = this.createKey(2);
        this.key_blue = this.createKey(3);

        this.sword = this.game.add.sprite(0, -5, 'player_m', 25);
        this.sword.scale.setTo(2, 2);
        this.sword.fixedToCamera = true;

        this.sword.alpha = FADE_ITEM_ALPHA;

    }

    createKey(index) {
        const key = this.game.add.sprite((index + 1) * 32, 0, 'keys', index);
        key.alpha = FADE_ITEM_ALPHA;
        key.fixedToCamera = true;
        key.scale.setTo(2, 2);
        this.add(key);
        return key;
    }

    update() {

        if (this.player && this.player.inventory) {

            if (this.player.hasWeapon) {
                this.sword.alpha = 1;
            }

            this.player.inventory.forEach((item) => {
                switch (item) {
                    case 'key_red':
                        this.key_red.alpha = 1;
                        break;
                    case 'key_blue':
                        this.key_blue.alpha = 1;
                        break;
                    case 'key_green':
                        this.key_green.alpha = 1;
                        break;
                    case 'key_gold':
                        this.key_gold.alpha = 1;
                        break;
                }
            });
        }

    }

}