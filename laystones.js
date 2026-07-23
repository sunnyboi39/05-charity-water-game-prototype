
const stoneType=["l shape","back l","wide","tall"];
const stonebutt= document.getElementById("stone-button");
const drops=document.getElementById("drops");
const well = document.getElementById("wellcontainer");
const wellimg = document.getElementById("well");
const body=document.getElementById("body");
const continuebutt=document.getElementById("continue-button");
continuebutt.addEventListener("click",()=>{
  location.reload();
});
let stoneNum=0;
let dropsEarned=0;
let wellwidth;
let imgwidth;
let container;
let stoneimg;
let spaces=Array.from({length: 6}, () => Array(5)); //6 rows, 5 columns

if(wellimg.complete){
    wellwidth=wellimg.width;
    console.log('Rendered Width well:', wellimg.width);  
  }else{
    wellimg.addEventListener('load', function() {
    console.log('load Rendered Width well:', this.width);
    wellwidth=this.width;
    });
  }

function makeStone(stone){
  //stoneNum=stoneNum+1;
  const imgWrap=document.createElement("div");
  const stoneImg=document.createElement("img");
  imgWrap.style.width = "100%";
  imgWrap.style.height = "100%";
  imgWrap.id= "stone"+stoneNum;

  if(stone==stoneType[0]){
    stoneImg.src="img/Lstone.png";
    stoneImg.alt = 'l shape stone';
    stoneImg.style.width = "100%";
    stoneImg.style.height = "100%";
    imgWrap.style.gridRow = "1 / 3";
    imgWrap.style.gridColumn = "1 / 4";
    stoneImg.id="stoneimg"+stoneNum;
  }
  /* add more elifs for different stones*/
  imgWrap.appendChild(stoneImg);
  well.appendChild(imgWrap);
  imgWrap.style.zIndex = "10"; 
  imgWrap.style.position = "absolute";
}

function moveStone1(stone,stonepic){
  let maxpx;
  let userx;
  
  if(stonepic.complete){
    imgwidth=parseInt(stonepic.width);
    console.log('Rendered Width stone:', imgwidth); 
    maxpx= wellwidth-imgwidth;
    console.log("maxpx: ", maxpx);
    userx=moveStone2(stone,maxpx);
  
  }else{
    stonepic.addEventListener('load', function() {
      imgwidth=parseInt(this.width);
      console.log('load Rendered Width stone:', imgwidth);
      
      maxpx= wellwidth-imgwidth;
      console.log("maxpx: ", maxpx);
      userx=moveStone2(stone,maxpx);
      console.log("userx: ", userx);
    });
  }
  return userx;
}
function gameOver(){

}

