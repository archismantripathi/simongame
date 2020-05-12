  /////////////////
//ARCHISMAN TRIPATHI//
  /////////////////
var dearButtons=["red", "blue", "green", "orange"],
    gamePattern=[], inputPattern=[],
    level=0,
    started=false,
    nextSequenceBusy=false, activateUserBusy=true, checkerBusy=false;

$(document).click(starter);
$(document).keydown(function()
{
  keySupport(event.key);
  starter();
});

function starter()
{
  if(!started)
  {
    started=true;
    $(".btn").off("click");
    gamePattern=[];
    level=0;
    checkerBusy=false;
    nextSequenceBusy=false;
    nextSequence();
    activateUser();
  }
}

function nextSequence()
{
  if(!nextSequenceBusy)
  {
    nextSequenceBusy=true;
    var thatColor=dearButtons[Math.floor(Math.random()*4)];
    gamePattern.push(thatColor);
    $("#main-title").html("Level "+(++level));
    $("#" + thatColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(thatColor);
    animatePress(thatColor);
    inputPattern = [];
    activateUserBusy = false;
  }
}

function activateUser()
{
  $(".btn").click(function()
  {
    if(!activateUserBusy)
    {
      activateUserBusy=true;
      var thatColor = $(this).attr("id");
      inputPattern.push(thatColor);
      if(checker(inputPattern.length))
      {
        if(gamePattern.length === inputPattern.length)
        {
          nextSequenceBusy=false;
          setTimeout(nextSequence,500);
        }
        checkerBusy = false;
        activateUserBusy=false;
      }
      else
      {
        console.log("GAME OVER!!! You end up loosing level "+level+", Great work keep it up.!!!");
        stopper();
      }
      playSound(thatColor);
      animatePress(thatColor);
    }
  });
}

function keySupport(key)
{
  key=key.toLowerCase();
  switch (key) {
    case "q":
      $("#green").click();
      break;
    case "w":
      $("#red").click();
      break;
    case "e":
      $("#orange").click();
      break;
    case "r":
      $("#blue").click();
      break;
  }
}

function checker(n) {
  if(!checkerBusy)
  {
    checkerBusy = true;
    var result = (gamePattern[n-1]===inputPattern[n-1]);
    return result;
  }
}

function stopper()
{
  playSound("wrong");
  $("body").addClass("game-over");
  $("#main-title").html("Game Over, Press any key or click anywhere to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
    started=false;
  }, 200);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
