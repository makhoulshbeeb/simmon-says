const audio1 = new Audio(encodeURI("Assets/C Single Note.mp3"));
const audio2 = new Audio(encodeURI("Assets/Db Single Note.mp3"));
const audio3 = new Audio(encodeURI("Assets/D Single Note.mp3"));
const audio4 = new Audio(encodeURI("Assets/Eb Single Note.mp3"));
const audio5 = new Audio(encodeURI("Assets/E Single Note.mp3"));
const audio6 = new Audio(encodeURI("Assets/F Single Note.mp3"));
const audio7 = new Audio(encodeURI("Assets/Gb Single Note.mp3"));
const audio8 = new Audio(encodeURI("Assets/G Single Note.mp3"));
const audio9 = new Audio(encodeURI("Assets/Ab Single Note.mp3"));
const loseAudio = new Audio(encodeURI("Assets/Villager Hit (Nr. 4 - Minecraft Sound) - Sound Effect for editing.mp3"))

lives = 3;
level = 1;
pattern = [];
simmon = [];
clickable = false;

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
    if (clickable) {
        pattern.push(index);
        console.log(pattern, simmon);
        checkPattern(pattern.length - 1);
    }
    setTimeout(() => {
        el.blur();
    }, 900);
}));

var hearts = document.querySelectorAll("img");

$("#game-over").click(reset);

function reset() {
    $("#game-over").hide();
    lives = 3;
    level = 1;
    pattern = [];
    simmon = [];
    document.getElementById("level").textContent = "Level: " + level;
    for (i = 0; i < 3; i++) {
        hearts[i].setAttribute("src", "Assets/full_heart.png");
    }
    createSequence();
}
function createSequence() {
    $("#click-cover").show();
    clickable = false;
    pattern = [];
    simmon = [];
    for (i = 0; i < level; i++) {
        simmon.push(Math.floor(Math.random() * 9));
    }
    playSequence(level);
}
function playSequence(iter) {
    if (iter <= 0) {
        $("#click-cover").hide();
        clickable = true;
        return;
    }
    playButton(parseInt(simmon[simmon.length - iter]));
    setTimeout(() => { playSequence(iter - 1) }, 1500);
}
function playButton(number) {
    buttons[number].click();
    buttons[number].focus();
    setTimeout(() => {
        buttons[number].blur();
    }, 900);
}
function checkPattern(index) {
    if (pattern[index] != simmon[index]) {
        loseLife();
    } else if (pattern.length == simmon.length) {
        levelUp();
    }


}
function levelUp() {
    level++;
    document.getElementById("level").textContent = " Level: " + level;
    setTimeout(() => { createSequence() }, 1500);
}
function loseLife() {
    loseAudio.play();
    pattern = [];
    hearts[3 - lives].setAttribute("src", "Assets/empty_heart.png");
    lives--;
    if (lives < 1) {
        $("#click-cover").show();
        $("#game-over").show();
        clickable = false;
    } else {
        $("#click-cover").show();
        clickable = false;
        setTimeout(() => { playSequence(level) }, 1500);
    }
}