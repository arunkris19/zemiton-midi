import Utils from "./utils.js";

class Geany {
  static GenerateRandomWord(length) {
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

  static RandomLyrics(){
    const lyrics = [];
    let length = 0;
    do{
        const word = Geany.GenerateRandomWord(Utils.RandomInt(10, 2));
        lyrics.push(word);
        length += word.length;
    } while(length < 200);

    return lyrics;
  }
}

export default Geany;
