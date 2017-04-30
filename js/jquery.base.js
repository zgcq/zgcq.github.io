
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
			type:'fade',//fade:�������� moveLeft:���ҹ��� moveTop:���¹���
			showIndex: 0
	}
	var options = jQuery.extend(defaults, options);
	var adGshowDom = jQuery(this).find(options.adGshow);
	var adGshowBoxDom = jQuery(this).find(options.adGshowBox);
	var adGcontrolLeftDom = jQuery(this).find(options.adGcontrolLeft);
	var adGcontrolRightDom = jQuery(this).find(options.adGcontrolRight);
	adGbox = jQuery(this);
	
	adGshowDom.css({zIndex:10,opacity:0}).eq(options.showIndex).css({zIndex:11,opacity:1});//��ͼƬ����Ĭ����ʽ
	
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
		adGbox.append("<div class='shadowScroll_control'>"+ str +"</div>").find(".control a");//��ӿ��ư�ť
		adGbox.append("<div class='shadowScroll_over'></div>");//������ֲ�
	//}
	
	//�����Ǹ��ֹ����ĳ�ʼ��
		/*if(options.type == 'moveLeft'){
			itmMove(adGshowDom,options.showIndex,false);
		//���¹���
		}else if(options.type == 'moveTop'){
			itmMove(adGshowDom,options.showIndex,true);
		}*/
		
		//���ͷ
		adGcontrolLeftDom.click(function() {
			autoScroll();
			return false
		})
		//�Ҽ�ͷ
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
	
	//�������ְ�ť hover����
	adGcontrolDom.eq(options.showIndex).addClass(options.currentClass);
	adGcontrolDom.click(function(){
		jQuery(this).addClass(options.currentClass).siblings().removeClass(options.currentClass);
		options.showIndex = jQuery(this).index();
		//��������
		if(options.type == 'fade'){
			itmFadeTo(adGshowDom,options.showIndex);
		//���ҹ���
		}else if(options.type == 'moveLeft'){
			itmMove(adGshowDom,options.showIndex,false);
		//���¹���
		}else if(options.type == 'moveTop'){
			itmMove(adGshowDom,options.showIndex,true);
		}
		return false
	})
	
	var timer = setInterval(autoScroll, options.waitSpeed);
		
		
	//���div hoverʱ�����ʱ�� �Ƴ�ʱ������ʱ��
	adGbox.hover (
		function(){
			clearInterval (timer);
		}
		,
		function(){timer = setInterval(autoScroll, options.waitSpeed)
		}
	);
	
	//�Զ����ŵķ���
	function autoScroll () {
		options.showIndex = (options.showIndex + 1) % adGshowDom.length;
		adGcontrolDom.eq(options.showIndex).click();
	}



	//��������
	function itmFadeTo(obj,index){
		obj.eq(index).css({left:0,top:0});
		obj.eq(index).stop().fadeTo(options.speed,1).css("zIndex",11).siblings().stop().fadeTo(options.speed,0).css("zIndex",10);
	}

	//����������
	function itmMove(obj,index,isTop){
		if(isTop){
			obj.css({left:0,zIndex:11,opacity:1});	
		}else{
			obj.css({top:0,zIndex:11,opacity:1});
		}

		//���
		var width = obj.eq(index).width();
		//�߶�
		var height = obj.eq(index).height();
		//��ǰ��ʾ�ڼ���
		var adNow = obj.filter('.adNow').index();
		//��Ҫ�ƶ��Ŀ��
		var moveWidth = (adNow - index) * width;
		//��Ҫ�ƶ��ĸ߶�
		var moveHeight = (adNow - index) * height;
		
		//�����ǰ��ʾ�ĺͽ�Ҫѡ�е���ͬ,�򲻲�����
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
	* ������Ӧ��ID �����ID��Χ�� Ѱ��nav������
	* �����Ӧnav ���ص�������ʾ���������Ӧ�� class
	* each �������� ��˼�� ����������ÿһ��

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
	* ���»�������
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
            var upHeight=0-settings.line*liHight;//�����ĸ߶ȣ�
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
            //�¼���
            ul.hover(autoStop,autoPlay).mouseout();
	};
})(jQuery);

