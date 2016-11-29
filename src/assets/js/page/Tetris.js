;(function() {

	function Tetris() {

	}


	Tetris.prototype = {
		cols: 8, //列
		rows: 14, //行
		squareWidth: 60, //square宽度
		squareHeight: 60, //square高度
		canvasContainer: "#wrapper", //canvas容器
		_canvas: null,
		_context: null,
		_coordinate: [], //网格
		//canvas宽、高
		_canvasWidth: this.cols * this.squareWidth,
		_canvasHeight: this.rows * this.squareHeight,
		_nowSquare: [], //当前运动的块
		_nowX: 0, //当前块X
		_nowY: 0, //当前块Y
		_isGameOver: false, //游戏是否结束
		_score: 0, //分数
		_timer: null,
		SQUAREDATA: [
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
		],
		_initArray: function(cols, rows, placeNums) {
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
		},

		_randSquare: function() {
			var num = Math.floor(Math.random() * this.SQUAREDATA.length);
			return this.SQUAREDATA[num];
		},

		_fall: function() {
			if (this._collisionDetect()) {
				this._nowY = 0;
				this._nowX = 2;
				this._nowSquare = this._randSquare();
			}

			this._clearPrev(this._nowSquare);
			this._nowY++;
			this._createTetris(this._nowSquare);

			//this._clearLine();
		},

		_clearLine: function() { //消行
			var eliminateNum = 0,
				eliminateArr = new Array(this.rows);

			for (var i = this._coordinate.length-1; i >= 0; i--) {
				var gridNum = 0;
				for (var j = 0; j < this._coordinate[i].length; j++) {
					//有空余格
					if (this._coordinate[i][j] == 0) { 
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

				console.log("消行前：");
				console.log(this._coordinate);

				var _coordinate_ = this._coordinate;
				//this._clearPrev(this._coordinate);

				//$("#content").html(this._coordinate);

				//alert("消行了");

				for (var i = this._coordinate.length-1; i > 0; i--) {

					if (eliminateArr[i] = false) { 
						break;
					}

					//全有块
					var _topIndex = i;
					
					for (var m = _topIndex; m > 0; m--) {
						for (var n = 0; n < this._coordinate[_topIndex].length; n++) {
							if (m == _topIndex) {
								_coordinate_[m][n] = 0;
							} else {
								_coordinate_[m+1][n] = _coordinate_[m][n];
							}

							//this._coordinate[m][n] = this._coordinate[m-1][n];
						}
					}
				}

				this._coordinate = _coordinate_;

				console.log("消行后：");
				console.log(this._coordinate);

				//this._createTetris(this._coordinate);
				clearInterval(this._timer);
			}
		},

		gameOver: function() {
			var colLen = this._coordinate[0].length,
				count = 0;
			for(var i = 0; i < colLen; i++) {
				count = 0;
				for(var j = 0; j < this._coordinate.length; j++) {
				
					if(this._coordinate[j][i] == 1) {
						count++;
					}
				}

				if(count == colLen) {
					clearInterval(this._timer);
					alert("Game Over!");
				}
				
			}
		},

		getScore: function() {
			var count;
			for(var i = 0; i < this._nowSquare.length; i++) {
				count = true;

				for(var j = 0; j < this._nowSquare[i].length; j++) {

					if(this._coordinate[i][j] == 0) {
						count = false;
					}
				}

				if(count) {
					this._score++;
					return this._score;
				}
			}
		},

		_collisionDetect: function() { //return true 不可下落
			
			if (this._nowY + this._nowSquare.length >= this._coordinate.length) {
				return true;
			}
			
			for(var i = this._nowSquare.length-1;i < this._nowSquare.length; i++) {
				for(var j = 0; j < this._nowSquare[i].length; j++) {

					console.log(i + this._nowY, j + this._nowX, this._coordinate[i+this._nowY+1][j+this._nowX]);

					if (this._coordinate[i+this._nowY+1][j+this._nowX] == 1) {
						return true;
					}

					if (this._nowSquare[i][j] && 
						(this._nowY + i < 0 ||
						this._nowY + i > this.rows ||
						this._nowX + j < 0 ||
						this._nowX + j > this.cols)) {
						return true;
					}

					/*if (i+this._nowY < 0 || i+this._nowY > this.rows || 
						j+this._nowX < 0 || j+this._nowX > this.cols) {
						return true;
					}*/
				}
			}
			return false;
		},

		_clearPrev: function(arr) {

			for(var i = 0; i < arr.length; i++) {
				for(var j = 0; j < arr[i].length; j++) {
					if (arr.length == this._coordinate.length) {
						this._coordinate[i][j] = 0;
					} else {
						this._coordinate[i+this._nowY][j+this._nowX] = 0;
					}
				}
			}
		},

		_rotate: function() {
			var y = this._nowSquare.length,
				x = this._nowSquare[0].length,
				arr = [];

			for(var i = 0; i < x; i++) {
				arr.push([]);
			}

			for(var i=0;i<y;i++){
				for(var j=0;j<x;j++){
					arr[j][y-1-i] = this._nowSquare[i][j]
				}
			}

			this._nowSquare = arr;
		},

		_createTetris: function(arr) {

			for(var i = 0;i < arr.length; i++) {
				for(var j = 0; j < arr[i].length; j++) {

					if (arr.length == this._coordinate.length) { //更新整个面板
						
						this._coordinate[i][j] = arr[i][j];

					} else { //更新当前

						if (this._coordinate[i+this._nowY][j+this._nowX] == 1) {
							return;
						}

						this._coordinate[i+this._nowY][j+this._nowX] = arr[i][j];

					}
				}
			}

			this._renderSquare(this._coordinate, this._context);
		},

		_drawBackground: function(ctx) {
			for(var i = 0; i < this.cols; i++) {
				for(var j = 0; j < this.rows; j++) {
					ctx.strokeStyle = "#000";
					ctx.strokeRect(i*this.squareWidth, j*this.squareHeight, this.squareWidth, this.squareHeight);
				}
			}
		},

		_renderSquare: function(datas, ctx) {
			for(var i = 0; i < datas.length; i++) {
				for(var j = 0; j < datas[i].length; j++) {
					var _y = i * this.squareWidth;
					var _x = j * this.squareHeight;
					ctx.save();
					ctx.fillStyle =  this._coordinate[i][j] == 1 ? "#f00" : "#ccc";
					ctx.strokeStyle = "#000";
					ctx.beginPath();
					ctx.rect(_x, _y, this.squareWidth, this.squareHeight);
					ctx.fill();
					ctx.stroke();
					ctx.closePath();
					ctx.restore();
				}
			}	
		},

		_mouseEvent: function() {
			var self = this;

			document.onkeydown = function(event) {
				
				switch(event.keyCode) {
					case 37://left
						self._clearPrev(self._nowSquare);
						self._nowX--;
						if(self._nowX<=0) {self._nowX=0;}
						self._createTetris(self._nowSquare, self._context);
						break;
					case 39://right
						self._clearPrev(self._nowSquare);
						self._nowX++;
						if (self._nowX+self._nowSquare[0].length > self.cols) {
							self._nowX=self.cols-self._nowSquare[0].length;
						}
						self._createTetris(self._nowSquare, self._context);
						break;
					case 40://down
						if(self._collisionDetect()) { 
							return;
						}
						self._clearPrev(self._nowSquare);
						self._nowY = self._nowY + 2;
						if(self._nowY + self._nowSquare.length > self.rows-1) {self._nowY=self.rows-self._nowSquare.length;}
						self._createTetris(self._nowSquare, self._context);
						break;
					case 38://up
						self._clearPrev(self._nowSquare);
						self._rotate();
						self._createTetris(self._nowSquare, self._context);
						break;
				}
			};
		},

		init: function(options) {
			for(var a in options) {
				this[a] = options[a];
			}

			this._canvasWidth = this.cols * this.squareWidth;
			this._canvasHeight = this.rows * this.squareHeight;

			var self = this;
			var canContainer = document.querySelectorAll(this.canvasContainer)[0];
			this._canvas = document.createElement("canvas");
			this._context = this._canvas.getContext("2d");
			canContainer.appendChild(this._canvas);

			var _canvas = this._canvas;
			_canvas.width = this._canvasWidth;
			_canvas.height = this._canvasHeight;


			//初始化坐标系统
			this._coordinate = this._initArray(this.cols, this.rows); //0无块， 1有块
			this._drawBackground(self._context);
			this._nowX = 2;
			this._nowY = 0;
			this._nowSquare = this._randSquare();
			this._createTetris(this._nowSquare, this._context);

			this._timer = setInterval(function() {
				self._fall();
			}, 500);

			this._mouseEvent();
		}
	};

	var aa = new Tetris();
	aa.init({
		cols: 6, 
		rows: 10
	});


})();