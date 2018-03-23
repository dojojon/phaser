export class HealthBar extends Phaser.Group {


    constructor(game) {

        super(game);

        this.player = game.player;

        this.bar = this.game.add.sprite(0, 6, 'health_bar', 6);
        this.bar.scale.setTo(2, 2);
        this.bar.position.setTo(this.game.width - this.bar.width - 6, 6);

        this.add(this.bar);

        this.fixedToCamera = true;

    }

    update() {

        // Calculate the frame to show
        let barIndex = 7 - Math.floor(7 * (this.player.health / 100));

        //If we have gone above 6 (dead) then hide the health bar.
        if (barIndex > 6) {
            barIndex = 6
            this.bar.visible = false;
        }
        // Set the frame to show
        this.bar.frame = barIndex;
    }
}