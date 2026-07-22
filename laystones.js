
const stoneType=["l shape","back l","wide","tall"];
const stonebutt= document.getElementById("stone-button");
const drops=document.getElementById("drops");
const well = document.getElementById("wellcontainer");
const wellimg = document.getElementById("well");
let stoneNum=0;
let dropsEarned=0;
let wellwidth;
let imgwidth;
let container;
let stoneimg;
let spaces=[[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,],[,,,,,]];

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

function moveStone2(stone, px){
  let moveInc=10;
  let xval;
  console.log("how much can the block move horizontally? ", px);
  stone.style.position="absolute";
  
  const delay=(ms)=> new Promise(resolve => setTimeout(resolve,ms));

  async function moveloop() {
    let x=0;
    let buttonNotPressed=true;
    stonebutt.addEventListener("click",()=>{
      buttonNotPressed=false;
      console.log("button pressed? ", !buttonNotPressed);
      placeStone(document.getElementById("stone"+(stoneNum)),x,stoneType[0]); //make stone type changeable
      stoneNum=stoneNum+1;
      
      makeStone(stoneType[0]);
      document.getElementById("stone"+(stoneNum)).style.gridRow="1/3";
      document.getElementById("stone"+(stoneNum)).style.gridColumn="1/4";
      
      x=moveStone1(document.getElementById("stone"+(stoneNum)),document.getElementById("stoneimg"+(stoneNum)));

      placeStone(document.getElementById("stone"+(stoneNum)),x,stoneType[0]);
    });

    while(buttonNotPressed){
      while(x<px && buttonNotPressed){
        console.log(stone.style.left);
        stone.style.left= (parseInt(window.getComputedStyle(stone).left)+ moveInc)+"px";
        console.log(stone.style.left);
        await delay(100);
        console.log("waited");
        console.log("x: ", x);
        x=x+moveInc;
      }
      console.log("right loop done"); 
      while(x>0 && buttonNotPressed){
        console.log(stone.style.left);
        stone.style.left= (parseInt(window.getComputedStyle(stone).left)- moveInc)+"px";
        console.log(stone.style.left);
        await delay(100);
        console.log("waited");
        console.log("x: ", x);
        x=x-moveInc;
      }
      console.log("left loop done");
    }
    return x;
  }

  
  xval=moveloop();
  console.log("xval: ", xval);
  return xval;
  
}
function placeStone(stone,x,stonetype){
  let spaceval;
  let gridx;
  let gridinc=wellwidth/10;
  console.log('gridinc', gridinc);
  console.log('place stone x:', x);
  console.log('place stone id:', stone.id);
  stone.style.left=0;
  if(x<=3*gridinc){
    gridx=0;
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
  
  outerloop: if(stonetype==stoneType[0]){
  
    for(let i=5;i>=0;i--){
      for(let j=0;j<5;j++){
        for(let k=0;k<6;k++){
          console.log("spaces[",k,"][",j,"] = ", spaces[k][j]);
          let spaceval=spaces?.[k][j];
        }
      }
      console.log("stone type 0 match: ",stonetype==stoneType[0]);
      console.log(spaces);
      try{
        if(( spaces[i][gridx]===undefined) && ( spaces[i-1][gridx]===undefined) &&  ( spaces[i][gridx+1]===undefined ) && ( spaces[i][gridx+2]===undefined) ){
    
          spaces[i][gridx]=true;
          spaces[i-1][gridx]=true;
          spaces[i][gridx+1]=true;
          spaces[i][gridx+2]=true;
          console.log(spaces);
        
          //well.appendChild(stone);
          stone.style.position="absolute";
        
        
          stone.style.gridRow=((i+8)-1)+"/"+((i+8)+1);
          stone.style.gridColumn=(gridx+2)+"/"+(gridx+5);
          console.log(stone.style.gridRow, stone.style.gridColumn);
       
        
          break outerloop;
        }
      }catch(error){
        console.error("Error placing stone: ", error);
        let gamedrops=0;
        for(let p=0;p<5;p++){
          if(spaces[0][p]===true){
            console.log("game over");
            for(let r=1;r<6;r++){
              for(let c=0;c<5;c++){
                if(spaces[c][r]===true){
                  gamedrops=gamedrops+40;
                }
              }
            }
          }
        }
        gamedrops=gamedrops+dropsEarned;
        const gameover=document.createElement("p");
        gameover.textContent="Game Over!\n you earned "+gamedrops+" drops!";
        gameover.style.fontSize="5rem";
        gameover.style.backgroundColor="white";
        //drops.textContent="&#128167;- "+ gamedrops;
        document.getElementById("stone"+(stoneNum)).style.display="none";
        stonebutt.removeEventListener("click",()=>{});
        stonebutt.disabled=true;
        break;
      }
    
    }
  }
    
}



makeStone(stoneType[0]);
//let maxmove;
moveStone1(document.getElementById("stone"+stoneNum),document.getElementById("stoneimg"+stoneNum));
//console.log(container.id);
//console.log(wellimg.width);
