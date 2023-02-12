import { key } from "./secret.js";
import { curatedCountries } from "./curatedCountries.js";

function generateRandomCountry() {
  return curatedCountries[Math.floor(Math.random() * curatedCountries.length)]
}

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

async function loadAudio(countryOne) {
  const soundObject = await getCountrySounds(countryOne);
  const parentElement = document.getElementById("figureAudio");
  for (let i = 0; i < 5; i++){
    const soundUrl = soundObject[`preview${i}`];
    const audioPlayer = document.createElement("AUDIO");
    audioPlayer.id = `audioplayer${i}`
    audioPlayer.src = soundUrl;
    audioPlayer.setAttribute("controls", "true");
    parentElement.appendChild(audioPlayer);
  }
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
    flagsArr[flagOnePos].classList.add("correct");
    flagsArr[flagOnePos].parentElement.nextElementSibling.innerHTML = capitaliseCountryName(countryOne);

    //remove from array
    flagsArr.splice(flagOnePos, 1);
    //set flag two to remaining pos
    flagsArr[0].src = flagObj.flagTwo;
    flagsArr[0].classList.add("incorrect");
    flagsArr[0].parentElement.nextElementSibling.innerHTML = capitaliseCountryName(countryTwo);
  } catch (error) {
    console.error(error);
  }
}

function capitaliseCountryName(country) {
  const arr = country.split(" ");


  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  
  return arr.join(" ");
}

function displayNewCountryNames(countryOne, countryTwo) {
  //document.getElementById("countryNameOne").innerHTML = capitaliseCountryName(countryOne)
  //document.getElementById("countryNameTwo").innerHTML = capitaliseCountryName(countryTwo)
}

function loadNewRound() {
  let countryOne = generateRandomCountry();
  let countryTwo = generateRandomCountry();

  while(countryTwo === countryOne) {
    countryTwo = generateRandomCountry()
  }


  loadAudio(countryOne);
  displayFlags(countryOne, countryTwo);
  displayNewCountryNames(countryOne, countryTwo);
}

loadNewRound()