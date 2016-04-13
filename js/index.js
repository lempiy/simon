var audioRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audioBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audioBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audioGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audioGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audioOrange = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var audioError = new Audio ('http://wav-library.net/effect/ErrorTone/WavLibraryNet_ErrorTone1.wav');
var audioWin = new Audio('http://zvuki-mp3.com/uploads/mp3/445c825fef5d4ce042b8b564ca7d1984.mp3')
var streak=[];
var playingButtons=$('#button-red, #button-blue, #button-green, #button-orange');
var gameStarted = false;
var counter=0;
var streakInterval;
var resetTimeout;
var errorTimeout;
var correctMoves = [];
var streakRule = false;

var redPlay = function(){
  if($('#button-red').hasClass('clickable')){
  makeUnclickable();
  $('#button-red').css('background', '#FD6B62');
  audioRed.play();
  timeoutButton = setTimeout(redNormalize, 300);
  }
}
var redNormalize = function(){
  $('#button-red').css('background', 'rgba(189,0,0,1)');
  makeClickable();
}
var bluePlay = function(){
  if($('#button-blue').hasClass('clickable')){
  makeUnclickable();
  $('#button-blue').css('background', '#8A8BFF');
  audioBlue.play();
  timeoutButton = setTimeout(blueNormalize, 300);
  }
}
var blueNormalize = function(){
  $('#button-blue').css('background', 'rgba(27,34,168,1)');
  makeClickable();
}
var greenPlay = function(){
  if($('#button-green').hasClass('clickable')){
  makeUnclickable();
  $('#button-green').css('background', '#7AFF7A');
  audioGreen.play();
  timeoutButton = setTimeout(greenNormalize, 300);
  }
}
var greenNormalize = function(){
  $('#button-green').css('background', 'rgba(0,145,39,1)');
  makeClickable();
}
var orangePlay = function(){
  if($('#button-orange').hasClass('clickable')){
  makeUnclickable();
  $('#button-orange').css('background', '#FEF477');
  audioOrange.play();
  timeoutButton = setTimeout(orangeNormalize, 300);
  }
}
var orangeNormalize = function(){
  $('#button-orange').css('background', '#D8A903');
  makeClickable();
}

function turnOnButtons(){
$('#button-red').on('mousedown', function(){
  redPlay();

  if(gameStarted){  
    if(checkPlayersMove('red')){
      correctMoves.push(true);
    } else {
      playerError();
    };
    if(correctMoves.length===streak.length){
      if(streak.length===20){
        gameWin();
        return;
      }
      replay();      
    }
  }
});
$('#button-blue').on('mousedown', function(){
  bluePlay();

  if(gameStarted){
    if(checkPlayersMove('blue')){

      correctMoves.push(true);

    } else {
      playerError();
    };
    if(correctMoves.length===streak.length){
      if(streak.length===20){
        gameWin();
        return;
      }
      replay();
    }
  };
});
$('#button-green').on('mousedown', function(){
  greenPlay();

  if(gameStarted){
    if(checkPlayersMove('green')){

      correctMoves.push(true);

    } else {
      playerError();
    };
    if(correctMoves.length===streak.length){
      if(streak.length===20){
        gameWin();
        return;
      }
      replay();      
    }
  }
});
$('#button-orange').on('mousedown', function(){ orangePlay();
                                   if(gameStarted){
    if(checkPlayersMove('orange')){

      correctMoves.push(true);

    } else {
      playerError();
    };
    if(correctMoves.length===streak.length){
      if(streak.length===20){
        gameWin();
        return;
      }
      replay();      
    }
  }
});
}
function turnOffButton(){
  playingButtons.each(function(index){
    $(this).off('mousedown');
  })
}
turnOnButtons();
var playerError = function(){
  makeUnclickable();
  $('#screen')[0].value='!!';
  audioError.play();
  errorTimeout = setTimeout(function(){
    makeClickable();
    var input=$('#screen');
    if(!streakRule){
      replay('norandom');
      if(counter<9){
    input[0].value = '0' + counter;
  } else {
    input[0].value = counter;
  }
    } else {
      if(counter<9){
    input[0].value = '0' + counter+1;
  } else {
    input[0].value = counter+1;
  }
      resetGame();
      replay();
    }
    
    
  },2000);
}
var randomPlay = function(){
  var i = getRandomInt(0, 4);
  switch (i) {
  case 0:
    redPlay();
    streak.push('red');
    break;
  case 1:
    bluePlay();
    streak.push('blue');
    break;
  case 2:
    greenPlay();
    streak.push('green');
    break;
  case 3:
    orangePlay();
    streak.push('orange');
    break;
}
  counter=streak.length;
}

