window.onload = function () {
    init();
};
var canvas;
var stage;
var img = new Image();
var bmpAnimList;
function init() {
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);
    img = new Image();
    img.src = "assets/testSeq.png";
    img.onload = handleImageLoad;
}
function handleImageLoad(event) {
    var w = canvas.width;
    var h = canvas.height;
    var spriteSheet = new createjs.SpriteSheet({
        images: [
            img
        ],
        frames: {
            width: 64,
            height: 68,
            regX: 32,
            regY: 34
        },
        animations: {
            walkUpRt: [
                0, 
                19, 
                "walkRt"
            ],
            walkDnRt: [
                20, 
                39, 
                "walkUpRt"
            ],
            walkRt: [
                41, 
                59, 
                "walkDnRt"
            ]
        }
    });
    createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
    var bmpAnim = new createjs.BitmapAnimation(spriteSheet);
    bmpAnim.gotoAndPlay("walkRt");
    bmpAnim.onAnimationEnd = angleChange;
    var l = 50;
    bmpAnimList = [];
    for(var i = 0; i < l; i++) {
        bmpAnim.name = "rat" + i;
        bmpAnim.speed = Math.random() * 6 + 2;
        bmpAnim.direction = 90;
        bmpAnim.vX = bmpAnim.speed;
        bmpAnim.vY = 0;
        bmpAnim.x = Math.random() * (w - 220) + 60 | 0;
        bmpAnim.y = Math.random() * (h - 220) + 0 | 0;
        bmpAnim.currentAnimationFrame = Math.random() * spriteSheet.getNumFrames("walkRt") | 0;
        stage.addChild(bmpAnim);
        bmpAnimList.push(bmpAnim);
        if(i < l - 1) {
            bmpAnim = bmpAnim.clone();
        }
    }
    createjs.Ticker.addListener(window);
}
function handleImageError(e) {
}
function tick() {
    var l = bmpAnimList.length;
    for(var i = 0; i < l; i++) {
        var bmpAnim = bmpAnimList[i];
        bmpAnim.x += bmpAnim.vX;
        bmpAnim.y += bmpAnim.vY;
    }
    stage.update();
}
function angleChange(bmpAnim, animation) {
    bmpAnim.direction -= 60;
    var angle = bmpAnim.direction * (Math.PI / 180);
    bmpAnim.vX = Math.sin(angle) * bmpAnim.speed;
    bmpAnim.vY = Math.cos(angle) * bmpAnim.speed;
    var nextMap = {
        walkRt: "walkDnRt",
        walkDnRt: "walkDnRt_h",
        walkDnRt_h: "walkRt_h",
        walkRt_h: "walkUpRt_h",
        walkUpRt_h: "walkUpRt",
        walkUpRt: "walkRt"
    };
    bmpAnim.gotoAndPlay(nextMap[animation]);
}
