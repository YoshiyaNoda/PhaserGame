//ここの中にパラメーターを定義する
export default class Girl {
    constructor(){
        this.runLeftV = -160;
        this.runRightV = 160;
        this.jumpV = -550;
        this.attackDamage1 = 7; //近いときのダメージ量
        this.attackDamage2 = 2; //遠いときのダメージ量
        this.weaponDamage = 0.2;
        this.weaponV = 700;
    }

}