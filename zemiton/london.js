import Utils from "./utils.js";

class London {
  static GenerateRandomWord(type) {
    // Array of adjectives
    const adjectives = [
      "whispering",
      "melancholic",
      "ethereal",
      "radiant",
      "enchanted",
      "serene",
      "vivid",
      "mystical",
      "serendipitous",
      "luminous",
      "bittersweet",
      "tranquil",
      "captivating",
      "blissful",
      "echoing",
      "magical",
      "glimmering",
      "enigmatic",
      "soothing",
      "euphoric",
      "surreal",
      "majestic",
      "celestial",
      "harmonious",
      "nostalgic",
      "enchanted",
      "whimsical",
      "jubilant",
      "reflective",
      "aurora",
      "gentle",
      "spectacular",
      "infinite",
      "resplendent",
      "radiant",
      "graceful",
      "timeless",
      "illustrious",
      "charming",
      "tranquil",
      "inspirational",
      "melodic",
      "captivating",
      "mysterious",
      "serenading",
      "breathtaking",
      "epic",
      "elegant",
      "whispering",
    ];

    // Array of nouns
    const nouns = [
      "dream",
      "wanderer",
      "horizon",
      "firefly",
      "stardust",
      "echo",
      "moonlight",
      "oasis",
      "cascade",
      "phoenix",
      "whisper",
      "ember",
      "twilight",
      "harmony",
      "serenade",
      "crescendo",
      "cascade",
      "lullaby",
      "spectacle",
      "aurora",
      "solitude",
      "symphony",
      "tranquility",
      "enchantment",
      "meadow",
      "cathedral",
      "journey",
      "sanctuary",
      "eclipse",
      "elysium",
      "horizon",
      "mirage",
      "sorcery",
      "miracle",
      "rainbow",
      "garden",
      "paradise",
      "labyrinth",
      "cascade",
      "zephyr",
      "shadows",
      "fountain",
      "echoes",
      "sapphire",
      "whispers",
      "harbor",
      "mist",
      "whirlwind",
    ];
    return (type ?? Utils.RandomInt(2)) === 0
      ? adjectives[Utils.RandomInt(adjectives.length)]
      : nouns[Utils.RandomInt(nouns.length)];
  }

  static RandomSongName() {
    return [0, 1]
      .map(() => London.GenerateRandomWord())
      .map((n) => n[0].toUpperCase() + n.substring(1))
      .join(" ");
  }

  static RandomLyrics() {
    const lyrics = [];
    let length = 0;
    do {
      const word = London.GenerateRandomWord();
      lyrics.push(word);
      length += word.length;
    } while (length < 200);

    return lyrics;
  }
}

export default London;
