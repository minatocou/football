module.exports = {

    segueView: function (method, parameter, success, fail) {
        console.log(method, parameter);
        try {
            Cordova.exec(success, fail, "LLTViewSegue", method, parameter)
        }catch(e){
            console.log(e);
        }
    },
    inApp: function (url, target, options) {
        return cordova.InAppBrowser.open(url, target || "_system", options);
    },
    memberCtl: function(method, parameter, success, fail) {
        try{
            Cordova.exec(success, fail, "LLTMemberCenter", method, parameter);
        }catch(e){
            console.log(e);
        }
    },
    setNavBarTitle: function(title){
        this.segueView("setNavBarTitle", [title]);
    },
    isInMap: function (url) {
        url = url.replace(/^(?:https?:)?\/\/[\w.]+/i, '');
        url = url.split('?')[0];
        var hrefArry = url.split('/');
        if (hrefArry.length > 3) {
            url = '/' + hrefArry[1] + '/' + hrefArry[2];
        }
        return this.LLT_HTML_MAP[url];
    },
    refUrl: function (href) {
        if ((/^http|https|\//).test(href)) {
            var hobj = this.isInMap(href);
            if (hobj) {
                USER = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
                if (hobj.auth && !USER && /^file/.test(location.href)) {
                    this.open({url: "/member/login?ref=" + href})
                } else {
                    this.open({url: href})
                }
            } else {
                href = /^https?/i.test(href) ? href : /^\/\//i.test(href) ? 'http:' + href : href;
                //cordova.InAppBrowser.open(href, "_blank", 'closebuttoncaption=close,location=no,toolbarposition=top');
                this.view({}, href, '', 1);
            }
            return false;
        }

    },
    back: function () {
        window.LLT_HYBRID_APP ?
            this.segueView("back", null, function (result) {
                if (setting && setting.callback)
                    setting.callback(result)
            }): history.back();
    },
    open:function(setting){
        setting = setting || {};
        setting.showHeader = setting.showHeader ? '1' : '0';
        var hrefs = this.LLT_HTML_MAP;
        var href = setting.url || '/home/home';
        href = href.replace(/^https?:\/\/[-\w.]+/i, '');
        var h = {
            _url: encodeURIComponent(href)
        };
        href = href.split('?')[0];
        var hrefArry = href.split('/');
        if (hrefArry.length > 2) {
            href = '/' + hrefArry[1] + (/^[_\w]+$/i.test(hrefArry[2]) ? '/' + hrefArry[2] : '');
        }
        if (hrefs[href].html == 'home') {
            this.segueView("home", [], function (result) {
                if (setting && setting.callback)
                    setting.callback(result)
            })
        }else if(href == '/my/home'){
            this.segueView("memberCenter", [], function (result) {
                if (setting && setting.callback)
                    setting.callback(result)
            })
        } else {
            this.segueView("segue", [hrefs[href].html, JSON.stringify(h), setting.showHeader], function (result) {
                if (setting && setting.callback)
                    setting.callback(result)
            });
        }
        return false;
    },
    LLT_HTML_MAP:{
        '/home/home': {html:'/html/home/app.html'},
        '/my/home': {html:'/html/account/app.home.html',auth:true}
    }
};
