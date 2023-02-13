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

## Project Brief

This game is a project for [Founders and Coders](https://www.foundersandcoders.com/). The project brief is to build an app that queries at least two APIs and uses the results to update the DOM. There should be a way for the user to search, filter, sort or otherwise affect what is displayed.

### Core User Stories 
As a user, I want to:
- See an interesting mashup of different data
- Input information to change the displayed result
- View the app on all of my devices

### Stretch User Stories 
- As an impatient user, I want to see some indication that data is loading
- As a confused user, I want to be told when something goes wrong

### Acceptance Criteria 
- Query at least two APIs using fetch
- Dynamic content generated with JS
- A clearly defined user journey, documented in your readme
- A responsive, mobile-first design
- Ensure your app is accessible to as many different users as possible

### Project-Specific User Stories
As a regular geography / puzzle game player, I want:
- The game to be fun! It should present a varied and interesting range of sounds with a fair level of challenge
- To be able to store my stats and keep track of my results between sessions
- To read instructions in-app that explain how to play the game
- A UI that is visually pleasing and easy to navigate

## Progress and Next Steps

### Progress
Initial version of the app created.

User can:
- Load new countries, audio and flags at the beginning of each round
- Choose an answer and receive feedback on whether they are correct
- Load a new round and play again

### Next Steps
- Store user statistics in local storage
- Add pop-up windows to display instructions and user statistics
- Create gradual reveal of 5 sounds in stages and a points system based on how many audio clips are needed
- Add a loading screen while audio is being fetched from API
- Curate list of countries further to ensure only appropriate sounds are presented
- Allow user to make changes to the data retrieved e.g. by editing the list of countries
- Further styling and UI adjustments
