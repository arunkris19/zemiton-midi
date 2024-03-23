import Utils from "./utils.js";

class Scale {
  static noteMap = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  static getScaleByCount(note, count) {
    let start = Scale.noteMap.indexOf(note);
    let octave = 4;
    return count
      .map((c) => parseInt(c))
      .map((c, i) => {
        const n = Scale.noteMap[(start + c - 1) % Scale.noteMap.length];
        start = start + c;
        if (n[0] === "C" && i > 0 && octave < 5) octave++;
        return n + octave;
      });
  }

  static Random(note){
    const r = Utils.RandomInt(7);
    switch(r){
        case 0: return Scale.Ionian(note);
        case 1: return Scale.Dorian(note);
        case 2: return Scale.Phrygian(note);
        case 3: return Scale.Lydian(note);
        case 4: return Scale.Mixolydian(note);
        case 5: return Scale.Aeolian(note);
        case 6: return Scale.Locrian(note);
        default: return Scale.Minor(note);
    }
  }

  static Major(note) {
    return [Scale.Ionian(note)[0], note+' Major'];
  }

  static Minor(note) {
    return [Scale.Aeolian(note)[0], note+' Minor'];
  }
  static Ionian(note) {
    return [Scale.getScaleByCount(note, "1221222".split("")), note+' Ionian'];
  }
  static Dorian(note) {
    return [Scale.getScaleByCount(note, "1212221".split("")), note+' Dorian'];
  }
  static Phrygian(note) {
    return [Scale.getScaleByCount(note, "1122212".split("")), note+' Phrygian'];
  }
  static Lydian(note) {
    return [Scale.getScaleByCount(note, "1222122".split("")), note+' Lydian'];
  }
  static Mixolydian(note) {
    return [Scale.getScaleByCount(note, "1221221".split("")), note+' Mixolydian'];
  }
  static Aeolian(note) {
    return [Scale.getScaleByCount(note, "1212212".split("")), note+' Aeolian'];
  }
  static Locrian(note) {
    return [Scale.getScaleByCount(note, "1122122".split("")), note+' Locrian'];
  }

  static DownOctave(note) {
    return note
      .split("")
      .map((n) => (Number.isNaN(Number(n)) ? n : Number(n) - 1))
      .join("");
  }

  static UpOctave(note) {
    return note
      .split("")
      .map((n) => (Number.isNaN(Number(n)) ? n : Number(n) - 1))
      .join("");
  }

  static ChordOf(scale, position) {
    const bassScale = scale.map((n) => {
      const octave = Number(n[n.length - 1]);
      return n.replace(octave, octave - 1);
    });
    const chord = [
      bassScale[position],
      bassScale[(position + 2) % bassScale.length],
      bassScale[(position + 4) % bassScale.length]
    ];

    return chord;
  }
}

export default Scale;
