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

  LargeDurations(size) {
    const part = Math.floor(size / 2);
    const parts = [part, size - part];

    return parts
      .map((p) => {
        return this.DurationsBySize(p);
      })
      .flat(1);
  }

  DurationsBySize(size) {
    switch (size) {
      case 1:
        return [8];
      case 2:
        return [4, "d2"];
      case 3:
        return [8, 8, "d2"];
      case 4:
        return [
          [4, 8, 8, 2],
          [4, 4, 8, "d4"],
        ][Utils.RandomInt(2)];
      case 5:
        return [4, 8, 4, 8, 4];
      case 6:
        return [4, 8, 8, 4, 8, 8];
      case 7:
        return [8, 8, 4, 8, 8, 8, 8];
      default:
        return this.LargeDurations(size);
    }
  }

  CreateMotif(seed, scale) {
    const durations = this.DurationsBySize(seed.length);
    const motif = seed.split("").map((c, i) => {
      if (c === Utils.PAUSE) {
        return c;
      }
      return {
        duration: durations[i],
        pitch: "aeiou".includes(c)
          ? scale[0]
          : scale[c.charCodeAt(0) % scale.length],
      };
    });

    /** normalize bars */
    const durationSum = motif.reduce(
      (a, b) => a + Track.DurationCount(b.duration),
      0
    );

    const durationGap = 4 - (durationSum % 4);

    Track.GetDurationFill(durationGap)
      .sort(Utils.RandomSort)
      .forEach((duration) => {
        motif.push({
          duration,
          pitch: scale[Utils.RandomInt(scale.length)],
        });
      });

    if (motif.includes(Utils.PAUSE)) {
      motif.push({
        duration: [1],
        pitch: scale[Utils.RandomInt(scale.length)],
      });
    }

    /** return final motif */
    return motif.filter((m) => m.duration);
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
    const bassWord = lyrics
      .find((l) => l.length >= 4)
      .split("")
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
