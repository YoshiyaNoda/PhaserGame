export default class MakeSessionScene extends Phaser.Scene {
    constructor() {
        super({'key': 'MakeSessionScene'});
        // this.seekData = {battleId: 0};
        // this.searchPersonData = {status: false};
        // this.idFetchedData = null;
        // this.playerNum = 1;
    }

    // async getMethodSample() {
    //     const url = "http://131.113.98.70:3478/sample";
    //     // const url = "http://localhost:3478/sample";
    //     const meta = {
    //         mode: 'cors',
    //         // credentials: 'include',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     };
    //     try {
    //         await fetch(url, meta)
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //             });
    //     } catch(e) {
    //         console.log('error');
    //         console.log(e);
    //     }
    // }

    // async fetchPlayerId() {
    //     const url = "http://131.113.98.70:3478/fetch_id";
    //     // const url = "http://localhost:3478/fetch_id";
    //     const meta = {
    //         mode: 'cors',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     };
    //     try {
    //         await fetch(url, meta)
    //             .then(response => response.json())
    //             .then(data => {
    //                 this.idFetchedData = data;
    //                 this.playerNum = this.idFetchedData.playerNum;
    //                 console.log('idFetched: ', this.idFetchedData);
    //             });
    //     } catch(e) {
    //         console.log('idFetched: ', 'error');
    //     }
    // }

    // async waitEnemy() {
    //     const url = "http://localhost:3478/wait_enemy";
    //     const meta = {
    //         mode: 'cors',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({'id': this.idFetchedData.playerId})
    //     };
    //     try {
    //         await fetch(url, meta)
    //             .then(response => response.json())
    //             .then(data => {
    //                 this.waitEnemyData = data;
    //                 console.log('wait enemy: ', this.waitEnemyData);
    //             });
    //     } catch(e) {
    //         console.log('wait enemy: ', 'error');
    //     }
    // }

    // async seek() {
    //     // const url = "http://131.113.98.70:3478/seek_rival";
    //     const url = "http://localhost:3478/seek_rival";
    //     const meta = {
    //         mode: 'cors',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({seekData: this.seekData})
    //     };
    //     try {
    //         await fetch(url, meta)
    //             .then(response => response.json())
    //             .then(data => {
    //                 return data;
    //             }
    //         );
    //     } catch(e) {
    //         console.log('error');
    //         return 'error';
    //     }
    // }

    // async searchWhoHasSameId() {
    //     const url = "http://localhost:3478/search_person_who_has_the_same_id";
    //     const meta = {
    //         mode: 'cors',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({battleId: this.seekData.battleId})
    //     };
    //     try {
    //         await fetch(url, meta)
    //             .then(response => response.json())
    //             .then(data => {
    //                 this.searchPersonData = data;
    //                 console.log('search result: ', this.searchPersonData);
    //                 return data;
    //             }
    //         );
    //     } catch(e) {
    //         console.log('seek error');
    //         return 'error';
    //     }

    // }

    preload() {
        console.log('make session');
        this.load.setBaseURL('.');
        this.load.image('girlIntro', 'assets/girlIntro.png');
        this.load.image('robotIntro', 'assets/robotIntro.png');
        this.load.image('makeSession', 'assets/makeSession.png');
        this.startText = this.add.text(400, 500, 'Game Start', this.fontStyle);
        this.startText.setFontFamily('fantasy')
        this.startText.setFontSize(50)
        this.startText.setOrigin(0.5)
        this.startText.setColor('Yellow')

        this.Text = this.add.text(300, 100, 'Character Select', this.fontStyle);
        this.Text.setFontFamily('fantasy')
        this.Text.setFontSize(70)
        this.Text.setOrigin(0.5)
        this.Text.setColor('Red')

        this.clickText1 = this.add.text(400, 470, '↓click↓')
        this.clickText2 = this.add.text(200, 190, '↓click↓')
        this.clickText3 = this.add.text(600, 190, '↓click↓')
        this.clickText1.setFontFamily('fantasy')
        this.clickText1.setFontSize(20)
        this.clickText1.setOrigin(0.5)
        this.clickText1.setColor('Yellow')
        this.clickText2.setFontFamily('fantasy')
        this.clickText2.setFontSize(20)
        this.clickText2.setOrigin(0.5)
        this.clickText2.setColor('Yellow')
        this.clickText3.setFontFamily('fantasy')
        this.clickText3.setFontSize(20)
        this.clickText3.setOrigin(0.5)
        this.clickText3.setColor('Yellow')

    }

    create() {
        // this.getMethodSample();
        // this.seek();
        // this.fetchPlayerId();
        
        // const id = setInterval(() => {
        //     this.waitEnemy();
        //     if(true) {
        //         clearInterval(id);
        //     }
        // }, 3000);
        // this.postPosition();

   
        this.girl = this.add.image(600,300,'girlIntro');
        this.robot = this.add.image(200,300,'robotIntro');
        this.makeSession = this.add.image(400,300,'makeSession');

        this.makeSession.depth = 0;
        this.girl.depth =10;
        this.robot.depth =10;
        this.startText.depth =20;
        this.clickText1.depth =20;
        this.clickText2.depth =20;
        this.clickText3.depth =20;
        this.Text.depth = 20;

        //デフォルトはrobotに
        window.characterSelect = 0


        this.startText.setInteractive()
        this.startText.on('pointerdown', () => {
            this.scene.start('BattleScene')
        });
        this.robot.setInteractive()
        this.robot.on('pointerdown', () => {
            window.characterSelect = 0;
            console.log(window.characterSelect)
        });
        this.girl.setInteractive()
        this.girl.on('pointerdown', () => {
            window.characterSelect = 1;
            console.log(window.characterSelect)
        });
    }
}