//mui('.city-item').on('tap',function(){
//	//ur').siblings('.cur').removeClass('cur');
//})

(function(){
	var city=document.querySelectorAll('.city span');
	var removeClass = function(pre,className){
		for(var i=0;i<pre.length;i++){
			pre[i].classList.remove(className);
		}
	}
	for(var i=0;i<city.length;i++){
		city[i].addEventListener('tap',function(){
			removeClass(city,'cur');
			this.classList.add('cur');
		})
	}
})()