var streakReplay = (function(){
  var count = 0;
  return function(num){
    var target = streak[count];
    if(num!==undefined){
      count=num;
      return;
    }
    switch (target) {
      case 'red':
        redPlay();
        count++;
        break;
      case 'blue':
        bluePlay();
        count++;
        break;
      case 'green':
        greenPlay();
        count++;
        break;    
      case 'orange':
        orangePlay();
        count++;
        break;    
    }  
  }
})();

var streakPlay = function(str){
  var interval;
  if(streak.length<5) {
    interval = 1000;
  } else if (streak.length>=5&&streak.length<10) {
    interval = 850;
  } else if(streak.length>=10&&streak.length<15) {
    interval = 700;
  } else {
    interval = 550;
  }
  
  
  var time = counter * interval+(interval-10);
  streakInterval = setInterval(streakReplay, interval);
  resetTimeout = setTimeout(function(){
    clearTimeout(streakInterval);
    if(str===undefined){
    randomPlay();
    }
    streakReplay(0);
    turnOnButtons();
  }, time);
};

var replay = function(str){
  correctMoves = [];
  checkPlayersMove('s', 0);
  turnOffButton();
  var input = $('#screen');
  if(counter<9){
    input[0].value = '0' + (counter+1);
  } else {
    input[0].value = (counter+1);
  }
  if(str!==undefined){
    streakPlay(str);
  } else {
  streakPlay();
  }
}

var resetGame = function(){
  clearTimeout(streakInterval);
    clearTimeout(resetTimeout);
    clearTimeout(errorTimeout);
    streakReplay(0);
    streak=[];
    counter=0;
    checkPlayersMove('s', 0);
    $('#screen')[0].value = '--';
    $('h1').css("animation", "none");
}

var checkPlayersMove = (function(){
   var n = 0;
  return function(str,num){
    var target = streak[n];
    if(num!==undefined){
      n=num;
      return;
    }
    var checker;
    if(str===target) {
      checker = true;
    } else {
      checker = false;
    }
    n++;
    if(n===counter+1){
      n=0;
    }
    return checker;
  }
})();

var gameWin = function(){
  turnOffButton();
  audioWin.play();
  $('h1').css("animation", "win 4s linear infinite");
}

$('#start').on('click', function(){
  if($('#start').hasClass('clickable')){
    if(!gameStarted){
    gameStarted = true;
  }
    resetGame();
    replay();
  }
});
$('#streak').on('click', function(){
  if($('#streak').hasClass('clickable')){
    if(!streakRule){
    streakRule = true;
    $('#indecator').css('background', 'red')
    
  } else {
    streakRule = false;
    $('#indecator').css('background', 'white')
  }
  }
});
$('#turn').on('click', function(){
  var switcher = $('#turn');
    if(switcher.hasClass('turnedoff')){
      switcher.css('flex-direction', 'row');
      switcher.removeClass('turnedoff');
      switcher.addClass('turnedon');
      $('#screen').css('color','darkgreen');
      makeClickable();
      return;
   }
   if(switcher.hasClass('turnedon')){
     switcher.css('flex-direction', 'row-reverse');
     switcher.removeClass('turnedon');
     switcher.addClass('turnedoff');
     $('#screen').css('color','#77DD77');
     streakRule = false;
    $('#indecator').css('background', 'white');
     makeUnclickable();
     resetGame();
     checkPlayersMove('s', 0);
     gameStarted=false;
     return;
   }  
});
function makeClickable(){
  var buttons = $('#button-red, #button-blue, #button-green, #button-orange, #start, #streak');
  buttons.each(function(index){
    $(this).addClass('clickable');
  })
}
function makeUnclickable(){
  var buttons = $('#button-red, #button-blue, #button-green, #button-orange, #start, #streak');
  buttons.each(function(index){
    $(this).removeClass('clickable');
  })
}
makeUnclickable();
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}