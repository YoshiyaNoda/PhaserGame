# 手順
1. git pull(あるいはクローンし直す)
2. package.jsonがあるディレクトリで、npm install
3. 同じディレクトリでphp artisan serve

# Phaserの動きについて
1. app.jsからみる
2. configをみる
3. window.onloadでgameインスタンスを生成している(これによってゲームが動く)
4. configのsceneが遷移していく
5. 今のところBattleSceneしか書いていない


