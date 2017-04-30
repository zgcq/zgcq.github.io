
(function($){
jQuery.fn.shadowSlideNum = function(options) {  
	var defaults = {
			hasTxt:true,
			hasNum:true,
			hasAllNum:true,
			adGshow:".shadowScroll_photo a",
			adGcontrol:".shadowScroll_control a",
			adGshowBox:".shadowScroll_photo",
			adGcontrolLeft:".shadowScroll_control_left a",
			adGcontrolRight:".shadowScroll_control_right a",
			currentClass: "on",
			waitSpeed:4000,
			speed:800,
			type:'fade',//fade:淡进淡出 moveLeft:左右滚动 moveTop:上下滚动
			showIndex: 0
	}
	var options = jQuery.extend(defaults, options);
	var adGshowDom = jQuery(this).find(options.adGshow);
	var adGshowBoxDom = jQuery(this).find(options.adGshowBox);
	var adGcontrolLeftDom = jQuery(this).find(options.adGcontrolLeft);
	var adGcontrolRightDom = jQuery(this).find(options.adGcontrolRight);
	adGbox = jQuery(this);
	
	adGshowDom.css({zIndex:10,opacity:0}).eq(options.showIndex).css({zIndex:11,opacity:1});//给图片加上默认样式
	
	var str = "";
	//if(adGshowDom.length>=1){
		for(var i =0; i<adGshowDom.length;i++){
			var oIntro = '';
			if(options.hasTxt){
				oIntro = adGshowDom.eq(i).attr("alt");
				str += "<a href='#'><span>"+oIntro+"</span></a>";
			}
			if(options.hasNum){
				oIntro = adGshowDom.eq(i).attr("alt");
				str += "<a href='#'>"+ (i+1) +"</a>";
			}
			if(options.hasAllNum){
				oIntro = adGshowDom.length;
				options.showIndex = (options.showIndex + 1) % adGshowDom.length;
				str += "<a href='#'>"+ ((options.showIndex)+1) +"/<span>"+oIntro+"</span></a>";
			}
		}
		adGbox.append("<div class='shadowScroll_control'>"+ str +"</div>").find(".control a");//添加控制按钮
		adGbox.append("<div class='shadowScroll_over'></div>");//添加遮罩层
	//}
	
	//这里是各种滚动的初始化
		/*if(options.type == 'moveLeft'){
			itmMove(adGshowDom,options.showIndex,false);
		//上下滚动
		}else if(options.type == 'moveTop'){
			itmMove(adGshowDom,options.showIndex,true);
		}*/
		
		//左箭头
		adGcontrolLeftDom.click(function() {
			autoScroll();
			return false
		})
		//右箭头
		adGcontrolRightDom.click(function() {
			autoScroll();
			return false
		})
		
	if(options.type == 'moveLeft'){
			for(var i=0;i<adGshowDom.size();i++){
				var width = adGshowDom.eq(options.showIndex).width();
				var adNow = adGshowDom.filter('.adNow').index();
				var moveWidth = (adNow - options.showIndex) * width;
				var itmLeft = (i - adNow)*width + moveWidth;
				adGshowDom.eq(i).css({left:itmLeft});
			}
	}else if(options.type == 'moveTop'){
			for(var i=0;i<adGshowDom.size();i++){
				var height = adGshowDom.eq(options.showIndex).height();
				var adNow = adGshowDom.filter('.adNow').index();
				var moveHeight = (adNow - options.showIndex) * height;
				var itmTop = (i - adNow)*height + moveHeight;
				adGshowDom.eq(i).css({top:itmTop});
		}
	}

	var adGcontrolDom = jQuery(this).find(options.adGcontrol);
	
	//控制数字按钮 hover属性
	adGcontrolDom.eq(options.showIndex).addClass(options.currentClass);
	adGcontrolDom.click(function(){
		jQuery(this).addClass(options.currentClass).siblings().removeClass(options.currentClass);
		options.showIndex = jQuery(this).index();
		//淡进淡出
		if(options.type == 'fade'){
			itmFadeTo(adGshowDom,options.showIndex);
		//左右滚动
		}else if(options.type == 'moveLeft'){
			itmMove(adGshowDom,options.showIndex,false);
		//上下滚动
		}else if(options.type == 'moveTop'){
			itmMove(adGshowDom,options.showIndex,true);
		}
		return false
	})
	
	var timer = setInterval(autoScroll, options.waitSpeed);
		
		
	//外层div hover时清除计时器 移出时启动计时器
	adGbox.hover (
		function(){
			clearInterval (timer);
		}
		,
		function(){timer = setInterval(autoScroll, options.waitSpeed)
		}
	);
	
	//自动播放的方法
	function autoScroll () {
		options.showIndex = (options.showIndex + 1) % adGshowDom.length;
		adGcontrolDom.eq(options.showIndex).click();
	}



	//淡进淡出
	function itmFadeTo(obj,index){
		obj.eq(index).css({left:0,top:0});
		obj.eq(index).stop().fadeTo(options.speed,1).css("zIndex",11).siblings().stop().fadeTo(options.speed,0).css("zIndex",10);
	}

	//从右往左移
	function itmMove(obj,index,isTop){
		if(isTop){
			obj.css({left:0,zIndex:11,opacity:1});	
		}else{
			obj.css({top:0,zIndex:11,opacity:1});
		}

		//宽度
		var width = obj.eq(index).width();
		//高度
		var height = obj.eq(index).height();
		//当前显示第几个
		var adNow = obj.filter('.adNow').index();
		//需要移动的宽度
		var moveWidth = (adNow - index) * width;
		//需要移动的高度
		var moveHeight = (adNow - index) * height;
		
		//如果当前显示的和将要选中的相同,则不操作。
		if(index == adNow){
			return;
		}
		
		for(var i=0;i<obj.size();i++){
			if(isTop){
				var itmTop = (i - adNow)*height + moveHeight;
				obj.eq(i).stop().animate({top:itmTop}, 800, function(){});
			}else{
				var itmLeft = (i - adNow)*width + moveWidth;
				obj.eq(i).stop().animate({left:itmLeft}, 800, function(){});
			}
		}
		
		obj.removeClass('adNow');
		obj.eq(index).addClass('adNow');
	}

	}
})(jQuery); 

