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
      Geany.GenerateRandomWord(6),
      Geany.GenerateRandomWord(7),
      Geany.GenerateRandomWord(5),
      Utils.SplitStringIntoArray(Geany.GenerateRandomWord(14)),
      Geany.GenerateRandomWord(Utils.RandomInt(4,2)),
    ];

    const [alphaR, betaR, gammaR] = [
      Geany.GenerateRandomWord(6),
      Geany.GenerateRandomWord(7),
      Geany.GenerateRandomWord(5)
    ];

    // song
    return [
      pause,
      pause,
      pause,
      sign,
      alpha,
      alphaR,
      alpha,
      sign,
      beta,
      betaR,
      beta,
      sign,
      gamma,
      gammaR,
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
      alpha,
      alphaR,
      alpha,
      sign,
      beta,
      betaR,
      beta,
      sign,
      gamma,
      gammaR,
      gamma,
      sign,
      delta,
      delta,
      delta,
      sign,
      beta,
      betaR,
      beta,
      sign,
      pause,
      pause,
      pause,
    ].flat(2);
  }
}

export default Geany;
