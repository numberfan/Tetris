;(function() {

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

	function Tetris() {

		this.coordinate = [];
		this.nowSquare = [];
		this.rows = 10;
		this.cols = 6;
		this.nowX = 0;
		this.nowY = 0;

		this.timer = null;
	}

	Tetris.prototype.resetCoordinate = function() {
		for (var i = 0; i < this.rows; i++) {
			this.coordinate[i] = [];
			for (var j = 0; j < this.cols; j++) {
				this.coordinate[i][j] = 0;
			}
		}
	};

	Tetris.prototype.createTetris = function(val) {

		var containerEle = document.getElementById("canvas-container");
		var divEles = containerEle.getElementsByTagName("div"); 

		for (var i = 0; i < val.length; i++) {
			for (var j = 0; j < val[i].length; j++) {
				
				if (val[i][j] == 1) {
					this.coordinate[i+this.nowY][j+this.nowX] = 1;
					divEles[(i+this.nowY) * this.cols + j+this.nowX].style.background = "#f00";
				}
			}
		}
	};

	Tetris.prototype.randomSquare = function() {//随机方块
		var num = Math.floor(Math.random() * SQUAREDATA.length);
		return SQUAREDATA[num];
	};

	Tetris.prototype.drawBackground = function(containerEle, rows, cols, width, borderWidth) {

		var rows = rows || 10,
			cols = cols || 6,
			width = width || 70,
			borderWidth = borderWidth || 1;


		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < cols; j++) {
				var _cell = document.createElement("div");
				_cell.style.width = width + "px";
				_cell.style.height = width + "px";
				_cell.style.position = "absolute";
				_cell.style.top = i*(width + borderWidth) + "px";
				_cell.style.left = j*(width + borderWidth) + "px";
				_cell.style.border = borderWidth + "px solid #ccc";
				containerEle.appendChild(_cell);
			}
		}
	};

	Tetris.prototype.collisionDetect = function() {
		if(this.nowY + this.nowSquare.length >= this.coordinate.length) {
			this.clearLine()
			return true;
		} 

		var n;
		for (var i = 0; i < this.nowSquare[0].length; i++) {
			n = this.nowSquare.length-1;
			while (!this.nowSquare[n][i]) {
				n--;
			}

			console.log(n);

			if (this.coordinate[n+1+this.nowY][i+this.nowX]) {
				return true;
			}
		}

		/*for(var i = this.nowSquare.length-1;i < this.nowSquare.length; i++) {
			for(var j = 0; j < this.nowSquare[i].length; j++) {

				if(this.nowSquare[i][j] && this.coordinate[i+this.nowY+1][j+this.nowX] == 1) {
					this.clearLine()
					return true;
				}
			}
		}*/

		return false;
	};

	//消行
	Tetris.prototype.clearLine = function() {
		var eliminateNum = 0,
			eliminateArr = new Array(this.rows);

		for (var i = this.coordinate.length-1; i >= 0; i--) {
			var gridNum = 0;
			for (var j = 0; j < this.coordinate[i].length; j++) {
				//有空余格
				if (this.coordinate[i][j] == 0) { 
					break;
				}
				gridNum++;
			}

			//全有块，可消行
			if (gridNum === this.cols) {
				eliminateArr[i] = true;
				eliminateNum++;
			} else {
				eliminateArr[i] = false;
			}
		}

		if (eliminateNum > 0) {

			var midArr=[]
			for (var i = 0; i <= this.coordinate.length; i++) {

				if (eliminateArr[i] == false) { 
					midArr.push(this.coordinate[i])
				}
			}
			var C=[0,0,0,0,0,0]
			midArr.unshift(C)
			this.coordinate=midArr;
			this.reDraw(this.coordinate)
		}
	};

	Tetris.prototype.reDraw = function(val) {
		
		var containerEle = document.getElementById("canvas-container");
		var divEles = containerEle.getElementsByTagName("div"); 

		for (var i = 0; i < this.coordinate.length; i++) {
			for (var j = 0; j < this.coordinate[i].length; j++) {
				//this.coordinate[i][j] = 0;
				divEles[i*this.cols+j].style.background = "transparent";
			}
		}

		for (var i = 0; i < val.length; i++) {

			for (var j = 0; j < val[i].length; j++) {
				console.log(val[i][j])
				if (val[i][j] == 1) {
					this.coordinate[i][j] = 1;
					divEles[i*this.cols+j].style.background = "#f00";
				}
				
			}
		}
	};

	Tetris.prototype.clearPrev = function(val) {

		var containerEle = document.getElementById("canvas-container");
		var divEles = containerEle.getElementsByTagName("div"); 

		for(var i = 0; i < val.length; i++) {
			for(var j = 0; j < val[i].length; j++) {
				if (val.length == this.coordinate.length) {
					this.coordinate[i][j] = 0;
				} else {
					if (val[i][j]) {
						this.coordinate[i+this.nowY][j+this.nowX] = 0;
						divEles[(i+this.nowY) * this.cols + j+this.nowX].style.background = "transparent";
					}
					
				}
			}
		}
	};

	Tetris.prototype.fall = function() {
	
		if(this.collisionDetect()) {
			//this.clearLine(context);
			this.nowY = 0;
			this.nowX = 2;
			this.nowSquare = this.randomSquare();
		}

		this.clearPrev(this.nowSquare);
		this.nowY++;
		this.createTetris(this.nowSquare);

		/*this.gameOver();*/
		/*this.score();*/
	};

	Tetris.prototype.rotate = function() {//数组转换
		var y = this.nowSquare.length,
			x = this.nowSquare[0].length,
			arr = [];

		for(var i = 0; i < x; i++) {
			arr.push([]);
		}

		for(var i=0;i<y;i++){
			for(var j=0;j<x;j++){
				var _x = j+this.nowY,
					_y = y-1-i+this.nowX;
				if (_x < 0 || _x > this.cols) {
					return;
				}
				if (this.coordinate[_x][_y] == 1) {
					return;
				}
				arr[j][y-1-i] = this.nowSquare[i][j]
			}
		}

		this.nowSquare = arr;
	};

	Tetris.prototype.mouseEvent = function() {

		var _this = this;

		document.onkeydown = function(event) {
			
			switch(event.keyCode) {
				case 37://left
					_this.clearPrev(_this.nowSquare);
					_this.nowX--;
					if(_this.nowX<=0) {_this.nowX=0;}
					_this.createTetris(_this.nowSquare);
					break;
				case 39://right
					_this.clearPrev(_this.nowSquare);
					_this.nowX++;
					if(_this.nowX + _this.nowSquare[0].length > _this.cols) {
						_this.nowX = _this.cols - _this.nowSquare[0].length;
					}
					_this.createTetris(_this.nowSquare);
					break;
				case 40://down
					if(_this.collisionDetect()) { 
						return;
					}
					_this.clearPrev(_this.nowSquare);
					_this.nowY = _this.nowY + 2;
					if(_this.nowY + _this.nowSquare.length > _this.rows-1) {
						_this.nowY = _this.rows - _this.nowSquare.length;
					}
					_this.createTetris(_this.nowSquare);
					break;
				case 38://up
					_this.clearPrev(_this.nowSquare);
					_this.rotate();
					_this.createTetris(_this.nowSquare);
					break;
			}
		};
	};

	Tetris.prototype.init = function() {

		var containerEle = document.getElementById("canvas-container");
		var cols = 6; // 6列
		var rows = 10; //10行

		var _this = this;

		containerEle.style.position = "relative";

		this.drawBackground(containerEle);
		this.resetCoordinate();

		this.nowSquare = this.randomSquare();
		this.createTetris(this.nowSquare);

		timer = setInterval(function() {
			_this.fall();
		}, 500);

		this.mouseEvent();
	};


	var tetris = new Tetris();
	tetris.init();
})();	