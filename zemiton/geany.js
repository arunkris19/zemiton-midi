import London from "./london.js";
import Lorem from "./lorem.js";
import Utils from "./utils.js";

class Geany {
  static GenerateRandomWord(length=Utils.RandomInt(9,4)) {
    const vowels = "aeiou";
    const consonants = "bcdfghjklmnpqrstvwxyz";
    let word = "";

    // Generate random word of specified length
    for (let i = 0; i < length; i++) {
      if (i % 2 === 0) {
        // If even index, add a consonant
        word += consonants.charAt(
          Math.floor(Math.random() * consonants.length)
        );
      } else {
        // If odd index, add a vowel
        word += vowels.charAt(Math.floor(Math.random() * vowels.length));
      }
    }

    return word;
  }

  static RandomSongName() {
    return London.RandomSongName();
  }

  static RandomLyrics() {
    // parts
    const pause = [Utils.PAUSE];
    const [alpha, beta, gamma, delta, sign] = [
      Geany.GenerateRandomWord(),
      Geany.GenerateRandomWord(),
      Geany.GenerateRandomWord(),
      Geany.GenerateRandomWord(),
      Geany.GenerateRandomWord(3),
    ];

    const rise = [alpha, alpha];
    const verse = [beta, beta];
    const verse2 = Utils.randomize(verse);
    const preChorus = [gamma, alpha];
    const chorus = [delta, gamma];
    const fall = [alpha, beta, gamma];
    const fall2 = Utils.randomize(fall);

    // song
    return [
      rise,
      verse,
      sign,
      preChorus,
      preChorus,
      sign,
      fall,
      fall,
      sign,
      fall2,
      verse2,
      sign,
      chorus,
      chorus,
      chorus,
      chorus,
      sign,
      verse,
      verse2,
      sign,
      pause,
      pause,
      pause
    ].flat(1);
  }
}

export default Geany;