/*!
	* Tab 1.0 
	* Date: 2011-07-05
	* Name: chenweigang
	* 调用相应的ID 在这个ID范围内 寻找nav、子项
	* 点击相应nav 隐藏的子项显示，并添加相应的 class
	* each 遍历函数 意思是 符合条件的每一个

*/

(function($) {
	$.fn.Tab = function (tabnav,tabcont,Hover,options) {
		var defaults = {
			defaultClass:"current"
		}
		var options = $.extend (defaults,options);	
		var _tabNav = $(this).find(tabnav);
		var _tabCont = $(this).find(tabcont);
		var _tabElem = _tabNav.find("a[hreflang]");
		
		
		_tabElem.each(function() {
			if(Hover == 0) {
				$(this).hover (function () {
					if(!$(this).hasClass(options.defaultClass)) {
					_tabElem.removeClass(options.defaultClass)
					$(this).addClass(options.defaultClass)

					_tabCont.hide()
					$($(this).attr("hreflang")).show();
				}
			 	});
			}else if(Hover == 1) {
					$(this).click (function () {
														
						if(!$(this).hasClass(options.defaultClass)) {
						_tabElem.removeClass(options.defaultClass)
						$(this).addClass(options.defaultClass)
	
						_tabCont.hide()
						$($(this).attr("hreflang")).show();
					}
						return false
					});
			}
			
		 });

	}
})(jQuery);

/*!
	* textSlider 1.0 
	* Date: 2011-12-20
	* Name: chenweigang
	* 上下滑动滚动
*/
(function($){
	$.fn.textSlider = function(settings){    
            settings = $.extend({
                speed : "normal",
                line : 2,
                timer : 3000
            }, settings);
            return this.each(function() {
                $.fn.textSlider.scllor( $( this ), settings );
            });
        };
	$.fn.textSlider.scllor = function($this, settings){
            var ul = $("ul:eq(0)",$this );
            var timerID;
            var li = ul.children();
            var liHight=$(li[0]).height();
            var upHeight=0-settings.line*liHight;//滚动的高度；
            var scrollUp=function(){
                ul.animate({marginTop:upHeight},settings.speed,function(){
                    for(i=0;i<settings.line;i++){
                        ul.find("li:first",$this).appendTo(ul);
                    }
                    ul.css({marginTop:0});
                });
            };
            var autoPlay=function(){
                timerID = window.setInterval(scrollUp,settings.timer);
            };
            var autoStop = function(){
                window.clearInterval(timerID);
            };
            //事件绑定
            ul.hover(autoStop,autoPlay).mouseout();
	};
})(jQuery);

/*!
	* mainSelect 1.0 
	* Date: 2012-03-15
	* Name: chenweigang
	* 仿select下拉菜单
*/
(function($){
	$.fn.mainSelect = function(selectShowBox,sec,options) {  
		var defaults = {
				Speed:300,
				waiteSpeed:50,
				Height: 21
		}
		var options = jQuery.extend(defaults, options);
		var SecDom = $(this).find(sec);
		var selectShowBoxDom = $(this).find(selectShowBox);
		
		selectShowBoxDom.hover(function(){						
				if(!$(SecDom).is(':visible')){
				$(SecDom).css({display:"block",top:"0"}).animate({top:options.Height},options.Speed);
				}
			},function () {
				$(SecDom).delay(options.waiteSpeed).fadeOut();
			});

	}
})(jQuery);

