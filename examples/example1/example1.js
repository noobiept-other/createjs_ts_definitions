var STAGE;
window.onload = function () {
    var canvas = document.querySelector('#theCanvas');
    canvas.width = 800;
    canvas.height = 400;
    STAGE = new createjs.Stage(canvas);
    var text = new createjs.Text("createjs", "20px monospace");
    text.x = 100;
    text.y = 100;
    var tween = createjs.Tween.get(text, {
        loop: true
    });
    tween.to({
        rotation: 0
    }, 0, createjs.Ease.backOut);
    tween.to({
        rotation: 90
    }, 500, createjs.Ease.backOut);
    tween.to({
        rotation: 180
    }, 500, createjs.Ease.backOut);
    tween.to({
        rotation: 270
    }, 500, createjs.Ease.backOut);
    tween.to({
        rotation: 360
    }, 500, createjs.Ease.backOut);
    tween.call(something, [
        1, 
        2, 
        3
    ]);
    STAGE.addChild(text);
    createjs.Ticker.addListener(tick);
};
function something(one, two, three) {
    console.log(one, two, three);
}
function tick() {
    STAGE.update();
}
