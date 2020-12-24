export default class EntryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EntryScene' });
        this.name = "sato";
    }

    preload() {
        console.log('entry');
        this.load.baseURL = 'http://examples.phaser.io/assets/';
        this.load.crossOrigin = 'anonymous';
        this.load.image('sky', 'particlestorm/sky10.png')





        // Load remaining assets here
        //ここでゲームに使用する画像・音楽などを読み込んでいく
    }

    create() {



        this.background = this.add.image(400, 300, 'sky');
        this.titleText = this.add.text(400, 150, 'Super Smash Bros Z', this.fontStyle);
        this.clickText = this.add.text(400, 465, '↓click↓', this.fontStyle)
        this.startText = this.add.text(400, 500, 'Start', this.fontStyle);

        　　　　　
        this.titleText.setFontFamily('fantasy')
        this.clickText.setFontFamily('fantasy')
        this.startText.setFontFamily('fantasy')

        this.titleText.setOrigin(0.5)
        this.clickText.setOrigin(0.5)
        this.startText.setOrigin(0.5)

        this.titleText.setFontSize(50)
        this.clickText.setFontSize(20)
        this.startText.setFontSize(50)

        this.titleText.setColor('Red')
        this.clickText.setColor('Yellow')
        this.startText.setColor('Yellow')　　　　　



        // ここから追加
        this.startText.setInteractive()
        this.startText.on('pointerdown', () => {
            this.scene.start('MakeSessionScene')
        });
        // ここまで;



    };

    update() {

    };



}