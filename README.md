# score tracker

lil tool for keeping track of scores (primarily ping pong, but can easily be altered)

## contents
* `main` is a Bash entrypoiny, it's the easiest way to get things up an running
* `express/` contains a NodeJS Express app. the server handles the score and the client connections. you can browse to the machine's `localhost:4001` to view the scores and/or update the scores
* `clients/` contains a Python script that connects to the Express server and sends socket signals thru the keyboard

## usage
the tracker is pretty flexible, and can be used in a number of ways

i personally designed it so that I could start the server, view the score on a tablet or phone, and then send update signals to the server by tapping a keyboard with my feet