/*!
	* mainSelect 1.0 
	* Date: 2012-03-15
	* Name: chenweigang
	* ��select�����˵�
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
	* ���������޷����
	* ԭ��1.��ԭ����Ҫ���������ݸ���һ���Ա��ڲ���
			2.����������ݺ���������ֲ�Ŀ��
			3.�������ʱ�������ݹ�����������/2��ʱ��===����ԭ��������ȫ��ʧ�����Ƶ����ݵĵ�һ����ʾ�ڵ�һ��λ����===��ʱ��marginLfet���0====�����Ժܿ���ٶȰ���ʧ��ԭ����������������====
			4.���ҹ���ʱ����marginLeftֵΪ >0 ��ʱ�� �ͰѸ��Ƶ��ǲ������������ұ�
	
	* ע��ĵ㣺1. �������һ���ж��Ƿ��Զ������ı��� isauto=true ����Ϊ�˹������ݵ�����߶Ȼ��߿��С�����div�ĸ߶Ȼ��߿�ȵ�ʱ�� ��ִ�м�ʱ�����ֵĴ���
				2. .css({width:11px})  ע���������������� �޷�ʶ�����ַ������Ǳ��� ��Ĭ��Ϊ�ַ���
				3. �ȸ����������ͼƬ�ļ��ػ��� ���¹���������������  ��Ҫ��ͼƬ�Ŀ�͸�ͬʱ����

*/
(function($){
		$.fn.marqueeScroll = function(options){
			var isAuto = true; //Ĭ�Ͽ������� (��ʵ��������һ�����ϵ��û��  �������������Ƿ����ü�ʱ��)
			var cssDirect="marginLeft"; //Ĭ�Ϸ���
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
			//��ʼ���������ݵ�����߶ȺͿ�� Ϊ�����ֹͣ��ʱ���ṩ����
			var showLi = showConDom.find("li");
			var mainHeight = 0;
			var mainWidth = 0;
			showLi.each(function(){
				mainWidth += $(this).innerWidth();
				mainHeight += $(this).innerHeight();
			})
				
			//���¹���
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
				}else{// ������������߶�С�����div�߶�ʱֹͣ��ʱ��
					isAuto = false;
				}
			//���ҹ���
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
				}else{// ��������������С�����div���ʱֹͣ��ʱ��
					isAuto = false;
				}
			}		
			
			//�Զ���������
			function autoScroll(){
				showConDom.css(cssDirect,parseInt(showConDom.css(cssDirect))+options.Ispeed+'px');
				if(parseInt(showConDom.css(cssDirect))<-mainHW/2){
					showConDom.css(cssDirect,0)
				};
				if(parseInt(showConDom.css(cssDirect))>0){
					showConDom.css(cssDirect,-mainHW/2);
				};
				//��ͷ
				controlLeftDom.click(function(){
					options.Ispeed=-1;						  
					 return false;
				});
				controlRightDom.click(function(){				
					options.Ispeed=1;						  
					 return false;
				});
			};
			//��껬�������ʱ��
			showConDom.hover(function(){
					clearInterval(time)
				},function(){
					if(isAuto == true){// �ж��Ƿ�Ϊ��   �Դ�����֤�Ƿ���������Ĵ���
						time = setInterval(autoScroll,options.showTime)
					};
				});

		}
})(jQuery);

/*!
	* ���ڴ�ͼ����href�����У���һ����ԣ���ʹ��a��ǩ��hrefָ���ͼ����֧��png,gif,jpg,bmp���ָ�ʽ��ͼƬ
    * �÷��ǣ�Ŀ��.preview();
		���磺<a href="xx.jpg">ͼƬ</a>
		$("a").preview();�Ϳ�����
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
		
		// ��������ͼƬ��opacity�Լ�zIndexֵ -- Ȼ�����õ�ǰͼƬ��opacity�Լ�zIndex����
		adGshow.css({
			zIndex:10,
			opacity:0
		}).eq(showIndex).css({
			zIndex:11,
			opacity:1
			})
		
		adGcontrol.eq(showIndex).addClass(currentClass); //��Ĭ�ϵ�һ��������Ӧclass
			
		//�¼��������
		function scrollFuc() {
			//����ǰ������ͼƬ�����class �����ͼƬ�������class
			adGcontrol.removeClass(currentClass);
			adGcontrol.eq(showIndex).addClass(currentClass)
			adGshow.eq(showIndex).stop().fadeTo("slow",1).css({zIndex: 11}).siblings().stop().fadeTo("slow",0).css({zIndex: 10})
		}
		
		//hover�¼�
		adGcontrol.hover(function() {
			clearInterval(time)	
			showIndex = $(this).index();	
			scrollFuc()
		},function(){time = setInterval (autoScroll,3000)})
		
		//hover���div��ʱ�������ʱ��  �ƿ�֮��������ʱ��
		adGshow.hover(function(){
			clearInterval(time)	
		},function(){time = setInterval (autoScroll,3000)})
			
		//����ͼƬ�Զ�ѭ���ķ���
		function autoScroll() {
			showIndex = (showIndex + 1) % adGcontrol.length;//ȡ�����Ĺ�ʽ����showIndex��ֵ��a�ĳ���֮���л���������showIndex+1��ȡ�����ǵ�ǰa����һ��a
			scrollFuc() //���ù�������
		}	
		
		time = setInterval (autoScroll,3000)	
  }
})(jQuery);

/*!�������*/

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