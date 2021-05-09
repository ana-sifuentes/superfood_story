
var character = doucment.getElementByID("character");

var block = document.getElementById("block");


function jump(){
  
  if(character.classList !="animate_jump"){
    character.classList.add("animate_jump");
  }
  
  setTimeout(function(){
    character.classList.remove("animate_jump");
  },500);
  
}

var checkDead = setInterval(function(){
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));  
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));  
  
  if(blockLeft < 20 && blockLeft > 0 && characterTop>=130){
   block.style.animation ="none";
    block.style.display = "none";
   alert("you lose :c "); 
  }
},10);
