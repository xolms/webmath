function slide_reviews () {
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
        $('.reviews__item').eq(slidenum).slideToggle(slidespeed);
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
        var $linkarrow = $('<a id="prewbutton-rev" href="#" class="reviews__button reviews__button--prev"></a><a href="#" id="nextbutton-rev" class="reviews__button reviews__button--next"></a>').prependTo('.reviews__content');
        $('#nextbutton-rev').click(function () {
            animslide("next");
        });
        $('#prewbutton-rev').click(function () {
            animslide("prew");
        });
    }
    var $adderspan = '';
    $('.reviews__item').each(function (index) {
        var index= index+1;
    });
    var pause = false;
    var rotator = function () {
        if(!pause)
        {
            slidetime = setTimeout(function () {
                animslide('next')}, timeout);
        }
    }
    $('.reviews__container').hover(
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
    links_resize();
    slide_reviews();
    slider_image();
    $(window).resize(function(){
        links_resize();
    });
});