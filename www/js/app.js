function pullfresh() {
	//业务逻辑代码，比如通过ajax从服务器获取新数据；
	//注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
	mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
}
var config={
	aniShow:"none"
}
mui.init({
	swipeBack: true,
	pullRefresh: {
		container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		down: {
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: pullfresh // function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});
mui('body').on('tap', 'a', function() {
	var id = this.getAttribute('href');
	var href = this.href;
	var type = this.getAttribute("open-type");
	//不使用父子模板方案的页面
	if (type == "common") {
		var webview_style = {
			popGesture: "close"
		};
		//侧滑菜单需动态控制一下zindex值；
		if (~id.indexOf('offcanvas-')) {
			webview_style.zindex = 9998;
			webview_style.popGesture = ~id.indexOf('offcanvas-with-right') ? "close" : "none";
		}
		//图标界面需要启动硬件加速
		if (~id.indexOf('icons.html')) {
			webview_style.hardwareAccelerated = true;
		}
		mui.openWindow({
			id: id,
			url: this.href,
			styles: webview_style,
			show: {
				aniShow: config.aniShow,
				duration:0
			},
			waiting: {
				autoShow: false
			}
		});
	} else if (id && ~id.indexOf('.html')) {
		if (!mui.os.plus || (!~id.indexOf('popovers.html') && mui.os.ios)) {
			mui.openWindow({
				id: id,
				url: this.href,
				styles: {
					popGesture: 'close'
				},
				show: {
					aniShow: config.aniShow，
					duration:0
				},
				waiting: {
					autoShow: false
				}
			});
		}
	}
});