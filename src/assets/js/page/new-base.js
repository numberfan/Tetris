;(function() {

	function Tetris() {

		//网格矩阵
		this.coordinate = [];
		//当前移动方块
		this.nowSquare = [];

		//方块
		this.width = 70;
		this.borderWidth = 1;

		//行、列
		this.rows = 10;
		this.cols = 6;

		//当前方块位置
		this.nowX = 2;
		this.nowY = 0;

		//定时器
		this.timer = null;

		//分数
		this.score = 0;
	}

	//初始化表格矩阵
	Tetris.prototype.clearBg = function() {
		for (var i = 0; i < this.rows; i++) {
			this.coordinate[i] = [];
			for (var j = 0; j < this.cols; j++) {
				this.coordinate[i][j] = 0;
			}
		}

		this.render();
	};

	//创建方块
	Tetris.prototype.createTetris = function(val) {

		for (var i = 0; i < val.length; i++) {
			for (var j = 0; j < val[i].length; j++) {
				if (val[i][j] == 1) {
					this.coordinate[i+this.nowY][j+this.nowX] = 1;
				}
			}
		}

		this.render();
	};

	//方块形状随机
	Tetris.prototype.randomSquare = function() {//随机方块
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
			],
			num = Math.floor(Math.random() * SQUAREDATA.length);
		return SQUAREDATA[num];
	};


	//方块背景
	Tetris.prototype.drawBg = function() {

		var containerEle = document.getElementById("canvas-container"),
			rows = this.rows || 10,
			cols = this.cols || 6,
			width = this.width || 70,
			borderWidth = this.borderWidth || 1;

		containerEle.style.position = "relative";

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

	//垂直碰撞检测
	Tetris.prototype.collisionY = function(val, arr) { //1为正常下落，2为加速下落

		var len = this.coordinate.length;

		//碰底检测
		if(this.nowY  + arr.length >= len) {
			return true;
		} 

		//下方方块检测
		var n;
		for (var i = 0; i < arr[0].length; i++) {
			n = arr.length-1;
			while (!arr[n][i]) {
				n--;
			}

			if ((n+val+this.nowY) >= len || this.coordinate[n+val+this.nowY][i+this.nowX]) {
				return true;
			}
		}

		return false;
	};

	//水平碰撞检测,return true为撞上
	Tetris.prototype.collisionX = function(val, arr) { //-1向左，1向右

		var horizontal = this.coordinate[0].length - arr[0].length

		//水平坐标判定
		if (this.nowX+val < 0 || this.nowX+val > horizontal) {
			return true;
		}

		//左右障碍判定
		if (val < 0) {
			var n;
			for (var i = 0; i < arr.length; i++) {
				n = 0;
				while (!arr[i][n]) {
					n++;
				}

				if (this.coordinate[i+this.nowY][n+val+this.nowX]) {
					return true;
				}
			}
			return false;
		} else if (val > 0) {
			var n;
			for (var i = 0; i < arr.length; i++) {
				n = arr[0].length-1;
				while (!arr[i][n]) {
					n--;
				}

				if (this.coordinate[i+this.nowY][n+val+this.nowX]) {
					return true;
				}
			}
			return false;
		}

		return true;
	};

	/*Tetris.prototype.clearLine = function() {
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
	};*/

	//消行方法2
	Tetris.prototype.clearLine = function() {
		var flag;

		for (var i = 0; i < this.coordinate.length; i++) {
			flag = true;
			for (var j = 0; j < this.coordinate[i].length; j++) {
				//一旦有值为0，则不可以消行
				if (!this.coordinate[i][j]) {
					flag = false;
				}
				//游戏结束
				if (i <= 1 && this.coordinate[i][j]) {
					alert("Game Over!");
					clearInterval(this.timer);
					this.clearBg();
					return;
				}
			}

			//能否消行
			if (flag) {
				this.coordinate.splice(i, 1);
				this.coordinate.unshift([0, 0, 0, 0, 0, 0]);
				this.score++;
				console.log("当前得分：" + this.score);
			}
		}
	}
	
	//渲染面板
	Tetris.prototype.render = function() {
		var containerEle = document.getElementById("canvas-container");
		var divEles = containerEle.getElementsByTagName("div"); 
		var bgColor = "transparent";

		for (var i = 0; i < this.coordinate.length; i++) {
			for (var j = 0; j < this.coordinate[i].length; j++) {
				
				if (this.coordinate[i][j]) {
					bgColor = "#f00";
				} else {
					bgColor = "transparent";
				}

				divEles[i* this.cols + j].style.background = bgColor;
			}
		}
	};

	//清除前一行
	Tetris.prototype.clearPrev = function(val) {

		for(var i = 0; i < val.length; i++) {
			for(var j = 0; j < val[i].length; j++) {
				if (val[i][j]) {
					this.coordinate[i+this.nowY][j+this.nowX] = 0;
				}	
			}
		}

		this.render();
	};

	//方块下落
	Tetris.prototype.fall = function() {
	
		if(this.collisionY(1, this.nowSquare)) {
			this.clearLine();
			this.nowY = 0;
			this.nowX = 2;
			this.nowSquare = this.randomSquare();
		}

		this.clearPrev(this.nowSquare);
		this.nowY++;
		this.createTetris(this.nowSquare);
	};

	//旋转
	Tetris.prototype.rotate = function() {
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


		//判断变形后能否放置
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {
				if (this.coordinate[i+this.nowY][j+this.nowX]) {
					return;
				}
			}
		}

		this.nowSquare = arr;
	};

	//方块鼠标事件
	Tetris.prototype.mouseEvent = function() {

		var _this = this;

		document.onkeydown = function(event) {
			
			switch(event.keyCode) {
				case 37://left
					if (!_this.collisionX(-1, _this.nowSquare)) {
						_this.clearPrev(_this.nowSquare);
						_this.nowX--;
						_this.createTetris(_this.nowSquare);
					}
					
					break;
				case 39://right
					if (!_this.collisionX(1, _this.nowSquare)) {
						_this.clearPrev(_this.nowSquare);
						_this.nowX++;
						_this.createTetris(_this.nowSquare);
					}
					break;
				case 40://down
					if(!_this.collisionY(2, _this.nowSquare)) { 
						_this.clearPrev(_this.nowSquare);
						_this.nowY += 2;
						_this.createTetris(_this.nowSquare);
					}
					
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

		var _this = this;

		this.drawBg();
		this.clearBg();

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