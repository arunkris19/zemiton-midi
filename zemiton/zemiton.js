import { log } from "console";
import fs from "fs";
import Scale from "./scale.js";
import Utils from "./utils.js";
import Track from "./track.js";
import London from "./london.js";

class ZemitonMidi {
  writer = null;
  songName = null;
  scaleName = null;
  log = [];

  DurationsBySize(size) {
    switch (size) {
      case 1:
        return [4];
      case 2:
        return [4, 8];
      case 3:
        return [8, 8, 8];
      case 4:
        return [4, 4, 4, 4];
      case 5:
        return [4, 8, 4, 8, 4];
      case 6:
        return [4, 8, 8, 4, 8, 8];
      case 7:
        return [8, 8, 4, 8, 8, 8, 8];
      case 8:
        return [4, 4, 8, 8, 2, 4, 4, 4];
      case 9:
        return [4, 8, 4, 8, 4, 4, 2, 8, 8];
      default:
        return new Array(size).fill([4, 8][Utils.RandomInt(2)]);
    }
  }

  CreateMotif(seed, scale) {
    const PAUSE = "|";
    const motif = seed.split("").map((c, i) => {
      if(c === PAUSE){
        return {
          duration: [1],
          pitch: scale[Utils.RandomInt(5)]
        }
      }
      return {
        duration: [2, 4, 8][c.charCodeAt(0) % 3],
        pitch: "aeiou".includes(c)
          ? scale[0]
          : scale[c.charCodeAt(0) % scale.length],
      };
    });
    
    let durationSum = motif.reduce((a,b) => a + Track.DurationCount(b.duration), 0);
    while(durationSum % 4 !== 0){
      motif.push({
        duration: 8,
        pitch: scale[Utils.RandomInt(scale.length)]
      });
      durationSum = motif.reduce((a,b) => a + Track.DurationCount(b.duration), 0);
    };

    return motif;
  }

  CreateBassMotif(seed, scale) {
    const durations = this.DurationsBySize(seed.length).sort(Utils.RandomSort);
    const motif = seed.split("").map((c, i) => {
      return {
        duration: durations[i],
        pitch: "aeiou".includes(c)
          ? scale[0]
          : scale[c.charCodeAt(0) % scale.length],
      };
    });

    return motif;
  }

  Compose(
    Method = London,
    tempo = Utils.RandomInt(140, 80),
    inputScale = null,
    inputSongName = null
  ) {
    /**
     * Midi configuration
     * scale, signature, tempo, etc.
     */
    const scaleNote = Scale.noteMap[Utils.RandomInt(Scale.noteMap.length)];
    const [scale, scaleName] = inputScale ?? Scale.Random(scaleNote);
    const lyrics = Method.RandomLyrics(); 

    this.scaleName = scaleName;
    this.songName = (
      (inputSongName ?? Method.RandomSongName()) +
      "_in_[" +
      this.scaleName +
      "]"
    ).replace(/\s/g, "_");

    this.log.push("");
    this.log.push("Song           : " + this.songName);
    this.log.push("Method         : " + Method.name);
    this.log.push("Scale          : " + scaleName);
    this.log.push("Tempo          : " + tempo);
    this.log.push("Timing         : 4/4");
    this.log.push("");

    const track = Track.CreateTrack("Lead", tempo);

    /**
     * Preparing lead motifs
     */
    const leadNotes = lyrics.map((phrase) => {
      const motif = this.CreateMotif(phrase, scale);
      return motif;
    });

    leadNotes.forEach((motif) => {
      Track.RenderToTrack(track, motif, 70);
    });

    /**
     * Preparing bass motif
     */
    const totalEvents = leadNotes.reduce(
      (a, b) =>
        a +
        b.reduce((p, q) => {
          return p + Track.DurationCount(q.duration);
        }, 0),
      0
    );

    const bass = Track.CreateTrack("Bass", tempo);
    const bassWord = "zemiton-midi"
      .split("")
      .slice(0, [4, 5, 6][Utils.RandomInt(3)])
      .sort(Utils.RandomSort)
      .join("");
    
    const bassMotif = this.CreateBassMotif(bassWord, scale).map((note) => {
      return {
        ...note,
        pitch: Scale.DownOctave(note.pitch),
      };
    });

    const bassEvents = bassMotif.reduce(
      (a, b) => a + Track.DurationCount(b.duration),
      0
    );

    /**
     * Render Bass track with bass chords
     */
    const bassNotes = new Array(Math.ceil(totalEvents / bassEvents)).fill(
      bassMotif
    );
    bassNotes.push([
      {
        pitch: Scale.ChordOf(scale, 4),
        duration: 1,
      },
    ]);
    bassNotes.forEach((motif) => {
      motif[0].pitch = Scale.ChordOf(scale, Utils.RandomInt(5));
      motif[0].velocity = 55;
      Track.RenderToTrack(bass, motif, 60);
    });

    this.writer = Track.WriteTracks([track, bass]);

    this.log.forEach((l) => log(l));

    return this;
  }

  WriteFile(dir) {
    fs.writeFileSync(dir + this.songName + ".info", this.log.join("\n"));
    fs.writeFileSync(dir + this.songName + ".mid", this.writer?.buildFile());
    return this;
  }
}

export default ZemitonMidi;
