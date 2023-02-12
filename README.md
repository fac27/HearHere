# HearHere
An audio based country guessing game. 

<strong>The deployed github page is not functional, see below</strong>

## About
Inspired by [WorLdle](https://worldle.teuteuf.fr/) and [Wordle](https://www.nytimes.com/games/wordle/index.html)

The user is presented with two flags and a field recording. They must choose which country they think is associated with the recording, or pass and hear another recording to a maximum of 5.

Sounds and country data are sourced from [Rest Countries](https://restcountries.com/) and [Freesound](https://freesound.org/).

We use a curated list of countries sourced by querying Freesound and only keeping countries that returned more than 5 results.
 
## Installation 

Clone the project to your machine using
```
git clone https://github.com/fac27/HearHere
```

Launch in VSCode and use the [liveserver extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to launch the site.

We use an API key stored on a file called secret.js, contact us for this file OR apply to freesound for [your own API key](https://freesound.org/apiv2/apply/) and create a file called secret.js (it MUST be called secret.js) in your directory. The file should look like this.
```
export const key = "YOUR_API_KEY";
```
Be sure to replace "YOUR_API_KEY" with your own key in quotes.

DO NOT push secret.js to the public repository, the .gitignore file should do this for you.
