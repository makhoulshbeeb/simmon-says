const audio1 = new Audio(encodeURI("Assets/C Single Note.mp3"));
const audio2 = new Audio(encodeURI("Assets/Db Single Note.mp3"));
const audio3 = new Audio(encodeURI("Assets/D Single Note.mp3"));
const audio4 = new Audio(encodeURI("Assets/Eb Single Note.mp3"));
const audio5 = new Audio(encodeURI("Assets/E Single Note.mp3"));
const audio6 = new Audio(encodeURI("Assets/F Single Note.mp3"));
const audio7 = new Audio(encodeURI("Assets/Gb Single Note.mp3"));
const audio8 = new Audio(encodeURI("Assets/G Single Note.mp3"));
const audio9 = new Audio(encodeURI("Assets/Ab Single Note.mp3"));

var sounds = [audio1
    , audio2
    , audio3
    , audio4
    , audio5
    , audio6
    , audio7
    , audio8
    , audio9];
var buttons = document.querySelectorAll("button");
buttons.forEach(el => el.addEventListener('click', event => {
    index = [].indexOf.call(buttons, el);
    sounds[index].play();
}));