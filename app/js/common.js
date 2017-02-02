function menu() {
	$('.menu__link--open').click(function(event) {
		$('.menu__list--first').toggleClass('menu__list--first--hide');
		$('.menu__list--second').toggleClass('menu__list--second--show');
		$('.menu__link--open').parent().toggleClass('activepopup');
	});
	$('.header__burger').click(function(event) {
		$('.menu').slideToggle();
	});
}



function valid_form() {
	var namein = $('#input_name');
	var nameval = false;
	var phonein = $('#input_phone');
	var phoneval = false;
	console.log(phoneval,nameval);

	phonein.keydown(function(event) {
        // Разрешаем: backspace, delete, tab и escape
        if ( event.keyCode == 46 || event.keyCode == 8  || event.keyCode == 9 || event.keyCode == 27 || 
             // Разрешаем: Ctrl+A
             (event.keyCode == 65 && event.ctrlKey === true) || 
             // Разрешаем: home, end, влево, вправо
             (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // Ничего не делаем

               return;

             }
             else {
             	phoneval = true;
            // Обеждаемся, что это цифра, и останавливаем событие keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            	event.preventDefault(); 

            }   
          }
        });



}
function clear_form() {
	$('.whoyou__bottomtitle').hide();
	$('.whoyou__list').hide();
	$('#input_category').val('');
	$('.whoyou__topitem').removeClass('active');
}
function formopen(classs,category){
	$('#you'+classs).click(function(event) {
		clear_form();
		$(this).addClass('active');
		$('.whoyou__bottomwrap').show();
		$('.whoyou__bottomtitle--'+classs).show();
		$('.whoyou__list--'+classs).show();
		$('#input_category').val(category);
	});
	

}
function form_replace(){
	formopen('ip','Индивидуальный предприниматель');
	formopen('sr','Владелец среднего бизнеса');
	formopen('gs','Директор гос. предприятия');
	formopen('kb','Владелец крупного бизнеса');
	formopen('sp','Владелец Start-up');
	formopen('dn','Не могу определиться');
}

function slider_port () {
	var slidespeed = 700;
	var timeout = 3000;
	var links = true;
	$('.portfolio__item').css(
	{
		"position":"absolute",
		"top":'0',
		"left":'0'
	}).hide().eq(0).show();
	var slidenum = 0;
	var slidetime;
	var slideCount = $('.portfolio__slider .portfolio__item').length;
	var animslide = function (arrow) {
		clearTimeout(slidetime);
		$('.portfolio__item').eq(slidenum).fadeOut(slidespeed);
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
		$('.portfolio__item').eq(slidenum).fadeIn(slidespeed, rotator);
	}
	if(links)
	{
		$('.portfolio__buttons--next').click(function () {
			animslide("next");
		});
		$('.portfolio__buttons--prev').click(function () {
			animslide("prew");
		});
	}

	var pause = false;
	var rotator = function () {
		if(!pause)
		{
			slidetime = setTimeout(function () {
				animslide('next')}, timeout);
		}
	}
	$('.portfolio__slider').hover(
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
function slider_rev () {
	var slidespeed = 700;
	var timeout = 3000;
	var links = true;
	$('.reviews__item').css(
	{
		"position":"absolute",
		"top":'0',
		"left":'0'
	}).hide().eq(0).show();
	var slidenum = 0;
	var slidetime;
	var slideCount = $('.reviews__slider .reviews__item').length;
	var animslide = function (arrow) {
		clearTimeout(slidetime);
		$('.reviews__item').eq(slidenum).fadeOut(slidespeed);
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
		$('.reviews__item').eq(slidenum).fadeIn(slidespeed, rotator);
	}
	if(links)
	{
		$('.reviews__buttons--next').click(function () {
			animslide("next");
		});
		$('.reviews__buttons--prev').click(function () {
			animslide("prew");
		});
	}

	var pause = false;
	var rotator = function () {
		if(!pause)
		{
			slidetime = setTimeout(function () {
				animslide('next')}, timeout);
		}
	}
	$('.reviews__slider').hover(
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
		var $linkarrow = $('<div id="prewbutton" class="slider-images__button slider-images__button--prev"></div><div id="nextbutton" class="slider-images__button slider-images__button--next"></div>').prependTo('.slider-images__container');
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
	$('.slider-images').hover(
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
	slider_rev();
	menu();
	form_replace();
	valid_form();
	slider_port();
	$(window).resize(function(){
		links_resize();
	});
});