function moveStone2(){
  let moveInc=10;
  let xval;
  console.log("how much can the block move horizontally? ");
  //stone.style.position="absolute";
  makeStone(stoneType[0]);
  let buttonNotPressed=true;
  
  const delay=(ms)=> new Promise(resolve => setTimeout(resolve,ms));

  async function moveloop() {
    let x=0;

    while(buttonNotPressed){
      document.getElementById("stoneimg"+(stoneNum)).then((stonepic)=>{
        while(x<(wellwidth-stonepic.width) && buttonNotPressed){
          console.log(document.getElementById("stone"+(stoneNum)).style.left);
          document.getElementById("stone"+(stoneNum)).style.left= (parseInt(window.getComputedStyle(document.getElementById("stone"+(stoneNum))).left)+ moveInc)+"px";
          console.log(document.getElementById("stone"+(stoneNum)).style.left);
          await delay(100);
          console.log("waited");
          console.log("x: ", x);
          x=x+moveInc;
        }
        console.log("right loop done"); 
        while(x>0 && buttonNotPressed){
          console.log(document.getElementById("stone"+(stoneNum)).style.left);
          document.getElementById("stone"+(stoneNum)).style.left= (parseInt(window.getComputedStyle(document.getElementById("stone"+(stoneNum))).left)- moveInc)+"px";
          console.log(document.getElementById("stone"+(stoneNum)).style.left);
          await delay(100);
          console.log("waited");
          console.log("x: ", x);
          x=x-moveInc;
        }
        console.log("left loop done");
      });
    }
    return x;
  }


  xval=moveloop();
  console.log("xval: ", xval);
  stonebutt.addEventListener("click",()=>{
    buttonNotPressed=false;
    console.log("button pressed? ", !buttonNotPressed);
    
    makeStone(stoneType[0]);
    document.getElementById("stone"+(stoneNum)).style.gridRow="1/3";
    document.getElementById("stone"+(stoneNum)).style.gridColumn="1/4";
    moveStone1(document.getElementById("stone"+(stoneNum)),document.getElementById("stoneimg"+(stoneNum)));
    placeStone(document.getElementById("stone"+(stoneNum)),xval,stoneType[0]); //make stone type changeable
    stoneNum=stoneNum+1;
      

    //placeStone(document.getElementById("stone"+(stoneNum)),x,stoneType[0]);
    });
  console.log("xval: ", xval);
  return xval;
  
}
function placeStone(stone,x,stonetype){
  let spaceval;
  let gridx;
  let gridinc=wellwidth/10;
  x.then((x)=>{
    console.log('gridinc time 3: ', 3*gridinc);
      console.log('column 5');
      console.log('x value: ', x);
      console.log('gridinc value: ', gridinc);
      console.log('well width: ', wellwidth);
      console.log('is ',x,' a number', typeof x === 'number');
      console.log('is ',gridinc,' a number', typeof gridinc === 'number');
    
    console.log('gridinc', gridinc);
    console.log('place stone x:', x);
    console.log('place stone id:', stone.id);
    stone.style.left=0;
    if(x<=3*gridinc){
      gridx=0;
      console.log('gridinc time 3: ', 3*gridinc);
      console.log('column 1');
    }else if(x <= 5*gridinc){
      
      gridx=1;
      console.log('column 2');

    }else if(x<=(7*gridinc)){
      
      gridx=2;
      console.log('column 3');
    }else if(x<=9*gridinc){
      
      gridx=3;
      console.log('column 4');
    }else{
      gridx=4;
      console.log('column 5');

    }
    console.log("grid x value: ", gridx); 

    

    //console.log(spaces[4][gridx]==false, spaces[4-1][gridx]==false, spaces[4][gridx+1]==false, spaces[4][gridx+2]==false);
    
    if(stonetype==stoneType[0]){
      if(gridx>3){
        gridx=3;
      }
    
      for(let i=5;i>=0;i--){
        for(let j=0;j<5;j++){
          for(let k=0;k<6;k++){
            console.log("spaces[",k,"][",j,"] = ", spaces[k][j]);
            let spaceval=spaces?.[k][j];
          }
        }
        console.log("stone type 0 match: ",stonetype==stoneType[0]);
        console.log(spaces);
        
        if(( spaces[i][gridx]===undefined) && ( spaces[i-1][gridx]===undefined) &&  ( spaces[i][gridx+1]===undefined ) && ( spaces[i][gridx+2]===undefined) ){
      
          spaces[i][gridx]=false;
          spaces[i-1][gridx]=false;
          spaces[i][gridx+1]=false;
          spaces[i][gridx+2]=false;
          console.log(spaces);
          
          well.appendChild(stone);
          stone.style.position="absolute";
          
          
          stone.style.gridRow=((i+8)-1)+"/"+((i+8)+1);
          stone.style.gridColumn=(gridx+2)+"/"+(gridx+5);
          console.log(stone.style.gridRow, stone.style.gridColumn);
        
          
          break;
        }
        
        
        
        let gamedrops=0;
        for(let p=0;p<5;p++){
          if(spaces[0][p]===false){
            console.log("game over");
            for(let r=1;r<6;r++){
              for(let c=0;c<5;c++){
                if(spaces[c][r]===false){
                  gamedrops=gamedrops+40;
                }
              }
            }

            gamedrops=gamedrops+dropsEarned;
            const gameover=document.createElement("p");
            gameover.textContent="Game Over!\n you earned "+gamedrops+" drops!";
            gameover.style.fontSize="2rem";
            gameover.style.backgroundColor="white";
            gameover.style.position="absolute";
            gameover.style.gridRow="1/15";
            gameover.style.left="1/9";
            gameover.style.zIndex="11";
            well.appendChild(gameover);
            continuebutt.style.display="block";
            //drops.textContent="&#128167;- "+ gamedrops;
            document.getElementById("stone"+(stoneNum)).style.display="none";
            stonebutt.removeEventListener("click",()=>{});
            stonebutt.disabled=true;
            break;
          }
          break;
        }
          
        
      
      }
    }
  });
    
}


moveStone2();
//makeStone(stoneType[0]);
//let maxmove;
//moveStone1(document.getElementById("stone"+stoneNum),document.getElementById("stoneimg"+stoneNum));
//console.log(container.id);
//console.log(wellimg.width);

