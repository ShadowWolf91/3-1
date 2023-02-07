(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Video_HTML5 Canvas_atlas_1", frames: [[1981,255,38,38],[1232,684,342,305],[1576,684,342,305],[912,684,318,337],[0,859,282,351],[1981,73,63,63],[284,1003,235,87],[1836,991,188,198],[1981,138,65,60],[1981,0,63,71],[1069,0,454,340],[1525,0,454,340],[1232,991,300,300],[555,0,512,317],[555,319,454,340],[1011,342,454,340],[1467,342,454,340],[1981,200,57,53],[0,517,454,340],[456,661,454,340],[0,0,553,515],[1534,991,300,300]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_41 = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Б = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Г = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Соединитеельныйшнуридетектор = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.Штатив = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.Back = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.BatInto = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.ClosedCase = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.head = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.HeadPhones = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.K = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Opened = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.OpenedCase = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.Tablo = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.Tumbl = function() {
	this.initialize(ss["Video_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.replaybttn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3E3E3E").ss(1,1,1).p("ADLn5Qg7gLhAAAQhmAAhbAdQiOAshxBxQhQBRguBeQg8B9AACUQAAEHC6C6QC6C6EGAAQECAAC3izIEdAAQgyBLhEBEQkAEAlrAAQlpAAkBkAQkAkAAAlrQAAkkCnjgQAog1AxgxQCqipDXg6QBvgdB6AAQCQAAB+AoAFUrkICGjoIDCH4IowCCIBeii");
	this.shape.setTransform(-292.3875,-30.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AolLMQkAkAAAlqQAAkkCnjgQAog1AxgxQCqipDXg5QBvgeB6AAQCQAAB+AoIABgEICGjoIDCH5IowCBIBeiiIABgEQg7gMhAAAQhmAAhbAdQiOAshxBxQhQBRguBfQg8B8AACUQAAEHC6C6QC6C6EGgBQECAAC3iyIEdAAQgyBLhEBDQkAEBlrAAQlpAAkBkBg");
	this.shape_1.setTransform(-292.3875,-30.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0000CC").s().p("AolLMQkAkAAAlqQAAkkCnjgQAog1AxgxQCqipDXg5QBvgeB6AAQCQAAB+AoIABgEICGjoIDCH5IowCBIBeiiIABgEQg7gMhAAAQhmAAhbAdQiOAshxBxQhQBRguBfQg8B8AACUQAAEHC6C6QC6C6EGgBQECAAC3iyIEdAAQgyBLhEBDQkAEBlrAAQlpAAkBkBg");
	this.shape_2.setTransform(-292.3875,-30.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000033").s().p("AolLMQkAkAAAlqQAAkkCnjgQAog1AxgxQCqipDXg5QBvgeB6AAQCQAAB+AoIABgEICGjoIDCH5IowCBIBeiiIABgEQg7gMhAAAQhmAAhbAdQiOAshxBxQhQBRguBfQg8B8AACUQAAEHC6C6QC6C6EGgBQECAAC3iyIEdAAQgyBLhEBDQkAEBlrAAQlpAAkBkBg");
	this.shape_3.setTransform(-292.3875,-30.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-373.9,-128.6,163.09999999999997,196.6);


(lib.playbttn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ap1saIAAY1ITrsWg");
	this.shape.setTransform(-146,-7.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ap1saITrMfIzrMWg");
	this.shape_1.setTransform(-146,-7.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0000CC").s().p("Ap1saITrMfIzrMWg");
	this.shape_2.setTransform(-146,-7.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000033").s().p("Ap1saITrMfIzrMWg");
	this.shape_3.setTransform(-146,-7.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210,-87.9,128,161);


(lib.pausebttn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ABho0IDZAAIAARpIjZAAgAk5o0IDZAAIAARpIjZAAg");
	this.shape.setTransform(-387.7,-55.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("ABhI1IAAxpIDZAAIAARpgAk5I1IAAxpIDZAAIAARpg");
	this.shape_1.setTransform(-387.7,-55.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("ABqo0IDuAAIAARpIjuAAgAlXo0IDuAAIAARpIjuAAg");
	this.shape_2.setTransform(-387.75,-55.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0000CC").s().p("ABqI1IAAxpIDtAAIAARpgAlXI1IAAxpIDuAAIAARpg");
	this.shape_3.setTransform(-387.75,-55.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("ABko0IDgAAIAARpIjgAAgAlDo0IDgAAIAARpIjgAAg");
	this.shape_4.setTransform(-387.75,-55.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000033").s().p("ABkI1IAAxpIDgAAIAARpgAlDI1IAAxpIDgAAIAARpg");
	this.shape_5.setTransform(-387.75,-55.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-423.1,-112.9,70.70000000000005,115);


// stage content:
(lib.Video_HTML5Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,2684];
	this.streamSoundSymbolsList[0] = [{id:"FullWork",startFrame:0,endFrame:2684,loop:1,offset:0},{id:"FullWork",startFrame:0,endFrame:1,loop:1,offset:0}];
	this.streamSoundSymbolsList[2684] = [{id:"фон",startFrame:2684,endFrame:2765,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("FullWork",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1,1);
		var soundInstance = playSound("FullWork",0);
		this.InsertIntoSoundStreamData(soundInstance,0,2684,1);
		/* this.stop();
		
		playvip.addEventListener(MouseEvent.CLICK, f1);
		
		function f1(event: MouseEvent): void {
			play();
		}
		
		pause.addEventListener(MouseEvent.CLICK, f2);
		
		function f2(event: MouseEvent): void {
			stop();
		}
		
		replay.addEventListener(MouseEvent.CLICK, f3);
		
		function f3(event: MouseEvent): void {
			gotoAndStop(0);
		}*/
		this.stop();
		
		var _this = this;
		/*
		Щелкните заданный экземпляр символа, чтобы выполнить функцию.
		*/
		_this.playvip.on('click', function(){
		/*
		Воспроизвести фрагмент ролика/видео или текущей временной шкалы.
		Воспроизводит указанный фрагмент ролика или видео.
		*/
		_this.play();
		});
		
		
		var _this = this;
		/*
		Щелкните заданный экземпляр символа, чтобы выполнить функцию.
		*/
		_this.pause.on('click', function(){
		/*
		Остановить фрагмент ролика/видео
		Останавливает воспроизведение указанного фрагмента ролика или видео.
		*/
		_this.stop();
		});
		
		
		var _this = this;
		/*
		Щелкните заданный экземпляр символа, чтобы выполнить функцию.
		*/
		_this.replay.on('click', function(){
		/*
		Перемещает точку воспроизведения на кадр с указанным номером и останавливает воспроизведение.
		Может использоваться на основной временной шкале или на временной шкале фрагмента ролика.
		*/
		_this.gotoAndStop(1);
		});
	}
	this.frame_2684 = function() {
		var soundInstance = playSound("фон",0);
		this.InsertIntoSoundStreamData(soundInstance,2684,2765,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2684).call(this.frame_2684).wait(81));

	// Слой_3
	this.replay = new lib.replaybttn();
	this.replay.name = "replay";
	this.replay.setTransform(313.45,372.45,0.279,0.279,0,0,0,0.2,0);
	new cjs.ButtonHelper(this.replay, 0, 1, 2);

	this.pause = new lib.pausebttn();
	this.pause.name = "pause";
	this.pause.setTransform(458.7,390.65,0.4597,0.4597);
	new cjs.ButtonHelper(this.pause, 0, 1, 2);

	this.playvip = new lib.playbttn();
	this.playvip.name = "playvip";
	this.playvip.setTransform(377.95,366.85,0.3168,0.3168,0,0,0,0,0.3);
	new cjs.ButtonHelper(this.playvip, 0, 1, 2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(5,2,1,3,true).p("ABLhFIiVCL");
	this.shape.setTransform(207.825,145.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(5,2,1,3,true).p("AAqhFIhTCL");
	this.shape_1.setTransform(220.925,148.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(5,2,1,3,true).p("AAWhSIgrCl");
	this.shape_2.setTransform(207.4,146.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(5,2,1,3,true).p("AgqhJIBVCT");
	this.shape_3.setTransform(192.225,146.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(5,2,1,3,true).p("Ag7g7IB3B4");
	this.shape_4.setTransform(179.625,148.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.playvip},{t:this.pause},{t:this.replay}]}).to({state:[{t:this.playvip},{t:this.pause},{t:this.replay}]},1).to({state:[{t:this.shape},{t:this.playvip},{t:this.pause},{t:this.replay}]},1448).to({state:[{t:this.shape_1},{t:this.playvip},{t:this.pause},{t:this.replay}]},158).to({state:[{t:this.shape_2},{t:this.playvip},{t:this.pause},{t:this.replay}]},62).to({state:[{t:this.shape_3},{t:this.playvip},{t:this.pause},{t:this.replay}]},22).to({state:[{t:this.shape_4,p:{x:179.625,y:148.95}},{t:this.playvip},{t:this.pause},{t:this.replay}]},33).to({state:[{t:this.playvip},{t:this.pause},{t:this.replay}]},217).to({state:[{t:this.shape_4,p:{x:194.625,y:169.95}},{t:this.playvip},{t:this.pause},{t:this.replay}]},6).wait(818));

	// Слой_1
	this.instance = new lib.ClosedCase();
	this.instance.setTransform(50,35);

	this.instance_1 = new lib.OpenedCase();
	this.instance_1.setTransform(57,11,0.9471,0.9471);
	this.instance_1._off = true;

	this.instance_2 = new lib.Back();
	this.instance_2.setTransform(14,-74,1.7067,1.7067);
	this.instance_2._off = true;

	this.instance_3 = new lib.Opened();
	this.instance_3.setTransform(50,5);
	this.instance_3._off = true;

	this.instance_4 = new lib.BatInto();
	this.instance_4.setTransform(8,43);
	this.instance_4._off = true;

	this.instance_5 = new lib.head();
	this.instance_5.setTransform(51,31);
	this.instance_5._off = true;

	this.instance_6 = new lib.Tablo();
	this.instance_6.setTransform(236,177,0.131,0.1243);

	this.instance_7 = new lib.HeadPhones();
	this.instance_7.setTransform(392,426,1,1,180);

	this.instance_8 = new lib.Соединитеельныйшнуридетектор();
	this.instance_8.setTransform(84,72);

	this.instance_9 = new lib.Tumbl();
	this.instance_9.setTransform(327,-3,0.3927,0.3927);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(9,2,1,3,true).p("AmUGvIMqtc");
	this.shape_5.setTransform(310.9,129.2);

	this.instance_10 = new lib.CachedBmp_42();
	this.instance_10.setTransform(195.7,279.75,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_30();
	this.instance_11.setTransform(263,79.8,0.5,0.5);

	this.instance_12 = new lib.K();
	this.instance_12.setTransform(293,250);

	this.instance_13 = new lib.CachedBmp_32();
	this.instance_13.setTransform(355.3,8.05,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_33();
	this.instance_14.setTransform(263,3.05,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_35();
	this.instance_15.setTransform(263,10.05,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_37();
	this.instance_16.setTransform(263,26.05,0.5,0.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(9,2,1,3,true).p("AoSCgIQkk/");
	this.shape_6.setTransform(254.35,301.375);

	this.instance_17 = new lib.Г();
	this.instance_17.setTransform(324,271,0.6683,0.6683);

	this.instance_18 = new lib.CachedBmp_39();
	this.instance_18.setTransform(263,26.05,0.5,0.5);

	this.instance_19 = new lib.Штатив();
	this.instance_19.setTransform(397.55,419.05,0.8665,0.8705,0,118.4295,-61.5701);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(5,2,1,3,true).p("Ag7g7IB3B4");
	this.shape_7.setTransform(196.625,169.95);

	this.instance_20 = new lib.Б();
	this.instance_20.setTransform(303,262,0.7523,0.7523);

	this.instance_21 = new lib.CachedBmp_41();
	this.instance_21.setTransform(185.05,160.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},243).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_1}]},199).to({state:[{t:this.instance_1}]},6).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_2}]},75).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_3}]},55).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},5).to({state:[{t:this.instance_4}]},111).to({state:[{t:this.instance_4}]},5).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_5},{t:this.instance_6}]},90).to({state:[{t:this.instance_5},{t:this.instance_6}]},5).to({state:[{t:this.instance_5},{t:this.instance_6}]},137).to({state:[{t:this.instance_5},{t:this.instance_6}]},5).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},49).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_5}]},59).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:392,y:426,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:392,y:426,scaleX:1,scaleY:1}}]},5).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:392,y:426,scaleX:1,scaleY:1}}]},9).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:392,y:426,scaleX:1,scaleY:1}}]},5).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:335,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:84,scaleX:1,scaleY:1,y:72}}]},1).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:335,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:84,scaleX:1,scaleY:1,y:72}}]},5).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:335,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:84,scaleX:1,scaleY:1,y:72}}]},100).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:335,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:84,scaleX:1,scaleY:1,y:72}}]},5).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:327,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:76,scaleX:1,scaleY:1,y:72}},{t:this.shape_5},{t:this.instance_9,p:{x:327}}]},1).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:327,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:76,scaleX:1,scaleY:1,y:72}},{t:this.shape_5},{t:this.instance_9,p:{x:327}}]},5).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:327,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:76,scaleX:1,scaleY:1,y:72}},{t:this.shape_5},{t:this.instance_9,p:{x:327}}]},120).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:327,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:76,scaleX:1,scaleY:1,y:72}},{t:this.shape_5},{t:this.instance_9,p:{x:327}}]},5).to({state:[{t:this.instance_12},{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_11},{t:this.instance_9,p:{x:326}},{t:this.instance_10},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}}]},1).to({state:[{t:this.instance_12},{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_11},{t:this.instance_9,p:{x:326}},{t:this.instance_10},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}}]},5).to({state:[{t:this.instance_12},{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_11},{t:this.instance_9,p:{x:326}},{t:this.instance_10},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}}]},73).to({state:[{t:this.instance_12},{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_11},{t:this.instance_9,p:{x:326}},{t:this.instance_10},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}},{t:this.instance_13}]},158).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_9,p:{x:326}},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}},{t:this.instance_14},{t:this.instance_12},{t:this.instance_10}]},62).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_9,p:{x:326}},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}},{t:this.instance_15},{t:this.instance_12},{t:this.instance_10}]},22).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_9,p:{x:326}},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}},{t:this.instance_16},{t:this.instance_12},{t:this.instance_10}]},33).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}},{t:this.instance_12},{t:this.shape_6,p:{x:254.35,y:301.375}}]},29).to({state:[{t:this.instance_17},{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}},{t:this.shape_6,p:{x:277.15,y:308.975}}]},91).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}}]},92).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:326,y:407,scaleX:1,scaleY:1}},{t:this.instance_9,p:{x:326}},{t:this.instance_8,p:{x:75,scaleX:1,scaleY:1,y:72}},{t:this.instance_18},{t:this.instance_12},{t:this.instance_10}]},5).to({state:[{t:this.shape_7,p:{x:196.625}},{t:this.instance_5},{t:this.instance_7,p:{x:316.2,y:398,scaleX:0.8705,scaleY:0.8705}},{t:this.instance_8,p:{x:98,scaleX:0.8705,scaleY:0.8705,y:106}},{t:this.instance_19}]},1).to({state:[{t:this.instance_5},{t:this.instance_7,p:{x:316.2,y:398,scaleX:0.8705,scaleY:0.8705}},{t:this.instance_8,p:{x:98,scaleX:0.8705,scaleY:0.8705,y:106}},{t:this.instance_19}]},5).to({state:[{t:this.instance_21},{t:this.instance_5},{t:this.instance_7,p:{x:316.2,y:398,scaleX:0.8705,scaleY:0.8705}},{t:this.instance_8,p:{x:98,scaleX:0.8705,scaleY:0.8705,y:106}},{t:this.instance_19},{t:this.instance_10},{t:this.instance_20}]},348).to({state:[{t:this.shape_7,p:{x:194.625}},{t:this.instance_5},{t:this.instance_7,p:{x:316.2,y:398,scaleX:0.8705,scaleY:0.8705}},{t:this.instance_8,p:{x:98,scaleX:0.8705,scaleY:0.8705,y:106}},{t:this.instance_19}]},15).to({state:[{t:this.shape_7,p:{x:194.625}},{t:this.instance_5},{t:this.instance_7,p:{x:316.2,y:398,scaleX:0.8705,scaleY:0.8705}},{t:this.instance_8,p:{x:98,scaleX:0.8705,scaleY:0.8705,y:106}},{t:this.instance_19}]},454).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(243).to({x:51},5).to({_off:true,scaleX:0.9471,scaleY:0.9471,x:57,y:11},1).wait(2516));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(248).to({_off:false},1).wait(210).to({_off:true,scaleX:1.7067,scaleY:1.7067,x:14,y:-74},1).wait(2305));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(459).to({_off:false},1).wait(86).to({_off:true,scaleX:1,scaleY:1,x:50,y:5},1).wait(432).to({_off:false,scaleX:1.4,scaleY:1.4,x:66,y:-10},0).wait(59).to({_off:true,scaleX:1,scaleY:1,x:46,y:8},1).wait(1726));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(546).to({_off:false},1).wait(66).to({_off:true,x:8,y:43},1).wait(2151));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(613).to({_off:false},1).wait(121).to({_off:true,x:51,y:31},1).wait(2029));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(735).to({_off:false},1).wait(242).to({_off:true},1).wait(59).to({_off:false,x:46,y:8},1).wait(69).to({x:45.95,y:-17.95},1).wait(5).to({x:46,y:-18},0).wait(15).to({x:-11,y:-37},0).wait(111).to({x:-19},0).wait(131).to({x:-20},0).wait(571).to({scaleX:0.8705,scaleY:0.8705,x:15,y:11},0).wait(823));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(147,126,437.9,312);
// library properties:
lib.properties = {
	id: '228370F1C461394E9E45C1557E91F5BA',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Video_HTML5 Canvas_atlas_1.png?1666736483604", id:"Video_HTML5 Canvas_atlas_1"},
		{src:"sounds/фон_.mp3?1666736483652", id:"фон"},
		{src:"sounds/FullWork.mp3?1666736483652", id:"FullWork"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['228370F1C461394E9E45C1557E91F5BA'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;