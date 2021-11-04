/*漢字の入った名言を問題にしたい。その下にアルファベット表記を入れる*/
//漢字問題
//kannzimonndai
//この2つをセットのデータにしてアルファベット表記にだけ判定を付ける
//const problem = ('漢字','kannzi');
//次回、上記をwordsに入れられる様に新しくコピーして作り直す



const words = [
  'document.getElementById',
  'const',
  'let',
  'function updateStart',
  'console.log',
  'window.addEventListener',
  'click',
  'textContent',
  'keydown',
];

let word;
let loc;
let socre;
let miss;
let type;
let misstyp;
let gameover;
const timeLimit = 40 * 1000;
let startTime;
let isPlaying = false;

const start = document.getElementById('start');
const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');
const timerLabel = document.getElementById('timer');

function updateStart(){
  let placeholder = '';
  for (let i = 0; i < loc; i++){
    placeholder += '_';
  }
  start.textContent = placeholder + word.substring(loc);
}



function updateTimer(){
  const timeLeft = startTime + timeLimit - Date.now();
  timerLabel.textContent = (timeLeft / 1000).toFixed(2);

  const timeoutId = setTimeout(() =>{
    updateTimer();
  },10);

  if (timeLeft < 0) {
    isPlaying = false;
    clearTimeout(timeoutId);
    timerLabel.textContent = '0.00';
    setTimeout(() =>{
      showResult();
    },100)
    start.textContent = 'click to replay';
  }
}

function showResult() {
  const accuracy = score + miss === 0 ? 0 :score/(score + miss) * 100;
  alert(`${score} lettters.${miss}misses.${accuracy.toFixed(2)}% accuracy!`);
}

window.addEventListener('click',() => {
  if (isPlaying === true){
    return;
  }
  isPlaying = true;
  loc = 0;
  score = 0;
  miss = 0;
  scoreLabel.textContent = score;
  missLabel.textContent = miss;
  word = words[Math.floor(Math.random() * words.length)];
  start.textContent = word;
  startTime = Date.now();
  updateTimer();
});

window.addEventListener('keydown', e => {
  if(isPlaying !== true){
    return;
  }

  if(e.key === word[loc]){
    console.log('score');
    loc ++;
    if (loc === word.length){
      word = words [Math.floor(Math.random() * words.length)];
      loc = 0;
    }
    updateStart();
    score++;
    scoreLabel.textContent = score;
  }else {
    console.log('miss');
    miss++;
    missLabel.textContent = miss;
  }
});
