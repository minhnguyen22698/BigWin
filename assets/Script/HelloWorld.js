cc.Class({
    extends: cc.Component,

    properties: {
        titleWin: cc.Sprite,
        money: cc.Label,
        coin: cc.Prefab,
        firework: cc.Prefab,
        _oldVal: {
            default: 0,
            notify: function () {
                this.updateScore()
            }
        }
    },

    onLoad: function () {
        this.titleWin.node.active = false;
        this.money.node.active = false
        this.node.on('win', this.onWin.bind(this))
    },
    updateScore() {
        let dollarUSLocale = Intl.NumberFormat('en-US');
        this.money.string = '$ ' + dollarUSLocale.format(Math.floor(this._oldVal));
    },
    onWin() {
        cc.log(this.money.node.x + ':' + this.money.node.y)
        this.titleWin.node.active = true
        this.money.node.active = true
        var label = this.titleWin.node.children[0]
        cc.tween(label)
            .repeatForever(
                cc.tween(label)
                    .to(1, { scale: 3 })
                    .to(1, { scale: 2 })
            )
            .start();
        cc.tween(this)
            .to(10, { _oldVal: 1000000 })
            .start()
        this.dropMoney()
        cc.tween(this.money.node)
            .to(10, { position: cc.v2(0, -84) })
            .start();
    },
    dropMoney() {
        for (let i = 0; i < 20; i++) {
            var coins = cc.instantiate(this.coin)
            coins.x = 0
            coins.y = 0
            coins.scale = 0.2
            cc.log(coins.x)
            if (i < 20 / 2) {
                var bezier = [cc.v2(coins.x - 20, coins.y + 200), cc.v2(coins.x - 50 * i, coins.y - 500), cc.v2(coins.x - 100 * i, -cc.winSize.height)];
            }
            else {
                var bezier = [cc.v2(coins.x + 20 * (i % 10), coins.y + 200), cc.v2(coins.x + 50 * (i % 10), coins.y - 500), cc.v2(coins.x + 100 * (i % 10), -cc.winSize.height)];
            }
            var bezierBy = cc.bezierBy(1, bezier);
            var seq = cc.sequence(cc.delayTime(i / 2), bezierBy, cc.callFunc(() => { this.onFirework() }))
            coins.runAction(seq)
            this.node.addChild(coins)
        }
    },
    onFirework() {
        cc.log('huhu')
        var path = [
            [-480, 640],
            [480, 640]
        ];
        path.map(item => {
            var fireitem = cc.instantiate(this.firework)
            var action = cc.moveTo(2, cc.v2(item[0], item[1]))
            fireitem.runAction(action)
            this.node.addChild(fireitem)
        })
    },
    update(dt) {
    }
});
