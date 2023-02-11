let countryOne = ""
let countryTwo = ""

async function getCountrySounds(countryOne) {
    try {
      const response = await fetch(`https://example.com/sounds?tag=${countryOne}`);
      const sounds = await response.json();
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      const soundResponse = await fetch(randomSound.url);
      const soundData = await soundResponse.json();
      const soundPreviewUrl = soundData.preview_url;
      return soundPreviewUrl;
    } catch (error) {
      console.error(error);
    }
  }