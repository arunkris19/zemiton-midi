import Lorem from "./lorem.js";
import Utils from "./utils.js";

class Geany {
  static GenerateRandomWord(length=Utils.RandomInt(15,3)) {
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
    return Lorem.RandomSongName();
  }

  static RandomLyrics() {
    // parts
    const pause = [Utils.PAUSE];
    const [alpha, beta, gamma, delta, sign] = [
      Geany.GenerateRandomWord(),
      Geany.GenerateRandomWord(),
      Geany.GenerateRandomWord(),
      Geany.GenerateRandomWord(),
      Geany.GenerateRandomWord().substring(0,3),
    ];
    const rise = [alpha, sign];
    const verse = [delta, gamma];
    const verse2 = Utils.randomize(verse);
    const preChorus = [sign, gamma];
    const chorus = [alpha, sign];
    const fall = [alpha, beta, sign];
    const fall2 = Utils.randomize(fall);

    // song
    return [
      preChorus,
      verse,
      rise,
      fall,
      pause,
      preChorus,
      pause,
      preChorus,
      pause,
      fall,
      pause,
      fall,
      fall2,
      verse2,
      pause,
      chorus,
      chorus,
      chorus,
      chorus,
      pause,
      verse,
      verse2,
      pause,
      pause,
      pause,
      pause
    ].flat(1);
  }
}

export default Geany;
