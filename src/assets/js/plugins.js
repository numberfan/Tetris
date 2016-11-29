/**
 * [分页]
 * @param  Number nowNum [当前页数，默认为1]
 * @param Number allNum  [总需要的分页数]
 * @param Object opt  [配置参数]
 *
 * [使用]
 * $(paginationEle).paging(nowNum, allNum, {
	first: false, //设置false则不显示，默认为false
	last: false, //设置false则不显示，默认为false  
	prev: "上一页", //设置为false,则不显示，默认为“上一页”
	next: "下一页", //设置为false,则不显示，默认为“下一页”
	numOrignClass: ".num", //分页样式
	numHoverClass: ".active", //分页激活样式
	firstClass: ".first", //“首页”按钮样式
	lastClass: ".last", //“尾页”按钮样式
	prevClass: ".active", //“上一页”按钮样式
	nextClass: ".active", //“下一页”按钮样式
	callback: function() {} //参数：nowNum 、allNum
});
 */
;(function($) {

	$.fn.paging = function(nowNum, allNum, opt) {

		"use strict";

		var defaults  = {
			first: false, //设置false则不显示，默认为false
			last: false, //设置false则不显示，默认为false  
			prev: "上一页", //设置为false,则不显示，默认为“上一页”
			next: "下一页", //设置为false,则不显示，默认为“下一页”
			numOrignClass: ".num", //分页样式
			numHoverClass: ".active", //分页激活样式
			firstClass: ".first", //“首页”按钮样式
			lastClass: ".last", //“尾页”按钮样式
			prevClass: ".active", //“上一页”按钮样式
			nextClass: ".active", //“下一页”按钮样式
			callback: function() {}
		};

		var params = $.extend({}, defaults, opt);


		var innerFun = {}; 
		var _this = this;
		var obj = $(_this);

		//判断是否为数组，且不为“false”
		innerFun.isArray = function(da) {

			var _regexp = new RegExp("false");
			var _isFalse = _regexp.test(da);

			if (typeof da === "boolean") {

				return false;

			//参数值为string，且字符串不能为"false"
			} else if (typeof da === "string" && !_isFalse) {
				return da;
			}
			return false;
		};

		//判断页码是否非法
		innerFun.adjustPageNum = function() {

			nowNum = parseInt(nowNum);
			allNum = parseInt(allNum);

			if (nowNum > allNum && nowNum >= 1 && allNum >= 1) { //若当前页数大于总页数，则替换两个数据
				var a = nowNum;
				nowNum = allNum;
				allNum = a;
			} else if (nowNum <= 1) {
				nowNum = 1;
			} else if (allNum <= 1) {
				allNum = 1;
			}
		};

		innerFun.pager = function() { //分页

			var nowNum = params.nowNum;
			var allNum = params.allNum;

			//首页按钮
			if (params.first) {
			
				var oA = $('<a></a>');
				oA.html(params.first)
					.attr('href', '#1')
					.addClass(params.firstClass);
				
				obj.append(oA);
			}

			//上一页
			if (params.prev) {
				var oPrev = $('<a></a>');
				oPrev.html(params.prev)
						.addClass(params.prevClass);
				if (nowNum <= 1) {
					oPrev.attr('href', '#' + 1);
				} else {
					oPrev.attr('href', '#' + (nowNum - 1));
				}
				obj.append(oPrev);
			}
			
			//页码
			if (allNum <= 5) {
			
				for(var i = 1;i <= allNum; i++) {
					var oA = $('<a></a>');
					oA.html(i)
						.attr('href', '#' + i)
						.addClass(params.numOrignClass);

					if(nowNum == i){
						oA.addClass(params.numHoverClass);
					}
					obj.append(oA);
				}	
			} else {
				for(var i = 1; i <= 5; i++) {
					var oA = $('<a></a>');
					
					if(nowNum == 1 || nowNum == 2){
						oA.html(i)
							.attr('href', '#' + i);

						if(nowNum == i){
							oA.addClass(params.numHoverClass);
						}
						
					} else if ((allNum - nowNum) == 0 || (allNum - nowNum) == 1 ){
						oA.attr('href', '#' + (allNum - 5 + i));
					
						if ((allNum - nowNum) == 0 && i==5) {

							oA.html(allNum - 5 + i)
								.addClass(params.numHoverClass); 

						} else if ((allNum - nowNum) == 1 && i==4) {

							oA.html(allNum - 5 + i)
								.addClass(params.numHoverClass);  

						} else {
							oA.html(allNum - 5 + i); 
						}
					
					} else {
						oA.attr('href', '#' + (nowNum - 3 + i));
						
						if (i==3) {
							oA.html(nowNum - 3 + i)
								.addClass(params.numHoverClass);
						} else {
							oA.html(nowNum - 3 + i);
						}
					}
					oA.addClass(params.numOrignClass);
					obj.append(oA);
				}
			}

			//下一页
			if (params.next) {
				var oNext = $('<a></a>');
				oNext.html(params.next)
						.addClass(params.nextClass);
				if (nowNum >= allNum) {
					oNext.attr('href', '#' + allNum);
				} else {
					oNext.attr('href', '#' + (nowNum + 1));
				}
				obj.append(oNext);
			}

			//尾页
			if (params.last) {
				//console.log(params.last)
				var oA = $('<a></a>');
				oA.html(params.last)
					.attr('href', '#' + allNum)
					.addClass(params.lastClass);
				
				obj.append(oA);
			}
			

			params.callback(nowNum, allNum);

			var aA = obj.find('a');
		
			for(var i=0;i<aA.length;i++){
				$(aA[i]).on('click', function(event) {

					event.preventDefault();
					nowNum = parseInt($(this).attr('href').substring(1));

					if (nowNum <= 0) {
						nowNum = 0;
					} else if (nowNum >= allNum) {
						nowNum = allNum;
					}

					obj.html("");
					
					$(_this).paging(nowNum, allNum, opt);
					
					return false;
				});
			}
		};

		innerFun.initParams = function() { //处理参数
			//判断页码是否非法
			innerFun.adjustPageNum();

			params = $.extend(params, {
				nowNum: nowNum,
				allNum: allNum,
				first: innerFun.isArray(params.first),
				last: innerFun.isArray(params.last),
				prev: innerFun.isArray(params.prev),
				next: innerFun.isArray(params.next),
				numOrignClass: params.numOrignClass.substring(1),
				numHoverClass: params.numHoverClass.substring(1),
				firstClass: params.firstClass.substring(1),
				lastClass: params.lastClass.substring(1),
				prevClass: params.prevClass.substring(1),
				nextClass: params.nextClass.substring(1),
			});

			innerFun.pager();
		};

		innerFun.init = function() {
			$(_this).html("");
			innerFun.initParams();
		};

		innerFun.init();
	};
})(jQuery);

