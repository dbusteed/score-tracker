#!/usr/bin/python3.8

import socketio
from readchar import readkey
from time import sleep
from sys import exit


def incRed():
    sio.emit('inc', {'x': 'red', 'y': 'blue'})

def incBlue():
    sio.emit('inc', {'x': 'blue', 'y': 'red'})

def decRed():
    sio.emit('dec', 'red')

def decBlue():
    sio.emit('dec', 'blue')

def reset():
    sio.emit('reset')

def stop():
    global listenting
    listenting = False

CODE_MAP = {
    '\x1b[H': stop,
    '\x1b[F': stop,
    '0': incBlue,           # numpad 0
    '.': incBlue,           # numpad .
    '1': incBlue,           # numpad 1
    '2': incBlue,           # numpad 2
    '3': incBlue,           # numpad 3
    '\x1b[D': incRed,       # arrow left
    '\x1b[B': incRed,       # arrow down
    '\x1b[C': incRed,       # arrow right
    '\x1b[A': incRed,       # arrow up
    '\x1b[6': decRed,       # page down
    '\x1b[5': decBlue,      # page up
    ' ': reset
}

connected = False
retry = 10
while retry > 0:
    try:
        sio = socketio.Client()
        sio.connect('http://localhost:4001')
        connected = True
        break
    except:
        print('connected to server!')
        print('couldnt connect to server, trying again')
        sleep(1)
    finally:
        retry -= 1

if not connected:
    print('couldnt connect to server, exitting')
    exit(1)

print('use HOME, HOME, Ctrl^C to quit')

listenting = True
while listenting:
    key = readkey()

    # this isn't really working?
    if key == '\x1b[H' or key == '\x1b[F':
        listenting = False

    elif key in CODE_MAP:
        CODE_MAP[key]()
        sleep(.4)
