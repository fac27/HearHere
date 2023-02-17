import { key } from "./secret.js";
import { curatedCountries } from "./curatedCountries.js";

localStorage.clear()

//    ****    || MAIN FUNCTION ||   ****

//  Load new round calls our update DOM functions, which subsequently call
//  our fetch functions.

loadNewRound()

function loadNewRound() {
  const previousAudio = document.querySelectorAll("audio");  
  const starsHTMLColl = document.getElementById('stars').children;
  let stars = Array.prototype.slice.call(starsHTMLColl, 0);
  for (const star of stars){
    star.classList.remove("fa-regular");
    star.classList.add('fa-solid');
  }
  for (let i = 0; i < previousAudio.length; i++) {
    previousAudio[i].remove()
  }
  document.getElementById("correctAnswerPopup").style.display = "none";
  document.getElementById("incorrectAnswerPopup").style.display = "none";
  let countryOne = generateRandomCountry();
  let countryTwo = generateRandomCountry();

  while(countryTwo === countryOne) {
    countryTwo = generateRandomCountry();
  }

  loadAudio(countryOne);
  displayFlags(countryOne, countryTwo);
}

//  ****  || UPDATE DOM FUNCTIONS || ****

//  These call our fetch functions and update the DOM with the data

async function loadAudio(countryOne) {
  const soundObject = await getCountrySounds(countryOne);
  const parentElement = document.getElementById("audioContainer");
  for (let i = 0; i < 5; i++){
    const soundUrl = soundObject[`preview${i}`];
    const audioPlayer = document.createElement("AUDIO");
    audioPlayer.id = `audioplayer${i}`
    audioPlayer.src = soundUrl;
    audioPlayer.setAttribute("controls", "true");
    audioPlayer.style.display = "none";
    parentElement.appendChild(audioPlayer);
  }
  document.getElementById("audioplayer0").style.display = "block"
}

async function displayFlags(countryOne, countryTwo) {
  try {
    let flagObj = await getCountryFlags(countryOne,countryTwo);
    const flagsElements = document.getElementsByClassName("flag");
    //copy to array so we can splice later
    const flagsArr = Array.prototype.slice.call(flagsElements, 0);
    //randomise flag one
    let flagOnePos = Math.floor(Math.random() * 2);
    //set it to that pos
    flagsArr[flagOnePos].src = flagObj.flagOne;
    flagsArr[flagOnePos].classList.remove("correct", "incorrect")
    flagsArr[flagOnePos].classList.add("correct")
    //flagsArr[flagOnePos].className = "flag correct";
    flagsArr[flagOnePos].parentElement.nextElementSibling.innerHTML = capitaliseCountryName(countryOne);

    //remove from array
    flagsArr.splice(flagOnePos, 1);
    //set flag two to remaining pos
    flagsArr[0].src = flagObj.flagTwo;
    flagsArr[0].classList.remove("correct", "incorrect")
    flagsArr[0].classList.add("incorrect")
    //flagsArr[0].className = "flag incorrect";
    flagsArr[0].parentElement.nextElementSibling.innerHTML = capitaliseCountryName(countryTwo);

    //add new event listeners
    for (let i = 0; i < flagsElements.length; i++) {
      flagsElements[i].addEventListener('click', checkAnswer);
    }

  } catch (error) {
    console.error(error);
  }
}

//    ****   || FETCH FUNCTIONS ||    ****

//  These grab the data from the APIS

async function getCountrySounds(countryOne) {
    try {
      const soundsObj = []
      const response = await fetch(`https://freesound.org/apiv2/search/text/?query=${countryOne}&token=${key}`);
      const sounds = await response.json();
      for (let i = 0; i < 5; i++){
        const randomSound = sounds.results[Math.floor(Math.random() * sounds.results.length)];
        const soundId = randomSound.id;
        const soundResponse = await fetch(`https://freesound.org/apiv2/sounds/${soundId}?token=${key}`);
        const soundData = await soundResponse.json();
        const soundPreviewUrl = soundData.previews['preview-hq-mp3'];
        soundsObj[`preview${i}`] = soundPreviewUrl;
      }
      return soundsObj;
    } catch (error) {
      console.error(error);
    }
  }

async function getCountryFlags(countryOne, countryTwo){
  try {
    const requests = [
      fetch(`https://restcountries.com/v3.1/name/${countryOne}`),
      fetch(`https://restcountries.com/v3.1/name/${countryTwo}`)
    ]
    const [countryOneResponse, countryTwoResponse] = await Promise.all(requests);
    const countryOneData = await countryOneResponse.json();
    const countryTwoData = await countryTwoResponse.json();
    const flagRequests = [
      fetch(countryOneData[0].flags.png),
      fetch(countryTwoData[0].flags.png)
    ]
    const [flagOneResponse, flagTwoResponse] = await Promise.all(flagRequests);
    const flagOneData = await flagOneResponse.blob();
    const flagTwoData = await flagTwoResponse.blob();
    const flagURLOne = URL.createObjectURL(flagOneData);
    const flagURLTwo = URL.createObjectURL(flagTwoData);
    
    return {flagOne: flagURLOne, flagTwo: flagURLTwo};
    
} catch (error) {
    console.error(error);
  }
}

