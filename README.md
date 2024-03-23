♪ ♫ ♩ ♬

# zemiton-midi

A node.js library to generate random music in midi format.

## Installation

Installation command.

From npm:
```bash
$ npm install zemiton-midi
```

From source:
```bash
$ git clone https://github.com/arunkris19/zemiton-midi.git
$ cd zemiton-midi/
$ npm install
```

## Usage


### Input

```js

import { cwd } from "process";
import ZemitonMidi from "zemiton-midi";

const fileFolder = cwd() + "/midi/";
/*
Supports 3 methods 
 - ZemitonMidi.Method.London
 - ZemitonMidi.Method.Lorem
 - ZemitonMidi.Method.Geany
*/
const Zc = new ZemitonMidi.MidiComposer().Compose(
  ZemitonMidi.Method.London,
  110,
  ZemitonMidi.Scale.Minor("F"),
  "Zemiton Sonata"
);

Zc.WriteFile(fileFolder); //Filename will be auto generated

```
## References

  * https://www.npmjs.com/package/midi-writer-js
  * https://en.wikipedia.org/wiki/MIDI

## Maintainers

  * Arun Krishnan - [@arunkris19](https://github.com/arunkris19)

## Contributors

  * Arun Krishnan - [@arunkris19](https://github.com/arunkris19)

## License

MIT License

Copyright (c) 2024 devsixme

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
