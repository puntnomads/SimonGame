var computer = [];
var index = 0;
var counter = document.getElementById("output");
var strict = false;
var audio;

document.getElementById("0").addEventListener("click", clicked);
document.getElementById("1").addEventListener("click", clicked);
document.getElementById("2").addEventListener("click", clicked);
document.getElementById("3").addEventListener("click", clicked);
document.getElementById("start").addEventListener("click", start);
document.getElementById("strict").addEventListener("click", toggle);

var audio0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

function toggle(){
strict = !strict;
}

function clicked(e) {
 var colour = "";
 switch (Number(this.id)) {
    case 0:
        colour = "red";
        audio = audio0;
        break;
    case 1:
        colour = "#7FFF00";
        audio = audio1;
        break;
    case 2:
        colour = "blue";
        audio = audio2;
        break;
    case 3:
        colour = "yellow";
        audio = audio3;
        break;
}
 highlight(document.getElementById(this.id),colour);
 if(e.isTrusted){
 verify(Number(this.id));
 }
}

function verify(id){
setTimeout(function(){
 if(id===computer[index]){
  index++;
 } else {
 if(strict){
  index = 0;
  start();
  return;
 } else {
 index = 0;
 counter.innerHTML = "--";
 setTimeout(function(){
  counter.innerHTML = computer.length;
  clickButtonsInArray();
}, 2000);
 }
 }
 if(index === 20){
 alert("You are victorious");
 index = 0;
 start();
 } else if(computer.length === index && computer.length>0){
  index = 0;
  play();
 }
   }, 2000);
}

function highlight(obj, colour){
   var orig = obj.style.backgroundColor;
   obj.style.backgroundColor = colour;
   audio.play();
   setTimeout(function(){
        obj.style.backgroundColor = orig;
   }, 1000);
}

function play (){
counter.innerHTML = computer.length+1;
if(computer.length === 0){
next();
} else {
clickButtonsInArray();
setTimeout(function(){
next();
}, 2000*computer.length);
}
}

function clickButtonsInArray(){
for(var i = 0; i < computer.length; i++){
clickButton(i);
}
}

function clickButton(i){
setTimeout(function(){
  document.getElementById(""+computer[i]).click();
}, 2000*i);
}

function next(){
console.log(computer.length);
var random = Math.floor(Math.random() * 4);
computer.push(random);
document.getElementById(""+random).click();
}

function start(){
counter.innerHTML = "--";
computer = [];
setTimeout(function(){
  play();
}, 1000);
}