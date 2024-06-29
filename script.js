const audio1 = new Audio(encodeURI("Assets/C Single Note.mp3"));
const audio2 = new Audio(encodeURI("Assets/Db Single Note.mp3"));
const audio3 = new Audio(encodeURI("Assets/D Single Note.mp3"));
const audio4 = new Audio(encodeURI("Assets/Eb Single Note.mp3"));
const audio5 = new Audio(encodeURI("Assets/E Single Note.mp3"));
const audio6 = new Audio(encodeURI("Assets/F Single Note.mp3"));
const audio7 = new Audio(encodeURI("Assets/Gb Single Note.mp3"));
const audio8 = new Audio(encodeURI("Assets/G Single Note.mp3"));
const audio9 = new Audio(encodeURI("Assets/Ab Single Note.mp3"));

lives = 3;
level=1;
pattern=[];
simmon=[];

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
    setTimeout(()=>{
        el.blur();
    },900);
    
    if(document.getElementById("#click-cover")==null){
        pattern.push(index);
        console.log(pattern,simmon);
    }   
    if(pattern.length>=simmon.length){
        checkPattern();
    }
}));

var hearts = document.querySelectorAll("img");

$("#game-over").click(createSequence,reset);
function reset(){
    lives=3;
    level=1;
    pattern=[];
    simmon=[];
    document.getElementById("level").textContent="Level: " + level;
    for (i=0;i<3;i++){
        hearts[i].setAttribute("src","Assets/full_heart.png");
    }
}
function createSequence(){
    $("#game-over").toggle();
    simmon=[]; 
    for (i=0;i<level;i++){
        simmon.push(Math.floor(Math.random()*9));
    } 
    playSequence(level);
}
function playSequence(iter){
    if (iter<=0){
        $("#click-cover").toggle();
        return;
    } 
    playButton(parseInt(simmon[simmon.length-iter]));
    setTimeout(()=>{playSequence(iter-1)},1500);
}
function playButton(number){
    buttons[number].click();
    buttons[number].focus();
    setTimeout(()=>{
        buttons[number].blur();
    },900);
}
function checkPattern(){
    if(pattern==simmon){
        levelUp();
    }else{
        loseLife();
    }
    createSequence();
}
function levelUp(){
    level++;
    document.getElementById("level").textContent=" Level: " + level;
}
function loseLife(){
    hearts[3-lives].setAttribute("src","Assets/empty_heart.png");
    lives--;
    if (lives<=0){
        $("#click-cover").toggle();
        $("#game-over").toggle();
    }
}