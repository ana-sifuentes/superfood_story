
var character = doucment.getElementByID("character");

var block = document.getElementById("block");


function jump(){
  
  if(character.classList != "animate"){
    character.classList.add("animate");
  }
  
  setTimeout(function(){
    character.classList.remove("animate");
  },500);
  
}




document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      alert("clicked space bar");
       jump();
    }
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


  function showAlert() {
    alert ("Hello world!");
  }
