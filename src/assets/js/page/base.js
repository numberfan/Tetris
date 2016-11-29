;(function() {

<<<<<<< HEAD
	var SQUAREDATA = [
			[
				[0, 1, 0],
				[1, 1, 1]
			],
			[
				[1, 0, 0],
				[1, 1, 1]
			],
			[
				[0, 0, 1],
				[1, 1, 1]
			],
			[
				[1, 1, 0],
				[0, 1, 1]
			],
			[
				[0, 1, 1],
				[1, 1, 0]
			],
			[
				[1, 1],
				[1, 1]
			],
			[
				[1, 1, 1, 1]
			]
		];

=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
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

<<<<<<< HEAD
	Tetris.prototype.initArray = function(cols, rows, placeNums) {
		var cols = cols || 6,
			rows = rows || 10,
			placeNums = placeNums || 0,
			array = [];

		for (var i = 0; i < rows; i++) {
			array[i] = [];
			for(var j = 0; j < cols; j++) {
				array[i][j] = placeNums;
			}
		}

		return array;
	};

=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827

	Tetris.prototype.init = function() {//列数
		var _this = this;
		_this.drawBackground(context);
		nowX = 3;
		nowY = 0;

		nowSquare = _this.randomSquare();
		_this.createTetris(nowSquare, context);
		/*_this.fall();*/
		timer = setInterval(function() {
<<<<<<< HEAD
			_this.fall(context);
		}, 500);

		_this.mouseEvent(context);
=======
			_this.fall();
		}, 500);

		_this.mouseEvent();
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827

		//this.mouseEvent(this.nowSquare);
	};

	Tetris.prototype.randomSquare = function() {//随机方块
<<<<<<< HEAD
		var num = Math.floor(Math.random() * SQUAREDATA.length);
		return SQUAREDATA[num];
	};

	Tetris.prototype.fall = function(context) {
	
		if(this.collisionDetect()) {
			this.clearLine(context);
			nowY = 0;
			nowX = 3;
			nowSquare = this.randomSquare();

			console.log("结果：");
			for (var i = 0; i < coordinate.length; i++) {
				console.log("第" + i + "行" + coordinate[i]);
			}

		}

		this.clearPrev(nowSquare);
=======
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
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
		nowY++;
		this.createTetris(nowSquare, context);

		/*this.gameOver();*/
		/*this.score();*/
	};

<<<<<<< HEAD
	//消行
	Tetris.prototype.clearLine = function() {
		var eliminateNum = 0,
			eliminateArr = new Array(rows);

		for (var i = coordinate.length-1; i >= 0; i--) {
			var gridNum = 0;
			for (var j = 0; j < coordinate[i].length; j++) {
				//有空余格
				if (coordinate[i][j] == 0) { 
					break;
				}
				gridNum++;
			}

			//全有块，可消行
			if (gridNum === cols) {
				eliminateArr[i] = true;
				eliminateNum++;
			} else {
				eliminateArr[i] = false;
			}
		}

		if (eliminateNum > 0) {


			console.log("消行前：");
			for (var i = 0; i < coordinate.length; i++) {
				console.log("第" + i + "行" + coordinate[i]);
			}

			for (var i = coordinate.length-1; i > 0; i--) {

				if (eliminateArr[i] = false) { 
					break;
				}

				//全有块
				var _topIndex = i;

				if (_topIndex == 0) {
					console.log("Game Over!");
					return;
				}

				for (var j = _topIndex; j > 0; j--) {
					coordinate[j] = coordinate[j-1];
				}
			}


			console.log("消行后：");
			for (var i = 0; i < coordinate.length; i++) {
				console.log("第" + i + "行" + coordinate[i]);
			}

			this.initArray(nowSquare[0].length, nowSquare.length, 0);
			var _coordinate = coordinate;
			this.clearPrev(coordinate);
			this.createTetris(_coordinate, context);
			//clearInterval(timer);
		}
	};

=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
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

<<<<<<< HEAD

	//碰撞检测
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
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
<<<<<<< HEAD
				if (arr.length == coordinate.length) {
					coordinate[i][j] = 0;
				} else {
					coordinate[i+nowY][j+nowX] = 0;
				}
=======
				coordinate[i+nowY][j+nowX] = 0;
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
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

<<<<<<< HEAD
	Tetris.prototype.createTetris = function(arr, contex) {

		for(var i = 0;i < arr.length; i++) {
			for(var j = 0; j < arr[i].length; j++) {
				if (arr.length == coordinate.length) { //更新整个面板
						
					coordinate[i][j] = arr[i][j];

				} else { //更新当前

					if (!coordinate[i+nowY][j+nowX]) {
						coordinate[i+nowY][j+nowX] = arr[i][j];
					}
				}
=======
	Tetris.prototype.createTetris = function(arr) {

		for(var i = 0;i < arr.length; i++) {
			for(var j = 0; j < arr[i].length; j++) {
				
				if(!coordinate[i+nowY][j+nowX]){
					coordinate[i+nowY][j+nowX] = arr[i][j];
				}	
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
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
<<<<<<< HEAD
})(window);
=======
})();
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827