/*!
	* marqueeScroll 1.0 
	* Date: 2011-12-20
	* Name: chenweigang
	* 上下左右无缝滚动
	* 原理：1.把原有需要滚动的内容复制一份以便于操作
			2.算出复制内容后的整体遮罩层的宽度
			3.往左滚动时：当内容滚动到总体宽度/2的时候===就是原有内容完全消失，复制的内容的第一张显示在第一的位置上===这时把marginLfet设成0====就是以很快的速度把消失的原有内容重新拉回来====
			4.往右滚动时：当marginLeft值为 >0 的时候 就把复制的那部分内容拉到右边
	
	* 注意的点：1. 首先添加一个判断是否自动滚动的变量 isauto=true 这是为了滚动内容的总体高度或者宽度小于外层div的高度或者宽度的时候 不执行计时器部分的代码
				2. .css({width:11px})  注意大括号里面的内容 无法识别是字符串还是变量 会默认为字符串
				3. 谷歌浏览器对于图片的加载机制 导致滚动不能正常进行  需要把图片的宽和高同时加上

*/
(function($){
		$.fn.marqueeScroll = function(options){
			var isAuto = true; //默认开启滚动 (其实滚动和他一丁点关系都没有  是利用他控制是否启用计时器)
			var cssDirect="marginLeft"; //默认方向
			var defaults = {
				showCon:".marqueeScroll_con ul",
				controlLeft:".marqueeScroll_control_left a",
				controlRight:".marqueeScroll_control_right a",
				Ispeed:-1,
				showTime:30,
				showDirection:"left"
			}
			var options = $.extend(defaults,options);
			var showConDom = $(this).find(options.showCon);
			var controlLeftDom = $(this).find(options.controlLeft);
			var controlRightDom = $(this).find(options.controlRight);
			var showBox = $(this);
			//初始化滚动内容的总体高度和宽度 为下面的停止计时器提供依据
			var showLi = showConDom.find("li");
			var mainHeight = 0;
			var mainWidth = 0;
			showLi.each(function(){
				mainWidth += $(this).innerWidth();
				mainHeight += $(this).innerHeight();
			})
				
			//上下滚动
			if(options.showDirection == "top"){
				cssDirect="marginTop";
				showLi.css("float","none");
				if(mainHeight>showBox.height()){
					showConDom.html(showConDom.html()+showConDom.html())
					var showLi = showConDom.find("li");
					var mainHeight = 0;
					showLi.each(function(){
						mainHeight+=$(this).innerHeight();
					})
					showConDom.css("height",mainHeight)
					mainHW = mainHeight;
					var time = setInterval(autoScroll,options.showTime);
				}else{// 滚动内容总体高度小于外层div高度时停止计时器
					isAuto = false;
				}
			//左右滚动
			}else{
				if(mainWidth>showBox.width()){
					showConDom.html(showConDom.html()+showConDom.html())
					var showLi = showConDom.find("li");
					var mainWidth = 0;
					showLi.each(function(){
						mainWidth+=$(this).innerWidth();
					})
					showConDom.css("width",mainWidth)
					mainHW = mainWidth;
					var time = setInterval(autoScroll,options.showTime);
				}else{// 滚动内容总体宽度小于外层div宽度时停止计时器
					isAuto = false;
				}
			}		
			
			//自动滚动函数
			function autoScroll(){
				showConDom.css(cssDirect,parseInt(showConDom.css(cssDirect))+options.Ispeed+'px');
				if(parseInt(showConDom.css(cssDirect))<-mainHW/2){
					showConDom.css(cssDirect,0)
				};
				if(parseInt(showConDom.css(cssDirect))>0){
					showConDom.css(cssDirect,-mainHW/2);
				};
				//箭头
				controlLeftDom.click(function(){
					options.Ispeed=-1;						  
					 return false;
				});
				controlRightDom.click(function(){				
					options.Ispeed=1;						  
					 return false;
				});
			};
			//鼠标滑过清除计时器
			showConDom.hover(function(){
					clearInterval(time)
				},function(){
					if(isAuto == true){// 判断是否为真   以此来查证是否启用下面的代码
						time = setInterval(autoScroll,options.showTime)
					};
				});

		}
})(jQuery);

