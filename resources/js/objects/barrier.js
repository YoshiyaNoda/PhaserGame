export default class Barrier extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y,'barrier');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setAccelerationY(-900);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.countDown =0;
    }
    update(){
        if(this.cursors.down.isUp){
            this.countDown = 0;
            this.x = 1000;
            this.y = 1000;
        }
         else if (this.cursors.down.isDown){
            this.countDown ++;
            if(this.cursors.down.isDown  &&  this.countDown >7 && this.countDown < 80){
                this.x = window.meX;
                this.y = window.meY;
                this.anims.play('guard');
        }
    }
        
        
        

    }
}