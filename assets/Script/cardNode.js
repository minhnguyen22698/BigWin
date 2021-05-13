// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        firstCard: cc.Button,
        middleCard: cc.Button,
        lastCard: cc.Button,
        tuturial: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.firstCard.node.on('click', this.onWin, this)
        cc.tween(this.tuturial.node)
            .repeatForever(
                cc.tween(this.tuturial.node)
                    .to(1, { opacity: 0 })
                    .to(1, { opacity: 255 })
            )
            .start();
    },
    onWin() {
        this.node.active = false
        // this.node.dispatchEvent( new cc.Event.EventCustom('foobar', true) );
        var evt = new cc.Event.EventCustom('win', true)
        this.node.dispatchEvent(evt)
    },

    start() {

    },

    // update (dt) {},
});
