/// <reference path="../../easeljs-0.5.0.d.ts" />

interface MyBitmapAnimation extends createjs.BitmapAnimation
    {
    speed: number;
    direction: number;
    vX: number;
    vY: number;
    }


window.onload = function()
{
init();
};


var canvas: HTMLCanvasElement;

var stage: createjs.Stage;

var img = new Image();
var bmpAnimList;

function init() {
	//find canvas and load images, wait for last image to load
	canvas = <HTMLCanvasElement> document.getElementById("testCanvas");
    
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas);
    
	img = new Image();
	img.src = "assets/testSeq.png";
	img.onload = handleImageLoad;
}

function handleImageLoad(event: MouseEvent) {
	// grab canvas width and height for later calculations:
	var w = canvas.width;
	var h = canvas.height;

	// create spritesheet and assign the associated data.
	var spriteSheet = new createjs.SpriteSheet({
		images: [img],
		frames: {width:64, height:68, regX:32, regY:34},
		animations: {
			walkUpRt:[0,19,"walkRt"],
			walkDnRt:[20,39,"walkUpRt"],
			walkRt:[41,59,"walkDnRt"]
		}
	});

	
	// to save file size, the loaded sprite sheet only includes right facing animations
	// we could flip the display objects with scaleX=-1, but this is expensive in some browsers
	// instead, we append flipped versions of the frames to our sprite sheet
	// this adds only horizontally flipped frames:
	createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);

	// we could rewire the "next" sequences to make them work like so:
	// but instead we will use code in the angleChange function.
	/*
	spriteSheet.getAnimation("walkDnRt").next = "walkDnRt_h";
	spriteSheet.getAnimation("walkDnRt_h").next = "walkRt_h";
	spriteSheet.getAnimation("walkRt_h").next = "walkUpRt_h";
	spriteSheet.getAnimation("walkUpRt_h").next = "walkUpRt";
	*/

	// create a BitmapAnimation instance to display and play back the sprite sheet:
	var bmpAnim = <MyBitmapAnimation> new createjs.BitmapAnimation(spriteSheet);
    
    
	// start playing the first sequence:
	bmpAnim.gotoAndPlay("walkRt");		//animate

	// the callback is called each time a sequence completes:
	bmpAnim.onAnimationEnd = angleChange;

	// create a bunch of rats based on the first one, and place them on stage, and in our collection.
	var l = 50;
	bmpAnimList = [];
	for (var i=0; i<l; i++) {
		bmpAnim.name = "rat"+i;
		bmpAnim.speed = Math.random()*6+2;
		bmpAnim.direction = 90;
		bmpAnim.vX = bmpAnim.speed;
		bmpAnim.vY = 0;
		bmpAnim.x = Math.random()*(w-220)+60|0;
		bmpAnim.y = Math.random()*(h-220)+0|0;

		// have each rat start on a random frame in the "walkRt" animation:
		bmpAnim.currentAnimationFrame = Math.random()*spriteSheet.getNumFrames("walkRt")|0;
		stage.addChild(bmpAnim);
		bmpAnimList.push(bmpAnim);

		// rather than creating a brand new instance each time, and setting every property, we
		// can just clone the current one and overwrite the properties we want to change:
		if (i < l-1) { bmpAnim = <MyBitmapAnimation> bmpAnim.clone(); }
	}

	// we want to do some work before we update the canvas,
	// otherwise we could use Ticker.addListener(stage);
	createjs.Ticker.addListener(window);
}

//called if there is an error loading the image (usually due to a 404)
function handleImageError(e) {
	//console.log("Error Loading Image : " + e.target.src);
}

function tick() {
	// move all the rats according to their vX/vY properties:
	var l = bmpAnimList.length;
	for (var i=0; i<l; i++) {
		var bmpAnim = bmpAnimList[i];
		bmpAnim.x += bmpAnim.vX;
		bmpAnim.y += bmpAnim.vY;
	}

	// update the stage:
	stage.update();
}

function angleChange( bmpAnim: MyBitmapAnimation, animation: string ) {
	//after each sequence ends update the rat's heading and adjust velocities to match
	bmpAnim.direction -= 60;
	var angle = bmpAnim.direction * (Math.PI/180);
	bmpAnim.vX = Math.sin(angle) * bmpAnim.speed;
	bmpAnim.vY = Math.cos(angle) * bmpAnim.speed;
	var nextMap = {walkRt:"walkDnRt",walkDnRt:"walkDnRt_h",walkDnRt_h:"walkRt_h",walkRt_h:"walkUpRt_h",walkUpRt_h:"walkUpRt",walkUpRt:"walkRt"};
	bmpAnim.gotoAndPlay(nextMap[animation]);
}