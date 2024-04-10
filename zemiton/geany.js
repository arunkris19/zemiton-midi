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
        word += consonants.charAt(Utils.RandomInt(consonants.length));
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
      Geany.GenerateRandomWord(5),
      Geany.GenerateRandomWord(6),
      Geany.GenerateRandomWord(7),
      Geany.GenerateRandomWord(13),
      Geany.GenerateRandomWord(Utils.RandomInt(4,2)),
    ];

    // song
    return [
      pause,
      alpha,
      alpha,
      alpha,
      sign,
      beta,
      beta,
      beta,
      sign,
      gamma,
      gamma,
      gamma,
      sign,
      delta,
      delta,
      delta,
      sign,
      beta,
      beta,
      beta,
      pause,
      alpha,
      alpha,
      alpha,
      sign,
      beta,
      beta,
      beta,
      sign,
      gamma,
      gamma,
      gamma,
      sign,
      delta,
      delta,
      delta,
      sign,
      beta,
      beta,
      beta,
      sign,
      pause,
      pause,
      pause,
    ].flat(1);
  }
}

export default Geany;
