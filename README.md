# IGuess-Worker-Holi
Worker responsible by match results and team info

##### MongoDB
The Holi worker have a user to holiDB Read and Write

## Stack
* Node.js v8.x.x // NPM v5.X
* MongoDB v3.4

## Steps to Add a new Championship
* Add static files at Google Storage (If it does not exist)
* Add the new League Collection to Mongo holiDB (If it does not exist)
* Add the new Teams Collection to Mongo holiDB (If it does not exist)
* Add the new championship Collection to Mongo holiDB
* Add the new api_footballs Collection to Mongo holiDB (If it does not exist)

## Pre-established pattern 
* Env variables are always called at config, with Capitalize and Underscore
* Enums are used with Capitalize
* The function are accessed by module.exports, there are no dependencia injected
* The file index.js is a pattern to export file
* There are no console.log or console.error, all console used is from Pino, a NPM installed
* The requires libs and variables at top file mandatorily need to follow the sequence: NPM modules, localFiles, Global Variables, Variables
* To all tests that is IO (InputOutput) tests, you must comment a description about the IO, like if a document need to exist in a DB
* To all IO tests, at test name it necessary to put [IO] at prefix

## Language
All functions and variables need to be in English