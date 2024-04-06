import Utils from "./utils.js";

class London {
  static GenerateRandomWord(type) {
    // Array of adjectives
    const adjectives = [
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
    const nouns = [
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
    return (type ?? Utils.RandomInt(2)) === 0
      ? adjectives[Utils.RandomInt(adjectives.length)]
      : nouns[Utils.RandomInt(nouns.length)];
  }

  static RandomSongName() {
    return [0, 1]
      .map((t) => London.GenerateRandomWord(t))
      .map((n) => n[0].toUpperCase() + n.substring(1))
      .join(" ");
  }

  static RandomLyrics() {
    const randomize = (f,i) => i === Utils.RandomInt(3) ? f.split('').reverse().join('') : f;
    // parts
    const verse = new Array(3).fill(null).map(() => London.GenerateRandomWord());
    const verse2 = verse.map(randomize);
    const chorus = new Array(3).fill(null).map(() => London.GenerateRandomWord());
    const chorus2 = chorus.map(randomize);
    const fall = new Array(3).fill(null).map(() => London.GenerateRandomWord());
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
      fall,
      pause
    ].flat(1);
  }
}

export default London;
