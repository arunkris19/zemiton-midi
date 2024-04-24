import ZemitonMidi from "./zemiton/zemiton.js";
import Scale from "./zemiton/scale.js";
import Utils from "./zemiton/utils.js";
import Tempo from "./zemiton/tempo.js";
import London from "./zemiton/london.js";
import Geany from "./zemiton/geany.js";
import Lorem from "./zemiton/lorem.js";


export default {
    MidiComposer: ZemitonMidi,
    Scale,
    Utils,
    Tempo,
    Method: {
        London,
        Geany,
        Lorem
    }
}