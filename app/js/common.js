

function slider_image () {
	var slidespeed = 700;
	var timeout = 3000;
	var links = true;
	$('.slider-images__item').css(
		{
			"position":"absolute",
			"top":'0',
			"left":'0'
		}).hide().eq(0).show();
	var slidenum = 0;
	var slidetime;
	var slideCount = $('.slider-images .slider-images__item').length;
	var animslide = function (arrow) {
		clearTimeout(slidetime);
		$('.slider-images__item').eq(slidenum).fadeOut(slidespeed);
		if(arrow=="next")
		{
			if(slidenum == (slideCount-1))
			{
				slidenum=0;
			}
			else
			{
				slidenum++;
			}
		}
		else if (arrow == "prew")
		{
			if(slidenum == 0)
			{
				slidenum=slideCount-1;
			}
			else
			{
				slidenum-=1;
			}
		}
		else
		{
			slidenum = arrow;
		}
		$('.slider-images__item').eq(slidenum).fadeIn(slidespeed, rotator);
		$('.control-slide').removeClass('active');
		$('.control-slide').eq(slidenum).addClass('active');
	}
	if(links)
	{
		var $linkarrow = $('<a id="prewbutton" href="#" class="slider-images__button slider-images__button--prev"></a><a href="#" id="nextbutton" class="slider-images__button slider-images__button--next"></a>').prependTo('.slider-images__container');
		$('#nextbutton').click(function () {
		   animslide("next");
		});
		$('#prewbutton').click(function () {
		   animslide("prew");
		});
	}
	var $adderspan = '';
	$('.slider-images__item').each(function (index) {
		var index= index+1;
	   $adderspan+='<span class="control-slide">'+index+'</span>';
	});
	$('<div class="slider-images__controls">'+$adderspan+'</div>').appendTo('.slider-images__container');
	$('.control-slide:first').addClass('active');
	$('.control-slide').click(function () {
	   var gotonum = parseFloat($(this).text()-1);
		console.log(gotonum);
		animslide(gotonum);
	});
	var pause = false;
	var rotator = function () {
		if(!pause)
		{
			slidetime = setTimeout(function () {
			   animslide('next')}, timeout);
		}
	}
	$('.slider-images__container').hover(
		function () {
			clearTimeout(slidetime);
			pause = true;
		},
		function () {
			pause = false;
			rotator();
		}
	);
	rotator();
}


function links_resize () {
	if($(document).width()<=1000)
	{
		$('.products__link--document').appendTo('.products__wrap--hide');
		$('.products__link--all').appendTo('.products__wrap--hide');
	}
	else
	{
		$('.products__link--document').appendTo('.products__wrap--first');
		$('.products__link--all').appendTo('.products__wrap--second');
	}
}




$(document).ready(function(){
	slider_image();
	$(window).resize(function(){
		links_resize();
	});
	var owl = $('.reviews__slider');
	owl.owlCarousel({
		loop:true,
		responsiveClass:true,
		items:1,
		autoplay:true,
	});
	owl.on("mousewheel", ".owl-wrapper", function (e) {
    if (e.deltaY > 0) {
      owl.trigger("owl.prev");
    } else {
      owl.trigger("owl.next");
    }
    e.preventDefault();
  });
	$(".reviews__buttons--next").click(function() {
    owl.trigger('next.owl.carousel');
    console.log(123);
  });
  $(".reviews__buttons--prev").click(function() {
    owl.trigger('prev.owl.carousel');
  });
});