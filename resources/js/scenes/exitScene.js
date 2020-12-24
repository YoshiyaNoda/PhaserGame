export default class ExitScene extends Phaser.Scene {
    constructor() {
        super({'key': 'ExitScene'});
    }

    preload() {

    }

    create() {
        this.scene.start('EntryScene');
    }
}