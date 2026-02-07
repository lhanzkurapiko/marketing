let balance = 0;
let history = [];
let userPin = '';
let userNum = '';

function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function update(){
  document.getElementById('bal').innerText = '₱' + balance + '.00';
  document.getElementById('log').innerHTML = history.map(h=>'<p>'+h+'</p>').join('');
  document.getElementById('pnum').innerText = 'Number: ' + userNum;
}

function createAccount(){
  userNum = document.getElementById('number').value;
  userPin = document.getElementById('pin').value;
  if(!userNum || !userPin) return alert('Fill all');
  balance = 1000;
  history = ['Account created +₱1000'];
  update();
  show('home');
}

function verify(){
  let p = prompt('Enter PIN');
  return p === userPin;
}

function sendMoney(){
  if(!verify()) return alert('Wrong PIN');
  let a = parseInt(prompt('Amount'));
  if(a>0 && a<=balance){
    balance -= a;
    history.push('Sent ₱'+a);
    update();
  }
}

function cashIn(){
  if(!verify()) return alert('Wrong PIN');
  let a = parseInt(prompt('Cash In'));
  if(a>0){
    balance += a;
    history.push('Cash In ₱'+a);
    update();
  }
}

function toggleDark(){
  document.body.classList.toggle('dark');
}

function logout(){
  balance = 0;
  history = [];
  show('login');
}