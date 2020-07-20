let socket = io()

$(function() {
  socket.on('scoresUpdate', updateScores) 
  // socket.on('gameOver', handleGameOver)
  
  function updateScores(scores) {
    document.getElementById("red").innerHTML = scores.red
    document.getElementById("blue").innerHTML = scores.blue
    
    if(scores.serve == 'red') {
      document.getElementById("red").style["text-decoration"] = 'underline'
      document.getElementById("blue").style["text-decoration"] = 'none'
    } else {
      document.getElementById("red").style["text-decoration"] = 'none'
      document.getElementById("blue").style["text-decoration"] = 'underline'
    }
  
  }

  $('.red, .blue').click(function() {
    $(this).animate({
      fontSize: "8rem"
    }, 200, function() {
      $(this).animate({
        fontSize: "5rem"
      })
    })
  })

  $('#reset').click(function() {
    $(this).animate({
      fontSize: "4rem"
    }, 200, function() {
      $(this).animate({
        fontSize: "2rem"
      })
    })
  })

})

function showScores() {
  $("#main").css("display", "none")
  $("#scores").css("display", "flex")
}

function showControls() {
  $("#main").css("display", "none")
  $("#controls").css("display", "flex")
}

function showMain() {
  $("#main").css("display", "flex")
  $("#controls").css("display", "none")
  $("#scores").css("display", "none")
}

function inc(x, y) {
	socket.emit('inc', {'x': x, 'y': y})
}

function dec(x) {
  socket.emit('dec', x)
}

function reset() {
  socket.emit('reset')
}