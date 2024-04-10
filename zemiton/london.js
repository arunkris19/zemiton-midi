import Geany from "./geany.js";
import Utils from "./utils.js";

class London {
  // Array of adjectives
  static adjectives = [
    "whispering",
    "sunny",
    "electric",
    "mystic",
    "gentle",
    "radiant",
    "golden",
    "enchanted",
    "soothing",
    "ethereal",
    "dreamy",
    "blissful",
    "magical",
    "spirited",
    "luminous",
    "tranquil",
    "vivid",
    "serene",
    "melodic",
    "harmonic",
    "cosmic",
    "celestial",
    "heavenly",
    "infinite",
    "enigmatic",
    "sublime",
    "divine",
    "spectral",
    "echoing",
    "mesmerizing",
    "captivating",
    "effervescent",
    "peaceful",
    "velvety",
    "glimmering",
    "flickering",
    "calm",
    "breathtaking",
    "surreal",
    "epic",
    "enthralling",
    "enlightened",
    "empowered",
    "whimsical",
    "harmonious",
    "majestic",
    "lush",
    "fragrant",
    "transcendent",
    "sparkling",
    "euphoric",
    "spiritual",
    "enlivened",
    "blessed",
    "radiating",
    "resonant",
    "rhythmic",
    "dazzling",
    "vibrant",
    "lyrical",
    "zen",
    "aurora",
    "gossamer",
    "ineffable",
    "nebulous",
    "opulent",
    "quixotic",
    "sangria",
    "umbra",
    "vernal",
    "zephyr",
    "ambrosial",
    "cerulean",
    "diaphanous",
    "halcyon",
    "incandescent",
    "iridescent",
    "labyrinthine",
    "luminescent",
    "mellifluous",
    "nascent",
    "oceanic",
    "pristine",
    "sapphire",
    "solstice",
    "symphonic",
    "translucent",
    "verdant",
    "voluptuous",
    "whispery",
    "xanadu",
    "zodiacal",
    "amber",
    "aureate",
    "candied",
    "coruscating",
    "ephemeral",
    "ethereal",
    "halcyon",
    "incarnadine",
    "liminal",
    "omnipotent",
    "quiescent",
    "resplendent",
    "scintillating",
    "vestigial",
    "vivacious",
  ];
  //Array of nouns
  static nouns = [
    "harmony",
    "sunrise",
    "moonlight",
    "starlight",
    "rainbow",
    "ocean",
    "river",
    "meadow",
    "forest",
    "desert",
    "mountain",
    "valley",
    "horizon",
    "sunset",
    "dawn",
    "twilight",
    "dream",
    "journey",
    "adventure",
    "fantasy",
    "whisper",
    "echo",
    "serenade",
    "melody",
    "symphony",
    "ballad",
    "chorus",
    "verse",
    "rhapsody",
    "sonnet",
    "ode",
    "lullaby",
    "aura",
    "vortex",
    "cascade",
    "ripple",
    "breeze",
    "gale",
    "storm",
    "tempest",
    "wave",
    "aurora",
    "zephyr",
    "lagoon",
    "glade",
    "enchantment",
    "spell",
    "charm",
    "secret",
    "legend",
    "myth",
    "tale",
    "story",
    "fable",
    "whisper",
    "mystique",
    "spellbound",
    "firefly",
    "tide",
    "flame",
    "embers",
    "voyage",
    "quest",
    "odyssey",
    "genesis",
    "eclipse",
    "nebula",
    "galaxy",
    "stardust",
    "cosmos",
    "infinity",
    "eternity",
    "destiny",
    "synchronicity",
    "wanderlust",
    "utopia",
    "paradise",
    "eden",
    "saffron",
    "arcadia",
    "elysium",
    "zenith",
    "apex",
    "pinnacle",
    "summit",
    "zen",
    "nirvana",
    "oasis",
    "sanctuary",
    "haven",
    "shelter",
    "refuge",
    "happiness",
    "joy",
    "bliss",
    "ecstasy",
  ];
  static GenerateRandomWord(type) {
    return (type ?? Utils.RandomInt(2)) === 0
      ? London.adjectives[Utils.RandomInt(London.adjectives.length)]
      : London.nouns[Utils.RandomInt(London.nouns.length)];
  }

  static RandomSongName() {
    return [0, 1]
      .map((t) => London.GenerateRandomWord(t))
      .map((n) => n[0].toUpperCase() + n.substring(1))
      .join(" ");
  }

  static GenerateRandomWordOfLength(length = 10) {
    return [...London.adjectives, London.nouns]
      .sort(Utils.RandomSort)
      .find((w) => w.length === length) ?? Geany.GenerateRandomWord(length);
  }

  static RandomLyrics() {
    // parts
    const pause = [Utils.PAUSE];
    const [alpha, beta, gamma, delta, sign] = [
      London.GenerateRandomWordOfLength(5),
      London.GenerateRandomWordOfLength(7),
      London.GenerateRandomWordOfLength(6),
      London.GenerateRandomWordOfLength(11),
      London.GenerateRandomWordOfLength(Utils.RandomInt(4, 2)),
    ];

    const [alphaR, betaR, gammaR] = [
      Geany.GenerateRandomWord(5),
      Geany.GenerateRandomWord(7),
      Geany.GenerateRandomWord(6)
    ];

    // song
    return [
      pause,
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
      pause,
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
    ].flat(1);
  }
}

export default London;
