CreateJS TypeScript Definitions
===============================

  
  
Development has changed into here:

<https://github.com/borisyankov/DefinitelyTyped>


It has more libraries there, be sure to check them out!

  
  
------------------------------------------------

  
  

Hello, here you can find the typescript definitions of createjs's libraries. Uses the MIT license.

This is still in its early stage, so if you find something wrong (maybe some argument that should be optional) be sure to tell.

  
  

Versions
========


    Typescript version: 0.8.0

    EaselJS: 0.5.0
    TweenJS: 0.3.0
    SoundJS: 0.3.0
    PreloadJS: 0.2.0

  
  

Usage
======


Just add at the beginning of the file:


    /// <reference path="path/to/easeljs-0.5.0.d.ts" />

    etc


  
  

Some issues
===========

- not sure about how to inherit from a createjs class (right now, I'm having a interface extend the class -- see the BitmapAnimation example)
- properties that can have different types
- methods that return different types
