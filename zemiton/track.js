import MidiWriter from 'midi-writer-js';
import Utils from "./utils.js";

class Track {
  static CreateTrack(name, tempo = 120, signature = [4, 4], instrument = 1) {
    const track = new MidiWriter.Track();
    track.setTimeSignature(...signature);
    track.setTempo(tempo);
    track.setPitchBend([-0.8, 0.8][Utils.RandomInt(2)]);
    track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument }));
    track.addCopyright('Zemiton Music');
    track.addTrackName(name);

    track.signature = signature;
    track.tempo = tempo;
    track.instrument = instrument;

    return track;
  }

  static GetNoteEvent(note, velocity = 60) {
    return new MidiWriter.NoteEvent({
      ...note,
      velocity,
    });
  }

  static WriteTracks(tracks) {
    return new MidiWriter.Writer(tracks);
  }

  static RenderToTrack(track, motif, velocity=80){
    motif.forEach(event => {
        track.addEvent(Track.GetNoteEvent(event, event.velocity ?? Utils.RandomInt(velocity + 5, velocity - 5)));
    });
  }
  
  static DurationCount(duration){
    switch(duration){
      case 'd2': return 3;
      case 1: return 4;
      default: return 4 / duration;
    }
  }

};

export default Track;