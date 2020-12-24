import Me from '../objects/me'
import Enemy from '../objects/enemy'
import Weapon from '../objects/weapon'
import WeaponEnemy from '../objects/weaponEnemy'
import Barrier from '../objects/barrier'
import attackAction from '../attackAction/attackAction'
import attackActionEnemy from '../attackAction/attackActionEnemy'
import Robot from '../characters/robot'
import Girl from '../characters/girl'

// import Peer from 'skyway-js';
 const Peer = require('skyway-js');


window.characterSelect; //これでキャラクターを判別

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super({'key': 'BattleScene'});
        this.status = true;
        this.time;
        this.stageOn = true;
    }

    async generatePeer() {
        window.peer = new Peer({key: '328bda96-2a26-43d4-bbac-1c40f80da03f', debug: 3});
        window.peer.on('open', () => {
            window.console.log('Peer ID', window.peer.id);
            window.document.getElementById('myPeerId').innerText = window.peer.id;
        });

        // 相手からデータ通信の接続要求イベントが来た場合、このconnectionイベントが呼ばれる
        // - 渡されるconnectionオブジェクトを操作することで、データ通信が可能
        const self = this;
        window.peer.on('connection', function(connection){
            // データ通信用に connectionオブジェクトを保存しておく
            window.conn = connection;
        
            // 接続が完了した場合のイベントの設定
            window.conn.on("open", function() {
                // 相手のIDを表示する
                // - 相手のIDはconnectionオブジェクトのidプロパティに存在する
                window.console.log('相手のID: ', window.conn.id);
                window.alert("接続が要求されました");
                window.document.getElementById('enemyId').value = window.conn.id;
                window.hasConnection = true;
                self.me.x = 0;
            });
        
            // メッセージ受信イベントの設定
            window.conn.on("data", data => {
                // window.console.log('recv: ',data);
                const jsonData = JSON.parse(data);
                const enemy = self.enemy;
                enemy.x = jsonData.x;
                enemy.y = jsonData.y;
                enemy.cursorsStatus = jsonData.cursorsStatus;
                enemy.position = jsonData.position;
                self.me.damage = jsonData.damage;
            });
        });
        window.onConnectBtn = () => {
            window.console.log('onclick called');
            const peer_id = window.document.getElementById('enemyId').value;
 
            // 相手への接続を開始する
            window.conn = window.peer.connect(peer_id);
    
            // 接続が完了した場合のイベントの設定
            window.conn.on("open", function() {
                // 相手のIDを表示する
                // - 相手のIDはconnectionオブジェクトのidプロパティに存在する
                // $("#peer-id").text(conn.id);
                window.alert('接続しました');
                window.hasConnection = true;
                self.me.x = 600;
            });
    
            // メッセージ受信イベントの設定
            window.conn.on("data", data => {
                // window.console.log('recv2: ',data);
                const jsonData = JSON.parse(data);
                // this.enemyは不適切
                const enemy = self.enemy;
                enemy.x = jsonData.x;
                enemy.y = jsonData.y;
                enemy.cursorsStatus = jsonData.cursorsStatus;
                enemy.position = jsonData.position;
                self.me.damage = jsonData.damage;


            });
        };

    }
    
    preload ()
    {

        this.load.setBaseURL('.');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('groundSmall', 'assets/groundSmall.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('robotIcon', 'assets/robotIcon.png');
        this.load.image('girlIcon', 'assets/girlIcon.png');
        this.load.spritesheet('barrier', 'assets/barrier.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('robot', 
            'assets/robot.png',
            { frameWidth: 64, frameHeight: 58 }
            //spriteSheet番号 0~9:dead,  10~19:deadLeft,  20~29:idle,  30~39:idleleft,  40~49:jumpRight,  50~59:jumpLeft,  60~67:attackRight,  68~75:attackLeft,
            //               76~83:runRight,  84~91:runLeft,  92~95:shootRight,  96~99:shootLeft

        );
        this.load.spritesheet('girl', 
            'assets/girl.png',
            { frameWidth: 64, frameHeight: 64 }
            //spriteSheet番号 0~9:dead,  10~19:deadLeft,  20~29:idle,  30~39:idleLeft,  40~49:jump,  50~59:jumpLeft,  60~66:attack,  67~73:attackLeft,
            //               74~81:run,  82~89:runLeft,  90~92:shoot,  93~95:shootLeft
        );

        
        this.load.spritesheet('robotWeapon','assets/robotWeapon.png',{frameWidth: 37.1, frameHeight: 30});
        this.load.spritesheet('girlWeapon','assets/girlWeapon.png',{frameWidth: 37.1, frameHeight: 30});
        
    }
    create ()
    {
        
        //ES6の仕様上ここでメンバを定義せざるをえない(constructorでthisを引数には渡せないから)
        this.me = new Me(this, this.cameras.main.width / 2, 0);
        this.enemy = new Enemy(this, this.cameras.main.width / 2, 0);
        this.weapon = new Weapon(this, this.cameras.main.width / 2, 0);
        this.weaponEnemy = new WeaponEnemy(this, this.cameras.main.width / 2, 0);
        this.action = new attackAction(this, this.cameras.main.width / 2, 0, this.me, this.enemy, this.weapon);
        this.actionEnemy = new attackActionEnemy(this, this.cameras.main.width / 2, 0, this.enemy, this.me, this.weaponEnemy);
        this.barrier =  new Barrier (this, this.cameras.main.width / 2, 0);
        if(window.characterSelect == 0){
            this.para = new Robot();
        }else if(window.characterSelect == 1){
            this.para = new Girl();
        }

        
        //TSなら必要なかったけど、今回はcreate()などを用意して第二のコンストラクタを作る必要がある。
        // なくてもできるけどupdate()する度にインスタンスを生成するので無駄
        this.me.create();
        this.enemy.create();
        this.weapon.create();
        this.weaponEnemy.create();
        this.action.create();
        this.actionEnemy.create();

        this.meDamageText = this.add.text(200, 550, '0%', { fontSize: '32px', fill: '#000' });
        this.enemyDamageText = this.add.text(600, 550, '0%', { fontSize: '32px', fill: '#000' });
        this.meLifeText = this.add.text(260, 560, '×3', { fontSize: '20px', fill: '#000' });
        this.enemyLifeText = this.add.text(660, 560, '×3', { fontSize: '20px', fill: '#000' });


        // Peer2Peer
        this.generatePeer();
        




        this.background = this.add.image(400,300,'background');
        window.platforms = this.physics.add.staticGroup();
        window.platforms.create(400, 500, 'ground').refreshBody();
        if(this.stageOn)
        {
            window.platforms.create(530, 330, 'groundSmall');
            window.platforms.create(270, 330, 'groundSmall');
            window.platforms.create(400, 170, 'groundSmall');
        }


        //depthで画像の順番を指定
        this.background.depth = 0;
      
        this.meDamageText.depth = 3;
        this.enemyDamageText.depth =4;
        this.meLifeText.depth = 5;
        this.enemyLifeText.depth =6;

        this.me.depth = 7;
        this.enemy.depth = 8;
        this.barrier.depth =9;
        this.weapon.depth = 12;
        this.weaponEnemy.depth = 16;

        this.anims.create({
            key: 'guard',
            frames: this.anims.generateFrameNumbers('barrier', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        //robot
        if (window.characterSelect == 0) {

            this.anims.create({
                key: 'deadRight',
                frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 9 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'deadLeft',
                frames: this.anims.generateFrameNumbers('robot', { start: 10, end: 19 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turnRight',
                frames: this.anims.generateFrameNumbers('robot', { start: 20, end: 29 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'turnLeft',
                frames: this.anims.generateFrameNumbers('robot', { start: 30, end: 39 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'jumpRight',
                frames: this.anims.generateFrameNumbers('robot', { start: 40, end: 49 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'jumpLeft',
                frames: this.anims.generateFrameNumbers('robot', { start: 50, end: 59 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'attackRight',
                frames: this.anims.generateFrameNumbers('robot', { start: 60, end: 67 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'attackLeft',
                frames: this.anims.generateFrameNumbers('robot', { start: 68, end: 75 }),
                frameRate: 20,
                repeat: -1
            });

           this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('robot', { start: 76, end: 83 }),
                frameRate: 20,
                repeat: -1
            });       

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('robot', { start: 84, end: 91 }),
                frameRate: 20,
                repeat: -1
            });

           this.anims.create({
                key: 'shootRight',
                frames: this.anims.generateFrameNumbers('robot', { start: 92, end: 95 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'shootLeft',
                frames: this.anims.generateFrameNumbers('robot', { start: 96, end: 99 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'escape',
                frames: this.anims.generateFrameNumbers('robot', { start: 20, end: 29 }),
                frameRate: 0.01,
                repeat: -1
            });

            this.anims.create({
                key: 'weaponLeft',
                frames: this.anims.generateFrameNumbers('robotWeapon', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: -1
            })
            this.anims.create({
                key: 'weaponRight',
                frames: this.anims.generateFrameNumbers('robotWeapon', { start: 5, end: 9 }),
                frameRate: 10,
                repeat: -1
            })

            this.background = this.add.image(200,565,'robotIcon');
            this.background = this.add.image(600,565,'robotIcon');


    
        }

        //girl
        if (window.characterSelect == 1) {

            this.anims.create({
                key: 'deadRight',
                frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 9 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'deadLeft',
                frames: this.anims.generateFrameNumbers('girl', { start: 10, end: 19 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turnRight',
                frames: this.anims.generateFrameNumbers('girl', { start: 20, end: 29 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'turnLeft',
                frames: this.anims.generateFrameNumbers('girl', { start: 30, end: 39 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'jumpRight',
                frames: this.anims.generateFrameNumbers('girl', { start: 40, end: 49 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'jumpLeft',
                frames: this.anims.generateFrameNumbers('girl', { start: 50, end: 59 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'attackRight',
                frames: this.anims.generateFrameNumbers('girl', { start: 60, end: 66 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'attackLeft',
                frames: this.anims.generateFrameNumbers('girl', { start: 67, end: 73 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('girl', { start: 74, end: 81 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('girl', { start: 82, end: 89 }),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'shootRight',
                frames: this.anims.generateFrameNumbers('girl', { start: 90, end: 92 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'shootLeft',
                frames: this.anims.generateFrameNumbers('girl', { start: 93, end: 95 }),
                frameRate: 10,
                repeat: -1
            });



            this.anims.create({
                key: 'escape',
                frames: this.anims.generateFrameNumbers('girl', { start: 20, end: 29 }),
                frameRate: 0.01,
                repeat: -1
            });

            this.anims.create({
                key: 'weaponLeft',
                frames: this.anims.generateFrameNumbers('girlWeapon', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: -1
            })
            this.anims.create({
                key: 'weaponRight',
                frames: this.anims.generateFrameNumbers('girlWeapon', { start: 5, end: 9 }),
                frameRate: 10,
                repeat: -1
            })

            this.background = this.add.image(200,565,'girlIcon');
            this.background = this.add.image(600,565,'girlIcon');


    
        }

       

       

        
    
        //collider
        this.physics.add.collider(this.me, window.platforms);
        this.physics.add.collider(this.enemy, window.platforms);
        this.physics.add.collider(this.me, this.weapon);
        this.physics.add.collider(this.enemy, this.weaponEnemy);


    }
    
    update()
    {   
        if(window.hasConnection) {
            window.conn.send(JSON.stringify({x: this.me.x, y: this.me.y, cursorsStatus: this.me.cursorsStatus, damage: this.enemy.damage, position: this.me.position}));
        }

        this.meDamageText.setText(Math.floor(this.me.damage)+'%');
        this.enemyDamageText.setText(Math.floor(this.enemy.damage)+'%');
        this.meLifeText.setText('×'+this.me.lifeCount);
        this.enemyLifeText.setText('×'+this.enemy.lifeCount);

        //死んだときのアクション、クリックしてスタート画面に戻る
        if(this.me.lifeCount == 0 || this.enemy.lifeCount == 0){
            this.startText = this.add.text(400, 420, 'Return To Start')            
            
            this.startText.setFontFamily('fantasy')
            this.startText.setFontSize(50)
            this.startText.setOrigin(0.5)
            this.startText.setColor('Yellow')
            
            this.clickText = this.add.text(400, 385, '↓click↓')
            this.clickText.setFontFamily('fantasy')
            this.clickText.setFontSize(20)
            this.clickText.setOrigin(0.5)
            this.clickText.setColor('Yellow')

            if(this.me.lifeCount == 0){
                this.endText = this.add.text(400, 260, 'You Lose', { fontSize: '50px', fill: '#000' })
                this.endText.setFontFamily('fantasy')
                this.endText.setFontSize(50)
                this.endText.setOrigin(0.5)
                this.endText.setColor('red')
            }
            if(this.enemy.lifeCount == 0){
                this.endText = this.add.text(400, 260, 'You Win', { fontSize: '50px', fill: '#000' })
                this.endText.setFontFamily('fantasy')
                this.endText.setFontSize(50)
                this.endText.setOrigin(0.5)
                this.endText.setColor('red')
            }
            this.me.depth = -1;
            this.enemy.depth =-1;
            this.startText.setInteractive()
            this.startText.on('pointerdown', () => {
                    this.scene.start('EntryScene')
                })

        }

        this.me.update();
        this.enemy.update();
        this.barrier.update();
        this.action.update();
        this.actionEnemy.update();
        this.weapon.update(this.me.x,this.me.y,this.me.position,this.para);
        this.weaponEnemy.update(this.enemy.x,this.enemy.y,this.enemy.position,this.para, this.enemy.cursorsStatus);

    }
}