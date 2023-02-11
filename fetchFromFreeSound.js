let countryOne = ""
let countryTwo = ""

async function getCountrySounds(countryOne) {
    try {
      const response = await fetch(`https://freesound.org/apiv2/search/text/?query=${countryOne}&token=${key}`);
      const sounds = await response.json();
      const randomSound = sounds.results[Math.floor(Math.random() * sounds.count)];
      const soundId = randomSound.id;
      const soundResponse = await fetch(`https://freesound.org/apiv2/sounds/${soundId}?token=${key}`);
      const soundData = await soundResponse.json();
      const soundPreviewUrl = soundData.previews['preview-hq-mp3'];
      return soundPreviewUrl;
    } catch (error) {
      console.error(error);
    }
  }