//    ****  || FUNCTIONS THAT HANDLE USER ANSWERS ||    ****

let passCount = 0
document.getElementById("btnPass").addEventListener('click', (e)=>{
  passCount += 1
  const audioPlayersArr = document.querySelectorAll("audio");
  const starsHTMLColl = document.getElementById('stars').children;
  let stars = Array.prototype.slice.call(starsHTMLColl, 0);
  
  if (passCount < 5){
    document.getElementById(`audioplayer${passCount}`).style.display = 'block';    
    stars.at(passCount * -1).classList.remove("fa-solid");
    stars.at(passCount * -1).classList.add('fa-regular');
  } if (passCount >= 5 && document.getElementById('noAudio').classList.contains('hide')){
    document.getElementById('noAudio').classList.toggle('hide');
  }
})

function storeData (answer) {

  let gamesPlayedKey = "Games Played";
  let gamesPlayedValue = localStorage.getItem("Games Played");
  let fiveStarGamesKey = "Five Star Games";
  let fiveStarGamesValue = localStorage.getItem("Five Star Games");
  let fourStarGamesKey = "Four Star Games"; 
  let fourStarGamesValue = localStorage.getItem("Four Star Games");
  let threeStarGamesKey = "Three Star Games"; 
  let threeStarGamesValue = localStorage.getItem("Three Star Games");
  let twoStarGamesKey = "Two Star Games";
  let twoStarGamesValue = localStorage.getItem("Two Star Games");
  let oneStarGamesKey = "One Star Games";
  let oneStarGamesValue = localStorage.getItem("One Star Games");
  let zeroStarGamesKey = "Zero Star Games"; 
  let zeroStarGamesValue = localStorage.getItem("Zero Star Games");

  const gameStatsArr = [fiveStarGamesValue, fourStarGamesValue, threeStarGamesValue, twoStarGamesValue, oneStarGamesValue,zeroStarGamesValue];
  const gameKeyArr = [fiveStarGamesKey, fourStarGamesKey, threeStarGamesKey, twoStarGamesKey, oneStarGamesKey, zeroStarGamesKey];
  
  //increase gamesplayed first
  addToScores(gamesPlayedKey, gamesPlayedValue)
  
  gameStatsArr.forEach((stat, index) => {
    if (answer === 'correct' && passCount === index){
      //if the answer is right, update relevant key
      addToScores(gameKeyArr[index], stat);
    } else if (answer === 'incorrect'){
      //if incorrect update zerostargames
      addToScores(zeroStarGamesKey, zeroStarGamesValue);}
  })

  // function to add to numbers of scores for each star type
  function addToScores(key, value) {
    value = Number(value) + 1;
    localStorage.setItem(key, value);
  }
  const gameArr = [
    Number(localStorage['Five Star Games']),
    Number(localStorage['Four Star Games']),
    Number(localStorage['Three Star Games']),
    Number(localStorage['Two Star Games']),
    Number(localStorage['One Star Games']),
    Number(localStorage['Zero Star Games'])
]
  updateStatsModal(gameArr);
}

function updateStatsModal(Arr){
  const bars = document.querySelectorAll('.bar')
  const gamesplayed = Number(localStorage['Games Played'])
  bars.forEach((bar, index) => {
    if (!isNaN(Arr[index])){
      bar.style.width = `${(Arr[index]/gamesplayed) * 100}%`
      bar.innerHTML = `${Math.floor((Arr[index]/gamesplayed) * 100)}%`
    }
  })
  

}

function submitAnswer(answer) {

  storeData(answer, passCount)

  if(answer === "correct") {
    document.getElementById("correctAnswerPopup").style.display = "block";
  }

  else if (answer === "incorrect") {
    document.getElementById("incorrectAnswerPopup").style.display = "block";
  }

  const newRoundButtons = document.getElementsByClassName("new-round");
  for (let i = 0; i < newRoundButtons.length; i++) {
    newRoundButtons[i].addEventListener('click', loadNewRound)
  }
  //reset passCount and NoMoreAudio window
  passCount = 0
  document.getElementById('noAudio').classList.toggle('hide');
  const flagsElements = document.getElementsByClassName("flag");
  for (let i = 0; i < flagsElements.length; i++) {
    flagsElements[i].removeEventListener('click', checkAnswer);
  }

}

function checkAnswer() {
  if (this.classList.contains("correct")) {
    submitAnswer("correct")
  } else {
    submitAnswer("incorrect") 
  }
}

//    ****    || HELPER FUNCTIONS ||    ****

function generateRandomCountry() {
  return curatedCountries[Math.floor(Math.random() * curatedCountries.length)]
}

function capitaliseCountryName(country) {
  const arr = country.split(" ");


  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  
  return arr.join(" ");
}

const btns = document.querySelectorAll('.btn');
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let elementId = e.target.name;
    //check if the user clicked on the icon element, if so then target name attribute of the 
    //corresponding btn instead.
    if (e.target.name === undefined){ elementId = e.target.parentElement.name}
    //  display/hide modal window
    const modal = document.getElementById(elementId);
    modal.classList.toggle('hidden');
  })  
})