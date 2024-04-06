import Utils from "./utils.js";

class Geany {
  static GenerateRandomWord(length=Utils.RandomInt(10,3)) {
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
    return [Utils.RandomInt(8, 4), Utils.RandomInt(9, 4)]
      .map((l) => Geany.GenerateRandomWord(l))
      .map((n) => n[0].toUpperCase() + n.substring(1))
      .join(" ");
  }

  static RandomLyrics() {
    const randomize = (f,i) => i === Utils.RandomInt(3) ? f.split('').reverse().join('') : f;
    // parts
    const verse = new Array(3).fill(null).map(() => Geany.GenerateRandomWord());
    const verse2 = verse.map(randomize);
    const chorus = new Array(3).fill(null).map(() => Geany.GenerateRandomWord());
    const chorus2 = chorus.map(randomize);
    const fall = new Array(3).fill(null).map(() => Geany.GenerateRandomWord());
    const fall2 = fall.map(randomize);
    const pause = ['|'];
    
    // song
    return [
      verse,
      pause,
      verse2,
      pause,
      verse,
      pause,
      chorus,
      chorus2,
      chorus,
      pause,
      fall,
      pause,
      fall2,
      pause,
      fall
    ].flat(1);
  }
}

export default Geany;
