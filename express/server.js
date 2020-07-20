const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 4001

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

let teams = ['red', 'blue']

let scores = {
  'red': 0,
  'blue': 0,
  'game': true,
  'serve': teams[Math.floor(Math.random() * teams.length)]
}

io.on('connection', socket => {
  console.log('client connected: ', socket.id)

  io.emit('scoresUpdate', scores)

  socket.on('inc', obj => {
    if(scores.game) {
      
      scores[obj.x] = scores[obj.x] + 1

      if( scores[obj.x] >= 10 && scores[obj.y] >= 10 ) {
        scores.serve = (scores.serve == 'red' ? 'blue' : 'red')
      } else if( (scores[obj.x] + scores[obj.y]) % 2 == 0 ) {
        scores.serve = (scores.serve == 'red' ? 'blue' : 'red')
      }

      if(scores[obj.x] > 10 && (scores[obj.x] >= (scores[obj.y]+2))) {
        // io.emit('gameOver', {winner: obj.x, loser: obj.y})
        scores.game = false
      }
      io.emit('scoresUpdate', scores)
    
    }
  })

  socket.on('dec', x => {
    if(scores.game) {
      if(scores[x] > 0) {
        scores[x] = scores[x] - 1
        io.emit('scoresUpdate', scores)
      }
    }
  })

  socket.on('reset', () => {
    scores = {
      'red': 0,
      'blue': 0,
      'game': true,
      'serve': teams[Math.floor(Math.random() * teams.length)]
    }
    io.emit('scoresUpdate', scores)
  })
  
  socket.on('disconnect', () => {
    console.log('client discnnect:', socket.id)
  })
})

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})