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