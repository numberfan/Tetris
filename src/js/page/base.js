;(function() {

	var canvas,
		context,
		cols = 8,//8列
		rows = 14,//16行
		squareW = 60,//块尺寸
		coordinate = [],//网格
		canvasW = cols * squareW,//canvas宽度
		canvasH = rows * squareW,//canvas高度
		nowSquare = [],//当前运动块
		nowX = 0,//当前块X
		nowY = 0,//当前块Y
		isGameOver = false,//游戏是否结束
		score = 0,
		timer = null;

	var Tetris = function() {
		canvas = document.getElementById("mycanvas"),
		context = canvas.getContext("2d");

		canvas.width = canvasW;
		canvas.height = canvasH;

		//初始化坐标系统
		for(var i = 0; i < rows; i++) {
			coordinate[i] = [];
			for(var j = 0; j < cols; j++) {
				coordinate[i][j] = 0;//0无块， 1有块
			}
		}
	};


	Tetris.prototype.init = function() {//列数
		var _this = this;
		_this.drawBackground(context);
		nowX = 3;
		nowY = 0;

		nowSquare = _this.randomSquare();
		_this.createTetris(nowSquare, context);
		/*_this.fall();*/
		timer = setInterval(function() {
			_this.fall();
		}, 500);

		_this.mouseEvent();

		//this.mouseEvent(this.nowSquare);
	};

	Tetris.prototype.randomSquare = function() {//随机方块
		var num = Math.floor(Math.random() * square.length);
		return square[num];
	};

	Tetris.prototype.fall = function() {
		
		if(this.collisionDetect()) {
			nowY = 0;
			nowX = 3;
			nowSquare = this.randomSquare();
		}

		this.clearPrev(nowSquare, context);
		nowY++;
		this.createTetris(nowSquare, context);

		/*this.gameOver();*/
		/*this.score();*/
	};

	Tetris.prototype.gameOver = function() {
		var colLen = coordinate[0].length,
			count = 0;
		for(var i = 0; i < colLen; i++) {
			count = 0;
			for(var j = 0; j < coordinate.length; j++) {
				console.log(coordinate[j][i]);
				if(coordinate[j][i] == 1) {
					count++;
				}
			}
			console.log(count, colLen);
			if(count == colLen) {
				clearInterval(timer);
				alert("Game Over!");
			}
			
		}
	};

	Tetris.prototype.score = function() {
		var count;
		for(var i = 0; i < nowSquare.length; i++) {
			count = true;

			for(var j = 0; j < nowSquare[i].length; j++) {

				if(coordinate[i][j] == 0) {
					count = false;
				}
			}

			if(count) {
				score++;
				console.log("当前分数：" + score);
			}
		}
	};

	Tetris.prototype.collisionDetect = function() {
		if(nowY + nowSquare.length >= coordinate.length) {
			return true;
		} 
		for(var i = nowSquare.length-1;i < nowSquare.length; i++) {
			for(var j = 0; j < nowSquare[i].length; j++) {

				if(nowSquare[i][j] && coordinate[i+nowY+1][j+nowX] == 1) {

					return true;
				}
			}
		}
		return false;
	};

	Tetris.prototype.clearPrev = function(arr) {

		for(var i = 0; i < arr.length; i++) {
			for(var j = 0; j < arr[i].length; j++) {
				coordinate[i+nowY][j+nowX] = 0;
			}
		}
	}; 

	Tetris.prototype.rotate = function() {//数组转换
		var y = nowSquare.length,
			x = nowSquare[0].length,
			arr = [];

		for(var i = 0; i < x; i++) {
			arr.push([]);
		}

		for(var i=0;i<y;i++){
			for(var j=0;j<x;j++){
				arr[j][y-1-i] = nowSquare[i][j]
			}
		}

		nowSquare = arr;
	};

	Tetris.prototype.createTetris = function(arr) {

		for(var i = 0;i < arr.length; i++) {
			for(var j = 0; j < arr[i].length; j++) {
				
				if(!coordinate[i+nowY][j+nowX]){
					coordinate[i+nowY][j+nowX] = arr[i][j];
				}	
			}
		}

		this.renderSquare(coordinate, context);
	};

	Tetris.prototype.drawBackground = function(ctx) {

		for(var i = 0; i < cols; i++) {
			for(var j = 0; j < rows; j++) {
				ctx.strokeStyle = "#000";
				ctx.strokeRect(i*squareW, j*squareW, squareW, squareW);
			}
		}
	};

	Tetris.prototype.renderSquare = function(datas, ctx) {
		for(var i = 0; i < datas.length; i++) {
			for(var j = 0; j < datas[i].length; j++) {
				var _y = i * squareW;
				var _x = j * squareW;
				ctx.save();
				ctx.fillStyle =  coordinate[i][j] == 1 ? "#f00" : "#ccc";
				ctx.strokeStyle = "#000";
				ctx.beginPath();
				ctx.rect(_x, _y, squareW, squareW);
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
				ctx.restore();
			}
		}	
	};	

	Tetris.prototype.mouseEvent = function() {

		var _this = this;

		document.onkeydown = function(event) {
			
			switch(event.keyCode) {
				case 37://left
					_this.clearPrev(nowSquare);
					nowX--;
					if(nowX<=0) {nowX=0;}
					_this.createTetris(nowSquare, context);
					break;
				case 39://right
					_this.clearPrev(nowSquare);
					nowX++;
					if(nowX+nowSquare[0].length > cols) {nowX=cols-nowSquare[0].length;}
					_this.createTetris(nowSquare, context);
					break;
				case 40://down
					if(_this.collisionDetect()) { 
						return;
					}
					_this.clearPrev(nowSquare);
					nowY = nowY + 2;
					if(nowY + nowSquare.length > rows-1) {nowY=rows-nowSquare.length;}
					_this.createTetris(nowSquare, context);
					break;
				case 38://up
					_this.clearPrev(nowSquare);
					_this.rotate();
					_this.createTetris(nowSquare, context);
					break;
			}
		};
	};
	

	var tetris = new Tetris();
	tetris.init(6);
})();

