# Running a local webserver

For very simple projects, you can right-click an `index.html` file and open it in Chrome. But for security reasons, there are some things JavaScript can't do when a page is running like this — for those, you need to run a **local webserver**.

## First things first — open a terminal window

On a Mac, you need to open Terminal.app. The easiest way is to open Spotlight (Cmd+Space on most keyboards, but yours might be different) and start typing 'Term...' until it appears, then hit enter when you see this icon:

<img width="674" alt="screen shot 2017-03-21 at 11 09 02 am" src="https://cloud.githubusercontent.com/assets/1162160/24154172/d189e0a6-0e26-11e7-9f2d-1d3053fd1e27.png">


## `cd` into your project directory

In the terminal, you need to **c**hange **d**irectory to the one that contains your folder. A quick way to do this is to type `cd ` (with the space!) and drag the directory from Finder into the terminal window.


## Option 1 — use `http-server`

If you have [Node.js](https://nodejs.org) installed (and you should by now, we did it in class!) then you can use `http-server`, which is the easiest solution. Just type `http-server` and go to [localhost:8080](http://localhost:8080).

If you get an error message and it doesn't work, you probably haven't installed `http-server` — just type `sudo npm install --global http-server` and type in your password when prompted.

If it *still* doesn't work, you probably don't have Node installed yet. Try Option 2.


## Option 2 — use `SimpleHTTPServer`

This one is a bit harder to remember, but it comes preinstalled on Macs. Type this into the terminal...

```bash
python -m SimpleHTTPServer
```

and go to [localhost:8000](http://localhost:8000).
