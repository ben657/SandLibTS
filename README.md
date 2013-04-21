# SandLibTS

This is a basic (at the moment) JavaScript library for making games. It uses the HTML5 canvas element for all rendering.

At the moment, the general structure is similar to that of Flahspunk (an AS3 game library) in which you create various "scenes" which will contain all the logic and elements for whatever your game is going to do. These for myself are generally menus or levels within the game.

Once you have a scene, you will add entities onto it which will generally represent sprites/images on the screen. Each entity has an x and y co-ordinate, as well as an image. 

Images are loaded through the main Engine class, where you ask it to retrieve an image. If it has already been loaded, it is sent straight back, but if it not, it will be loaded from the path specified, and stored for later, quick use. This also stops an image being loaded more than once when not needed as long as the Engine class is used.

## TypeScript

This library was written in typescript, a strongly typed language which can be compiled straight down into javascript for use in websites. Because of this, any examples will be given using TypeScript and the definition files will be given for use in programming, however the library should work perfectly fine in pure JS, so if you can work it out, go ahead!

## Quick Start

_Coming Soon_




