# SandLibTS

This is a basic (at the moment) JavaScript library for making games. It uses the HTML5 canvas element for all rendering.

At the moment, the general structure is similar to that of Flahspunk (an AS3 game library) in which you create various "scenes" which will contain all the logic and elements for whatever your game is going to do. These for myself are generally menus or levels within the game.

Once you have a scene, you will add entities onto it which will generally represent sprites/images on the screen. Each entity has an x and y co-ordinate, as well as an image. 

Images are loaded through the main Engine class, where you ask it to retrieve an image. If it has already been loaded, it is sent straight back, but if it not, it will be loaded from the path specified, and stored for later, quick use. This also stops an image being loaded more than once when not needed as long as the Engine class is used.

## TypeScript

This library was written in typescript, a strongly typed language which can be compiled straight down into javascript for use in websites. Because of this, any examples will be given using TypeScript and the definition files will be given for use in programming, however the library should work perfectly fine in pure JS, so if you can work it out, go ahead!

## Quick Start

So in this section, i'll go through making a very quick game (I suppose you could call it that) where you load an image, and have it move around in response to your choice of keys.

So first, we need to download the library (I'll assume you already have typescript installed. If not, grab it at: http://www.typescriptlang.org) by grabbing the zip from github.

Now, the way I do this, is make a folder for your project. Lets say C:\MyGameProject.
Then copy the SandLib folder from the zip you downloaded before into here. Then, make a folder in your project folder for the actual game code.

In this folder, make a file named TestGame.ts and open it to edit.
Copy and paste this code into here:
```JavaScript
//These lines tell the compiler where to find the other files we will be using so that we can access the classes in them.
/// <reference path="../SandLib/Core/Engine.ts"/>
/// <reference path="MainScene.ts"/>

//This line defines a module, which will allow us to keep code across multiple files all related to each other
module MyGame {
    //Here we define the Main class where we will initialize the engine
    export class Main{
         //The class constructor is called whenever we do "new classname()"
        constructor() {
            //Get the canvas element we will define in our html file
            var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
            //This is the First scene that we will be creating after this file
            var initialScene = new MainScene();
            //Pass all of these things to the libraries Engine class, which will start our game!
            SandLib.Engine.init(initialScene, canvas);
        }
    }
}

//This is just where the html document will load the JS file from, so we load our main class
var game = new TestGame.Main();
```
Now that we have our main class, let's make our first scene, where we will create and move our square!
```JavaScript
//More compiler notes for the files we are using
/// <reference path="../SandLib/Core/Scene.ts"/>
/// <reference path="../SandLib/Core/Entity.ts"/>
/// <reference path="../SandLib/Core/Input.ts"/>

//Notice this is the same as the module we used before. This means these two classes are in the same module, and can be used without any extra work.
module MyGame {
    //Define our mainScene class, extending the libraries Scene class so that we can use that classes behaviour.
    export class MainScene extends SandLib.Scene {

        //Define an entity which we will give an image to, and move around.
        e:SandLib.Entity = new SandLib.Entity(10,10);

        constructor() {
            //This line calls the constructor of the class we are extending (Scene) which does some setup for us.
            super();
            //Set the image of our entity using the Engine to load it.
            this.e.image = SandLib.Engine.getImage("random.png");
            //Add the entity to our scene so that it gets drawn.
            this.add(this.e);
        }

        //The update function is in the Scene class, and gets called every time the frame is changed (a lot of times per second!) and here we override it to give our own behaviour.
        update() {
            //Make sure the built in functionality is run
            super.update()            
            //Here we check if the key with KeyCode 65 (A) is pressed
            if (SandLib.Input.isKeyDown(65)) {
                //And if it is, we move our entity back by 0.5 pixels in the X direction
                this.e.x -= 0.5;
            }
            //Check for D
            if (SandLib.Input.isKeyDown(68)) {
                this.e.x += 0.5;
            }
            //Check for W
            if (SandLib.Input.isKeyDown(87)) {
                this.e.y -= 0.5;
            }
            //Check for S
            if (SandLib.Input.isKeyDown(83)) {
                this.e.y += 0.5;
            }
        }
    }
}
```
So, now open a console and move to your project directory. Once there, run the command: tsc --out MyGame.js MyGame/MyGame.ts
This will compile all our code down to one js file we can use to run the game!
So to run it, lets make our html file.
```
<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>TypeScript HTML App</title>

</head>
<body>
    <h1>TypeScript HTML App</h1>
    <canvas id="canvas" width="640" height="480"></canvas>       
    <script src="MyGame.js"></script>
    <div id="content"></div>
</body>
</html>
```
Run that html file in your browser, and if all has gone well, you'll have a working game where you can move your box!


