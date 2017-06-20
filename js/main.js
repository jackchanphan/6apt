var pointer = 0;
$(function(){
	initCf();
	initScrollTop();
	initSearchBox();
	initLogo();
	$(document).keydown(function(e){
		var defaultResult = $('.default-result');
		if(e.keyCode==13 && $('input:focus').length==0){
			$('input').focus();
			defaultResult.show();
			pointer=0;
		}else if(e.keyCode == 40 && $(':focus').length>0){
			var page = $('.default-result .current').eq(0);
			var hotItems = page.find('.hot-item');
			if(pointer>=hotItems.length){
				pointer=0;
				defaultResult.scrollTop(0);
			}
			var hotItemNow = page.find('.hot-item:eq('+pointer+')');
			hotItems.css('background','#fff');
			hotItemNow.css('background','rgba(94,94,94,.1)');
			var obj = hotItemNow.get(0);
			if(obj.offsetTop+obj.offsetHeight>defaultResult.get(0).offsetHeight+defaultResult.scrollTop() ){
				defaultResult.scrollTop(defaultResult.scrollTop()+obj.offsetTop);
			}
			if(obj.offsetTop <defaultResult.scrollTop()){
				defaultResult.scrollTop(obj.offsetTop);
			}
				pointer++;
			
			
		}
	});
});
function initCf(){
	var li = $('.cf1 li');
	var ctrL = $('.banner-sec .ctr-l');
	var ctrR = $('.banner-sec .ctr-r');
	li.eq(0).siblings().hide();
	var duration = 5000;
	var curr=1;
	var timer=null;
	function go(){
		timer = setInterval(function(){
			li.eq(curr).fadeIn('slow');
			li.eq(curr++).siblings().fadeOut('slow');
			curr = curr%li.length;
		},duration);
	}
	go();
	ctrL.click(function(){
		clearInterval(timer);
		if(curr<0){
			curr = li.length-1;
		}
		li.eq(curr).fadeIn('slow');
		li.eq(curr--).siblings().fadeOut('slow');
		go();
	});
	ctrR.click(function(){
		clearInterval(timer);
		if(curr>=li.length){
			curr = 0;
		}
		li.eq(curr).fadeIn('slow');
		li.eq(curr++).siblings().fadeOut('slow');
		go();
	});
}
function initScrollTop(){
	var st = $('.scrollup').eq(0);
	var aside = $('aside');
	st.click(function(){
			var timer = setInterval(function(){
				var speed = $(document).scrollTop()-$(document).scrollTop()/50;
				if(speed<1){
					speed = 0;
					$(document).scrollTop(0);
					clearInterval(timer);
					return;
				}
				$(document).scrollTop(speed);
			}, 5);
	});
	checkAndToggle(st,aside);
	window.onscroll = function(){
		checkAndToggle(st,aside);
	}
}
function checkAndToggle(st,aside){
	if($(document).scrollTop()>400){
			st.show(500,function(){
				aside.css('height','281px');
			});
		}else{
			st.hide(500);
			aside.css('height','234px');
		}
}
function initSearchBox(){
	var input = $('.banner-sec .search-box input');
	var defautResult = $('.banner-sec .default-result');
	defautResult.hide();
	var arr = $('.banner-sec .search-box .countries li a');
	var li = $('.banner-sec  .hot-item');
	var countryBox = $('.banner-sec .src-country');
	var currA = $('.banner-sec .search-box .countries li .showflag ~a').get(0);
	input.focus(function(){
		defautResult.show();
			pointer=0;
	});
	input.blur(function(){
		defautResult.hide();
			pointer=0;
	});
	arr.hover(function(){
			$(this).prev().addClass('showflag');
		},function(i,ele){
			if(currA!=this){
				$(this).prev().removeClass('showflag');
			}
		}).click(function(){
			countryBox.removeClass('current');
			currA = this;
			pointer=0;
			$(this).parent().siblings().find('i').removeClass('showflag');
			$(this).prev().addClass('showflag');
			countryBox.eq(this.dataset.target).addClass('current').addClass('showflag');;
		});
	li.each(function(i,e){
		e.title = e.innerHTML;
	});
	li.hover(function(){
		$(this).parent().children().css('background','rgba(255,255,255,1)');
		pointer=0;
		$(this).css('background','rgba(94,94,94,.1)');
	},function(){
		$(this).css('background','rgba(255,255,255,1)');
	});
}
function initLogo(){
	$('.logo').click(function(){
		window.location.href = '#';
	});
}