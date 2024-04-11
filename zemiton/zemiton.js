import { log } from "console";
import fs from "fs";
import Scale from "./scale.js";
import Utils from "./utils.js";
import Track from "./track.js";
import London from "./london.js";
import Geany from "./geany.js";
import Lorem from "./lorem.js";

class ZemitonMidi {
  writer = null;
  songName = null;
  scaleName = null;
  durations = {};
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
    if (!this.durations[size]) {
      switch (size) {
        case 1:
          return [1];
        case 2:
          return [4, "d2"];
        case 3:
          return [8, 8, "d2"];
        case 4:
          this.durations[size] = [
            [4, 8, 8, 2],
            [4, 4, 8, "d4"],
            [8, 8,4,4,8,8],
            ["d4", "d4", 8, 8],
          ][Utils.RandomInt(4)].sort(Utils.RandomSort);
          break;
        case 5:
          this.durations[size] = [4, 8, 4, 8, 4].sort(Utils.RandomSort);
          break;
        case 6:
          this.durations[size] = [4, 8, 8, 4, 8, 8].sort(Utils.RandomSort);
          break;
        case 7:
          this.durations[size] = [8, 8, 4, 8, 8, 8, 8].sort(Utils.RandomSort);
          break;
        default:
          this.durations[size] = this.LargeDurations(size).sort(
            Utils.RandomSort
          );
          break;
      }
    }

    return this.durations[size];
  }

  CreateMotif(seed, scale) {
    const durations = this.DurationsBySize(seed.length);
    const motif = durations.map((duration, i) => {
      const c = seed[i % seed.length];
      if (c === Utils.PAUSE) {
        return c;
      }
      return {
        duration,
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
        velocity: 60,
        pitch: scale[Utils.RandomInt(scale.length)],
      });
    }

    /** return final motif */
    return motif.filter((m) => m.duration);
  }

  Compose(
    Method = [London, Geany, Lorem][Utils.RandomInt(3)],
    tempo = Utils.RandomInt(110, 80),
    inputScale = null,
    inputSongName = null
  ) {
    /**
     * Midi configuration
     * scale, signature, tempo, etc.
     */
    const scaleNote = Scale.noteMap[Utils.RandomInt(Scale.noteMap.length, 5)];
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
    const leadScale = scale;
    /**
     * Preparing lead motifs
     */
    const leadNotes = lyrics.map((phrase) => {
      const motif = this.CreateMotif(phrase, leadScale);
      return motif;
    });

    leadNotes.forEach((motif) => {
      Track.RenderToTrack(track, motif, 60);
    });

    /**
     * Preparing bass motif
     */
    const bass = Track.CreateTrack("Bass", tempo);
    const totalEvents = leadNotes.reduce(
      (a, b) =>
        a +
        b.reduce((p, q) => {
          return p + Track.DurationCount(q.duration);
        }, 0),
      0
    );

    const bassScale = scale.map((note) => Scale.DownOctave(note));
    const bassWord = Geany.GenerateRandomWord(4);
    const bassMotif = this.CreateMotif(bassWord, bassScale);

    const bassEvents = bassMotif.reduce(
      (a, b) => a + Track.DurationCount(b.duration),
      0
    );

    /**
     * Render Bass track with bass chords
     */
    const bassNotes = new Array(Math.ceil(totalEvents / bassEvents))
      .fill(bassMotif)
      .map((b, i) =>
        leadNotes[i]?.[0]?.duration === 1
          ? {
              pitch: Scale.ChordOf(bassScale, Utils.RandomInt(5)),
              duration: 1,
            }
          : b
      );
    bassNotes.push([
      {
        pitch: Scale.ChordOf(bassScale, 0),
        duration: 1,
      },
    ]);
    bassNotes.forEach((motif) => {
      motif[0].pitch = Scale.ChordOf(bassScale, Utils.RandomInt(5));
      motif[0].velocity = 60 * 0.8;
      Track.RenderToTrack(bass, motif, 60 * 0.8);
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
