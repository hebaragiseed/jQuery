$(function(){
  $menu = $('nav li');
// header에 마우스 올라오면 글자색 변하도록
  $menu.on({
    'mouseenter':function() {
      $(this).addClass('on').siblings().removeClass('on')
    }    
  });

  //슬라이드 사진
  var slideIdx = Math.floor(Math.random() * $('.slide-photo li').length);
  $('.slide-photo li').eq(slideIdx).addClass('on').children('div').show();

  function slideMove(start, end, idx) {
    $('.slide-photo li').eq(idx).addClass('on').children('div').css({
      'left': start,
      'display': 'block'
    }).animate({
      'left': end
    }).parent().siblings().removeClass('on');
  }

  $('.slide-photo .next').on({
    'click': function() {
      slideMove('0','-100%',slideIdx);
      slideIdx++;
      slideMove('100%','0',slideIdx);
      if(slideIdx === $('.slide-photo li').length) {
        slideIdx = 0
        slideMove('100%','0',slideIdx)
      }
    }
  });

  $('.slide-photo .prev').on({
    'click': function() {
      slideMove('0','100%',slideIdx);
      slideIdx--;
      slideMove('-100%','0',slideIdx);
      if(slideIdx < 0) {
        slideIdx = $('.slide-photo li').length -1;
        slideMove('-100%','0',slideIdx);
      }
    }
  });

  $('.slide-photo li a').click(function() {
    var selectNum = $(this).parent('li').index();
    var currenttNum = $('.slide-photo li.on').index();

    if(selectNum > currenttNum) {
      slideMove('0', '-100%', currenttNum);
      slideMove('100%', '0', selectNum);
    } else if(selectNum < currenttNum) {
      slideMove('0', '100%', currenttNum);
      slideMove('-100%', '0', selectNum);
    }
  });

  var slideInter = setInterval(function() {
    $('.next').click();
  },2500);

  $('.slide-photo').mouseenter(function() {
    clearInterval(slideInter)
  }).mouseleave(function() {
    slideInter = setInterval(function() {
      $('.next').click();
    },2500)
  });
 //fade-photo
 var fadeIdx = 0;

var fadePhoto = function() {
  $('.fade-photo li').eq(fadeIdx).removeClass('on').children('img').fadeOut(1000,function() {
    fadeIdx++
    $('.fade-photo li').eq(fadeIdx).addClass('on').children('img').fadeIn(1000);
    if(fadeIdx === $('.fade-photo li').length) {
      fadeIdx = 0;
      $('.fade-photo li').eq(fadeIdx).addClass('on').children('img').fadeIn(2500);
    }
    });
  }
  var fadeInter = setInterval(fadePhoto, 2500);
  $('.fade-photo').mouseenter(function() {
    clearInterval(fadeInter)
  })
  $('.fade-photo').mouseleave(function() {
    fadeInter = setInterval(fadePhoto, 2500)
  })
  $('.fade-photo li a').click(function(event) {
    event.preventDefault();
    var selectIdx = $(this).parent().index();
    var crrentIdx = $('.fade-photo li.on').index();
    $('.fade-photo li').eq(crrentIdx).removeClass('on').children('img').fadeOut(1000,function() {
      $('.fade-photo li').eq(selectIdx).addClass('on').children('img').fadeIn(1000);
    })
  })

  //movie-view 영역
  $('.movie-view li a').click(function(event) {
    event.preventDefault();
    var url = $(this).attr('href');
    url = "https://www.youtube.com/embed/" + url;
    $('.movie-view iframe').attr('src',url);
    $(this).children('img').fadeTo(500, 0.5).parent().parent().siblings().find('img').fadeTo(500, 1);
  });
})