/**
 * 上传图片，并展示（分页，但不点赞）
 * 调用：
 * var screenshot_01 = new Screenshot({
 * 	uploadBtn: $(".j_upload01_btn"), //参加活动按钮
 * 	uploadPop: $(".j_upload01_popup"), //上传图片弹窗
 * 	iframeUrl: "./iframe01.html", //上传截图的iframe
 * 	screenshotEle: $(".j_screenshot01"), //截图容器
 * 	paginationEle: $(".j_pagination01"), //分页容器
 * 	nameDescribe: "粉丝昵称",
 * 	//上传信息接口
 * 	postInfoUrl: "http://hdsupport.ptbus.com/api/index?aid=71&cid=1&s=participate",
 * 	//获取信息接口
 * 	getInfoUrl: "http://hdsupport.ptbus.com/api/index?aid=71&cid=2&s=get_targets",
 * });
 * screenshot_01.init();
 * 
 */

;(function() {
	function Screenshot(params) {

		//参加活动按钮
		this.uploadBtn = params.uploadBtn || $(".j_upload01_btn");

		//上传图片弹窗
		this.uploadPop = params.uploadPop || $(".j_upload01_popup");

		this.iframeUrl = params.iframeUrl || "./iframe01.html";

		//截图容器
		this.screenshotEle = params.screenshotEle || $(".j_screenshot01");

		//分页容器
		this.paginationEle = params.paginationEle || $(".j_pagination01");

		//上传信息接口
		this.postInfoUrl = params.postInfoUrl || "http://hdsupport.ptbus.com/api/index?aid=71&cid=1&s=participate";
		//获取信息接口
		this.getInfoUrl = params.getInfoUrl || "http://hdsupport.ptbus.com/api/index?aid=71&cid=2&s=get_targets";

		//name描述，渲染数据
		this.nameDescribe = params.nameDescribe || "粉丝昵称";
		
		//确认上传数据
		this.sureBtn = this.uploadPop.find('.j_sure_btn');

		this.qqEle = this.uploadPop.find('.j_qq');
		this.nameEle = this.uploadPop.find('.j_name');

		//上传图片iframe
		this.iframeEle = this.uploadPop.find('.iframe');

		//上传成功
		this.successEle = $(".j_upload_succ");

		//每页显示的条数
		this.pageSize = 8;

		//总内容数
		this._totalContent = "";

		//当前页码数
		this._curr = 1;
	}
	Screenshot.prototype = {

		ajax: function(val) {
			var self = this;

			$.ajax({
				url: val.url,
				type: 'get',
				dataType: 'jsonp',
				data: val.data,
			})
			.done(function(data) {
				var code = data.code;

				if (code !== 0) {
					testCode(code);
				} else {
					val.doneFn(data.result);
				}
			})
			.fail(function() {
				alert("网络连接错误，请稍后再试！");
			});
		},

		//信息校验
	    infoTest: function (ele, re) {
	        if (ele.val() != "" && ele.val() != false) {
	            if (re == 'qq') {
	                return reFn(ele.val());
	            } else {
	                return true;
	            }
	        } else {
	            alert("请填写完整！");
	            ele.focus();
	            return false;
	        }

	        function reFn(val) {
	            var pattern = /[1-9]([0-9]{5,11})/;
	            var flag = pattern.test(val);
	            if (!flag) {
	                alert("提示:格式错误！");
	                ele.val("").focus();
	                return false;
	            } else {
	                return true;
	            }
	        }
	    },

		//提交信息
		postInfo: function() {

			var self = this;

			this.sureBtn.click(function(event) {
				var qqEle = self.qqEle,
					nameEle = self.nameEle,
					iframeEle = self.iframeEle,
					uploadPop = self.uploadPop;
					successEle = self.successEle;

				if(self.infoTest(nameEle) && self.infoTest(qqEle,'qq')){ 
					self.ajax({
						url: self.postInfoUrl,
						data: {
							desc: [nameEle.val(), qqEle.val()]
						},
						doneFn: function() {

							successEle.show();

							iframeEle.attr('src', self.iframeUrl);
                            $(self.popup).hide();
                            uploadPop.hide();
						}

					});
				}
			});
		},

		//获取服务器信息
		getInfo: function(curr) {
			var self = this,
				screenshotEle = this.screenshotEle;
			this.ajax({
				url: self.getInfoUrl,
				data: {
					page: curr || 1,
					page_size: self.pageSize
				},
				doneFn: function(result) {
					var allNum = result.page_total,
						result = result.list,
						resultLen = result.length;

					if (resultLen <= 0) {
						return;
					}

					var nowNum = curr,
						paginationEle = self.paginationEle;

					self.render(result);

					paginationEle.paging(curr, allNum, {
						first: "首页",
						last: "尾页",
					    prev: false, //设置为false,则不显示，默认为“上一页”
					    next: false, //设置为false,则不显示，默认为“下一页”
					    numOrignClass: ".num", //分页样式
					    numHoverClass: ".active", //分页激活样式
					    prevClass: ".prev",
					    nextClass: ".next",
					    callback: function(nowNum, allNum) {
					      	self.getPageData(nowNum);
					    }
					});

				}
			});
		},
		getPageData: function(nowNum) {
			var self = this,
				screenshotEle = this.screenshotEle;
			this.ajax({
				url: self.getInfoUrl,
				data: {
					page: nowNum,
					page_size: self.pageSize
				},
				doneFn: function(result) {
					var result = result.list,
						resultLen = result.length;

					if (resultLen <= 0) {
						return;
					}
					self.render(result);
				}
			});
		},
		//渲染数据
		render: function(totalContent) {
			var _this = this;
			var screenshotEle = this.screenshotEle;

			screenshotEle.html("");

			for(var i = 0; i < totalContent.length; i++) {

				if(!totalContent[i]) {return;}

				//渲染数据
				var cons = '<div class="repeat">' +
								'<img src="' + totalContent[i].img + '">' +
								'<p class="info">' + this.nameDescribe + '：<span>' + totalContent[i].desc[0] + '</span></p>' +
								'<div class="border"></div>' + 
							'</div>';
				
				screenshotEle.append(cons);
			}
		},

		init: function() {
			var self = this;
			self.uploadBtn.click(function(event) {
				self.uploadPop.show();
			});

			self.postInfo();
			self.getInfo();
		}
	};

	window.Screenshot = Screenshot;
})();