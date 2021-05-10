  
//based on the code by : https://github.com/Beat0154


//variables
var character = document.getElementById("character");
var block = document.getElementById("block");


//counter set to 0 before stage 1
var counter=0;
var game_stage=0;





//title screen
function title_screen(){
  
  //remove the title screen
  document.getElementById("stage0").classList.remove("current");
  
  //switch to game screen
  document.getElementById("stage1").classList.add("current");
  game_stage = 1;  
}


//player jumps
function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },300);
}



//check if player lost

var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  
    if(blockLeft<70 && blockLeft>-20 && characterTop>=185){
        block.style.animation = "none";
      //  alert("Game Over. score: "+Math.floor(counter/100));
        counter=0;
        block.style.animation = "block 1s infinite linear";
    }else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10)




//when the user clicks 
document.body.onkeyup = function(e){
    if(e.keyCode == 32){

       if(game_stage == 0){
          title_screen();
       }
      
       if(game_stage == 1){
          jump();
       }
    }
}

