import MidiWriter from "midi-writer-js";
import Utils from "./utils.js";

class Track {
  static DurationMap = [2, 4, 8];

  static GetDurationFill = (gap) => {
    switch (gap) {
      case 0.5:
        return [8];
      case 1:
        return [8, 8];
      case 1.5:
        return [4, 8];
      case 2:
        return [4, 8, 8];
      case 2.5:
        return [4, 4, 8];
      case 3:
        return [4, 2];
      case 3.5:
        return [4, 2, 8];
      default:
        return [];
    }
  };

  /**
   *
   * @param {*} name
   * @param {*} tempo
   * @param {*} signature
   * @param {*} instrument
   * @returns
   */
  static CreateTrack(name, tempo = 120, signature = [4, 4], instrument = 1) {
    const track = new MidiWriter.Track();
    track.setTimeSignature(...signature);
    track.setTempo(tempo);
    track.setPitchBend([-0.8, 0.8][Utils.RandomInt(2)]);
    track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument }));
    track.addCopyright("Zemiton Music");
    track.addTrackName(name);

    track.signature = signature;
    track.tempo = tempo;
    track.instrument = instrument;

    return track;
  }

  /**
   *
   * @param {*} note
   * @param {*} velocity
   * @returns
   */
  static GetNoteEvent(note, velocity = 60) {
    return new MidiWriter.NoteEvent({
      ...note,
      velocity,
    });
  }

  static WriteTracks(tracks) {
    return new MidiWriter.Writer(tracks);
  }

  static RenderToTrack(track, motif, velocity = 80) {
    motif.forEach((event) => {
      track.addEvent(
        Track.GetNoteEvent(
          event,
          event.velocity ?? Utils.RandomInt(velocity + 5, velocity - 5)
        )
      );
    });
  }

  static DurationCount(duration) {
    if (!duration) return 0;
    if (Array.isArray(duration)) {
      return duration.reduce((a, d) => a + Track.DurationCount(d), 0);
    }
    switch (duration) {
      case "8t":
        return 1 / 3;
      case "d2":
        return 3;
      case "d4":
        return 1.5;
      case 1:
        return 4;
      default:
        return 4 / duration;
    }
  }
}

export default Track;