/*!
	* 由于大图绑定在href属性中，故一般而言，需使用a标签的href指向大图。仅支持png,gif,jpg,bmp四种格式的图片
    * 用法是：目标.preview();
		例如：<a href="xx.jpg">图片</a>
		$("a").preview();就可以了
*/
(function($){
	$.fn.preview = function(){
		var xOffset = 100;
		var yOffset = 100;
		var w = function(){
			if($.browser.msie){
				return document.compatMode == "CSS1Compat"? document.documentElement.clientWidth :
						 document.body.clientWidth;
			}else{
				return self.innerWidth;
			}
		}
		$(this).each(function(){
			$(this).hover(function(e){
				if(/.png$|.gif$|.jpg$|.bmp$/.test($(this).attr("hreflang"))){
					$("body").append("<div id='preview'><div><img src='"+$(this).attr('hreflang')+"' /><p>"+$(this).attr('title')+"</p></div></div>");
				}else{
					$("body").append("<div id='preview'><div><p>"+$(this).attr('title')+"</p></div></div>");
				}
				$("#preview").css({
					position:"absolute",
					padding:"4px",
					border:"1px solid #f3f3f3",
					backgroundColor:"#eeeeee",
					top:(e.pageY - yOffset) + "px",
					zIndex:1000
				});
				$("#preview > div").css({
					padding:"5px",
					backgroundColor:"white",
					border:"1px solid #cccccc"
				});
				$("#preview > div > p").css({
					textAlign:"center",
					fontSize:"12px",
					padding:"8px 0 3px",
					margin:"0"
				});
				if(e.pageX < w()/2){
					$("#preview").css({
						left:e.pageX + xOffset + "px"			  
					}).fadeIn("fast");
				}else{
					$("#preview").css("right",(w()-e.pageX + yOffset) + "px").delay(30000).fadeIn("fast");	
				}
			},function(){
				$("#preview").remove();
				
			}).mousemove(function(e){
				$("#preview").css("top",(e.pageY - xOffset) + "px")
				if(e.pageX < w()/2){
					$("#preview").css("left",(e.pageX + yOffset) + "px").css("right","auto");
				}else{
					$("#preview").css("right",(w()-e.pageX + yOffset) + "px").css("left","auto");
				}
			});						  
		});
	};
})(jQuery);

(function($) {
  $.fn.wordImgScroll = function(adGshow,adGcontrol) {
	   var adGshow = $(this).find(adGshow),
			adGcontrol = $(this).find(adGcontrol),
			currentClass = 'on',
			showIndex = 0
		
		// 设置所有图片的opacity以及zIndex值 -- 然后设置当前图片的opacity以及zIndex属性
		adGshow.css({
			zIndex:10,
			opacity:0
		}).eq(showIndex).css({
			zIndex:11,
			opacity:1
			})
		
		adGcontrol.eq(showIndex).addClass(currentClass); //给默认第一个加上相应class
			
		//事件处理程序
		function scrollFuc() {
			//给当前滑过的图片上面加class 其余的图片上面清除class
			adGcontrol.removeClass(currentClass);
			adGcontrol.eq(showIndex).addClass(currentClass)
			adGshow.eq(showIndex).stop().fadeTo("slow",1).css({zIndex: 11}).siblings().stop().fadeTo("slow",0).css({zIndex: 10})
		}
		
		//hover事件
		adGcontrol.hover(function() {
			clearInterval(time)	
			showIndex = $(this).index();	
			scrollFuc()
		},function(){time = setInterval (autoScroll,3000)})
		
		//hover外层div的时候清除计时器  移开之后启动计时器
		adGshow.hover(function(){
			clearInterval(time)	
		},function(){time = setInterval (autoScroll,3000)})
			
		//定义图片自动循环的方法
		function autoScroll() {
			showIndex = (showIndex + 1) % adGcontrol.length;//取余数的公式，让showIndex的值在a的长度之间切换。这里让showIndex+1，取到的是当前a的下一个a
			scrollFuc() //调用滚动方法
		}	
		
		time = setInterval (autoScroll,3000)	
  }
})(jQuery);

/*!代码调用*/

jQuery(document).ready(function(){
	jQuery(".wordImgScroll").wordImgScroll("a.ch_adG",".wordImgScrollControl a");							
	jQuery("#news").Tab("#newsNav li",".n_list",0);
	jQuery("#modInfroTab").Tab("#modInfroNav li",".modInfroCon",1);
	jQuery("#modEventTab").Tab("#modEventNav li",".modEventCon",1);
	jQuery("#modPlayer").Tab("#modPlayerNav li",".modPlayerCon",1);
	jQuery("#modPlayerCon1").Tab("#modPlayerSubNav li",".modPlayerSubCon",1);
	
	jQuery(".modGameInfroConBox .modAdShow li:last").addClass("marg0")
	
	jQuery("ul#menu1 > li:has(ul)").hover(
		function(){
			jQuery(this).find("a:first").addClass("current")
			jQuery(this).find("ul").stop(true,true).slideDown("fast");	
		},
		function(){
			jQuery(this).find("a:first").removeClass("current")
			jQuery(this).find("ul").stop(true,true).slideUp("fast");
		}
	);
});