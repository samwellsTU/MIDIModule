//Import Modules
import MIDIengine from "./midi.js";

//Function Definitions
const mtof = function (midiNum) {
  return 440 * 2 ** ((midiNum - 69) / 12);
};

//Create Web Audio Graph
const myAudContext = new AudioContext();

const fader = new GainNode(myAudContext);
fader.gain.value = 0.25;
fader.connect(myAudContext.destination);

//make a storage array for notes

//array with 16 elements 1 for each channel
const myMidiNotes = new Array(16);

for (let i = 0; i < myMidiNotes.length; i++) {
  //each element (ch) has an array of
  myMidiNotes[i] = new Array(128);
  // console.log(i);
}
//myMidiNotes[channel][pitch]
myMidiNotes[4][60];

// console.log(myMidiNotes[4][60]);

//initialize our MIDI engine

const myMIDIstuff = new MIDIengine();

myMIDIstuff.onNoteOn = (pitch, velocity, ch) => {
  myMidiNotes[ch][pitch] = new OscillatorNode(myAudContext);
  myMidiNotes[ch][pitch].frequency.value = mtof(pitch);
  myMidiNotes[ch][pitch].connect(fader);
  myMidiNotes[ch][pitch].start();
  console.log("Note On:", pitch, velocity, ch);
};
