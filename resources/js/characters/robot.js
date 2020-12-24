//ここの中にパラメーターを定義する
export default class Robot {
    constructor(){
        this.runLeftV = -120;
        this.runRightV = 120;
        this.jumpV = -550;
        this.attackDamage1 = 9; //近いときのダメージ量
        this.attackDamage2 = 3; //遠いときのダメージ量
        this.weaponDamage = 0.5;
        this.weaponV = 300;
    }

}