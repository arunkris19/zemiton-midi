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
            ["d4", "d4", 8, 8],
          ][Utils.RandomInt(3)];
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

  PositionsBySize(phrase) {
    return phrase.split("").map((c, i) => {
      if (i === 0) return c.charCodeAt(0) % 5;
      return i + (c.charCodeAt(0) % 2);
    });
  }

  CreateMotif(phrase, scale) {
    const durations = this.DurationsBySize(phrase.length);
    const positions = this.PositionsBySize(phrase);
    const motif = durations.map((duration, i) => {
      const c = phrase[i % phrase.length];
      if (c === Utils.PAUSE) {
        return c;
      }
      return {
        duration,
        pitch: scale[positions[i] % scale.length],
      };
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
    const scaleNote = Scale.noteMap[Utils.RandomInt(Scale.noteMap.length, 3)];
    const [scale, scaleName, scaleType] = inputScale ?? Scale.Random(scaleNote);
    const lyrics = Method.RandomLyrics();
    const leadVolume = 60;

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
    const leadScale = scaleType === Scale.UPPER ? Scale.setOctave(scale, 4) : scale;
    /**
     * Preparing lead motifs
     */
    const leadNotes = lyrics.map((phrase) => {
      const motif = this.CreateMotif(phrase, leadScale);
      return motif;
    });

    leadNotes.forEach((motif) => {
      Track.RenderToTrack(track, motif, leadVolume);
    });

    /**
     * Preparing bass motif
     */
    const bass = Track.CreateTrack("Bass", tempo);

    const bassScale = scale.map((note) => Scale.DownOctave(note));
    const bassWord = Geany.GenerateRandomWord(4);
    const bassMotif = this.CreateMotif(bassWord, bassScale);

    leadNotes.forEach((motif) => {
      if (motif.length === 2 || motif.length === 3) {
        Track.RenderToTrack(
          bass,
          [
            {
              pitch: Scale.UpOctave(bassScale[0]),
              duration: 1,
            },
          ],
          leadVolume * 0.8
        );
      } else {
        Track.RenderToTrack(bass, bassMotif, leadVolume * 0.8);
      }
    });
    //the end
    Track.RenderToTrack(
      bass,
      [
        {
          pitch: Scale.ChordOf(bassScale, 0),
          duration: 1,
        },
      ],
      leadVolume * 0.8
    );

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
