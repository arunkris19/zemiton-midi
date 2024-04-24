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
        word += vowels.charAt(Utils.RandomInt(vowels.length));
      }
    }

    return word;
  }

  static RandomSongName() {
    return London.RandomSongName();
  }

  static RandomLyrics() {
    // parts
    const sign = () => Geany.GenerateRandomWord(10)[9];
    const [alpha, beta, gamma, delta] = [
      Geany.GenerateRandomWord(7),
      Geany.GenerateRandomWord(6),
      Geany.GenerateRandomWord(6),
      Geany.GenerateRandomWord(4)
    ].sort(Utils.RandomSort);

    const [alphaR, betaR, gammaR, deltaR] = [
      Utils.reverseString(alpha),
      Utils.reverseString(beta),
      Utils.reverseString(gamma),
      Utils.reverseString(delta),
    ];

    const bridge = Geany.GenerateRandomWord(12);
    const bridgeR = Utils.reverseString(bridge);

    // song
    return [
      sign(),
      sign(),
      sign(),
      sign(),
      //
      alpha,
      alpha,
      alpha,
      sign(),
      //
      alphaR,
      alphaR,
      alphaR,
      sign(),
      //
      beta,
      beta,
      beta,
      sign(),
      //
      betaR,
      betaR,
      beta,
      sign(),
      //
      betaR,
      betaR,
      beta,
      sign(),
      //
      gamma,
      gamma,
      gamma,
      gamma,
      gammaR,
      gammaR,
      gammaR,
      sign(),
      //
      delta,
      delta,
      delta,
      delta,
      deltaR,
      deltaR,
      deltaR,
      delta,
      //
      bridge,
      bridge,
      bridgeR,
      bridgeR,
      sign(),
      //
      alpha,
      alpha,
      alpha,
      sign(),
      //
      alphaR,
      alphaR,
      alphaR,
      sign(),
      //
      beta,
      beta,
      beta,
      sign(),
      //
      betaR,
      betaR,
      beta,
      sign(),
      //
      betaR,
      betaR,
      beta,
      sign(),
      //
      gamma,
      gamma,
      gamma,
      gamma,
      gammaR,
      gammaR,
      gammaR,
      sign(),
      //
      sign(),
      sign(),
      sign(),
      sign(),
    ].flat(2);
  }
}

export default Geany;
