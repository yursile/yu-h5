
(function(){
	function rnd(n, m)
	{
		return parseInt(Math.random()*(m-n)+n);
	}
	function addClass(ele, className) {
		var oriClass = ele.className;
		if(oriClass) {
			ele.className = oriClass+' '+className;
		} else {
			ele.className = className;
		}
	}
	function removeClass (el, className) {
		var cls = el.className;
		if(cls.indexOf(className)>=0) {
			el.className = el.className.replace(new RegExp('(?:^|\\s)'+className+'(?=\\s|$)', 'ig'), '');
		}
	}
	function replaceClass (el, cls1, cls2) {
		removeClass(el, cls1);
		addClass(el, cls2);
	}

	window.onload = function () {	
		var screen2 = document.getElementById('screen_2');
		var oDiv = screen2.getElementsByClassName('ctn')[0];
		var isAudioTempPause = false;
		var C=4;
		var R=8;
		
		var divCX=oDiv.offsetWidth/2;  //容器的中心点
	    var divCY=oDiv.offsetHeight/2; //容器的中心点
		var isAnimating = false;
		var showNodes = 0;
		var hideNodes = 0;

		var cur_status = -1;
		var os = {};
		function animateSpread (cb) {
			hideNodes = 0;
			for(var i=0;i<R;i++)
			{
				for(var j=0;j<C;j++)
				{
					var oNewDiv = document.getElementById('new_'+i+'_'+j);
					if(!oNewDiv) {
						cb('no element');
						return;
					}
					//飞走——跟中心的距离——方向
					var l=oNewDiv.offsetLeft+oNewDiv.offsetWidth/2;
					var t=oNewDiv.offsetTop+oNewDiv.offsetHeight/2;
					var disX=l-divCX;
					var disY=t-divCY;
					(function (oNewDiv, disX, disY){
						setTimeout(function (){
							oNewDiv.style.WebkitTransform='perspective(800px) translate3d('+disX+'px, '+disY+'px, 600px) rotateY('+rnd(-180, 180)+'deg) rotateX('+rnd(-180, 180)+'deg) scale(2,2)';
							oNewDiv.style.opacity=0;
							
							setTimeout(function (){
								oDiv.removeChild(oNewDiv);
								hideNodes ++;
								if(hideNodes == i * j && cb) cb();
							}, 600);
						}, rnd(1, 301));
					})(oNewDiv, disX, disY);
				}
			}
		}
		function animateAggregate (cb) {
			showNodes = 0;
			for(var i=0;i<R;i++)
			{
				for(var j=0;j<C;j++)
				{
					//创建
					var w=Math.floor(oDiv.offsetWidth/C);
					var h=Math.floor(oDiv.offsetHeight/R);
					var oNewDiv=document.createElement('div');
					oNewDiv.id='new_'+i+'_'+j;
					oNewDiv.style.opacity=0;
					oNewDiv.style.left=j*w+'px';
					oNewDiv.style.top=i*h+'px';
					
					oNewDiv.style.width=w+'px';
					oNewDiv.style.height=h+'px';
					
							
					var offsetLeft = j*w;
					var offsetTop = i*h;

					var l=offsetLeft+w/2;
					var t=offsetTop+h/2;
					var disX=l-divCX;
					var disY=t-divCY;
					oNewDiv.style.WebkitTransform='perspective(800px) translate3d('+disX+'px, '+disY+'px, 600px) rotateY('+rnd(-180, 180)+'deg) rotateX('+rnd(-180, 180)+'deg) scale(2,2)';
							oNewDiv.style.opacity=0;
					oNewDiv.style.backgroundPosition = '-'+offsetLeft+'px -'+offsetTop+'px';
					oDiv.appendChild(oNewDiv);
					
					//飞来——跟中心的距离——方向
					
					(function (oNewDiv, disX, disY){
						setTimeout(function (){
							oNewDiv.style.WebkitTransform='translate3d(0,0,0)';
							oNewDiv.style.opacity=1;
							showNodes ++;
							if(showNodes == i * j && cb) cb();
						}, rnd(800, 1300));
					})(oNewDiv, disX, disY);
				}
			}
		}
		

		
		function hideAndShow (status, isBack) {
			
			animateSpread(function(){			
				animateAggregate(function(){
					isAnimating = false;
					$(".smoke").addClass("animated");
					setTimeout(function(){
						$(".titlePic").show();
						$(".ctn").hide();
						
					},800);
					
				});
			});
		}

	    setTimeout(function(){
	    	hideAndShow();
	    },1000);

	// $(".btn").on("click",function(){
	// 	hideAndShow();
	// });
	}

})();


$(".button").on("touchstart",function(){
	

	$(this).addClass("zhu");
	$(".word").addClass("animated");

});

$(".button").on("touchend",function(){
	if($(this).hasClass("zhu")){
		$(this).removeClass("zhu");
	}

	wordTween.start();
	// resultTween.start();
});

$(".left").on("click",function(){
	var index = innerSwiper.activeIndex;
	console.log(index);
	innerSwiper.slidePrev();
});
$(".right").on("click",function(){
	var index = innerSwiper.activeIndex;
	console.log(index);
	innerSwiper.slideNext();
	// 
	// innerSwiper.slideTo(index);
});

var orginH = {h:0};
var orginT = {d:0.2};

var dom = $(".result-container")[0];
var word = $(".word ")[0];
var resultTween = new TWEEN.Tween(orginH).to({h:1008},2000);
resultTween.easing(TWEEN.Easing.Quartic.Out);

var wordTween = new TWEEN.Tween(orginT).to({d:0.4},1000).onComplete(function(){

            resultTween.start();
        });
// wordTween.easing(TWEEN.Easing.Elastic.In);
resultTween.onUpdate(function(){
    dom.style.height = orginH.h+"px";
});
wordTween.onUpdate(function(){
	word.style.webkitAnimationDuration = orginT.d+"s";
});

function animate(){
	 TWEEN.update();
	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);