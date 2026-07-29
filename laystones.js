
const stoneType=["l stone","r stone","square","flipped r","flipped l","flat"];
const stonebutt= document.getElementById("stone-button");
const well = document.getElementById("wellcontainer");
const wellimg = document.getElementById("well");
const body=document.getElementById("body");
const continuebutt=document.getElementById("continue-button");
if(continuebutt){
  continuebutt.addEventListener("click",()=>{
    saveData();
    location.reload();
  });
}
const startbutt=document.getElementById("start-butt");
const storageKey="totalDrops";
let stoneNum=0;
let dropsEarned=0;
let wellwidth;
let imgwidth;
let container;
let stoneimg;
let spaces=Array.from({length: 6}, () => Array(5)); //6 rows, 5 columns
let gamedrops=0;

function syncGamedrops(){
  window.gamedrops = gamedrops;
  if(typeof window.updateDropsDisplay === "function"){
    window.updateDropsDisplay();
  }
}

function saveData(){
  syncGamedrops();
  const data={
    drops: gamedrops
  };
  localStorage.setItem(storageKey,JSON.stringify(data));
}
function restoreData(){
  const savedData=localStorage.getItem(storageKey);
  if (savedData){
    const data=JSON.parse(savedData);
    gamedrops= parseInt(data.drops,10);
  }
  syncGamedrops();
}
restoreData();
if(wellimg){
  if(wellimg.complete){
      wellwidth=wellimg.width;
      console.log('Rendered Width well:', wellimg.width);  
    }else{
      wellimg.addEventListener('load', function() {
      console.log('load Rendered Width well:', this.width);
      wellwidth=this.width;
      });
    }
}

function makeStone(stone){
  //stoneNum=stoneNum+1;
  let shiftpx;
  const imgWrap=document.createElement("div");
  const stoneImg=document.createElement("img");
  imgWrap.style.width = "100%";
  imgWrap.style.height = "100%";
  imgWrap.id= "stone"+stoneNum;
  imgWrap.style.left = "0px";

  if(stone==stoneType[0]){
    stoneImg.src="img/Lstone.png";
    stoneImg.alt = ' short l shape stone';
    stoneImg.style.width = "100%";
    stoneImg.style.height = "100%";
    imgWrap.style.gridRow = "1 / 3";
    imgWrap.style.gridColumn = "1 / 4";
    stoneImg.id="stoneimg"+stoneNum;
    stoneImg.style.left="0px";
  }else if(stone==stoneType[1]){
    stoneImg.src="img/Rstone.png";
    stoneImg.alt = 'backwards l stone';
    stoneImg.style.width = "100%";
    stoneImg.style.height = "100%";
    imgWrap.style.gridRow = "1 / 4";
    imgWrap.style.gridColumn = "1 / 3";
    stoneImg.id="stoneimg"+stoneNum;
    stoneImg.style.left="0px";
  }else if(stone==stoneType[2]){
    stoneImg.src="img/square stone.png";
    stoneImg.alt = 'square stone';
    stoneImg.style.width = "100%";
    stoneImg.style.height = "100%";
    imgWrap.style.gridRow = "1 / 3";
    imgWrap.style.gridColumn = "1 / 3";
    stoneImg.id="stoneimg"+stoneNum;
    stoneImg.style.left="0px";
  }else if(stone==stoneType[3]){
    stoneImg.src="img/flipped Rstone.png";
    stoneImg.alt = 'flipped backwards l stone';
    stoneImg.style.width = "100%";
    stoneImg.style.height = "100%";
    imgWrap.style.gridRow = "1 / 4";
    imgWrap.style.gridColumn = "1 / 3";
    stoneImg.id="stoneimg"+stoneNum;
    stoneImg.style.left="0px";
  }else if(stone==stoneType[4]){
    stoneImg.src="img/flipped Lstone.png";
    stoneImg.alt = 'flipped l stone';
    stoneImg.style.width = "100%";
    stoneImg.style.height = "100%";
    imgWrap.style.gridRow = "1 / 3";
    imgWrap.style.gridColumn = "1 / 4";
    stoneImg.id="stoneimg"+stoneNum;
    stoneImg.style.left="0px";
  }else if(stone==stoneType[5]){
    stoneImg.src="img/flat stone.png";
    stoneImg.alt = 'flat stone';
    stoneImg.style.width = "100%";
    stoneImg.style.height = "100%";
    imgWrap.style.gridRow = "1/2";
    imgWrap.style.gridColumn = "1 / 6";
    stoneImg.id="stoneimg"+stoneNum;
    stoneImg.style.left="0px";
  }
  /* add more elifs for different stones*/
  imgWrap.appendChild(stoneImg);
  well.appendChild(imgWrap);
  imgWrap.style.zIndex = "10"; 
  imgWrap.style.position = "absolute";

  shiftpx=wellwidth-parseInt(stoneImg.width);
  console.log("shiftpx: ", shiftpx);
  return shiftpx;
}

function moveStone1(stone,stonepic){
  let maxpx;
  let userx;
  
  if(stonepic.complete){
    imgwidth=parseInt(stonepic.width);
    console.log('Rendered Width stone:', imgwidth); 
    maxpx= wellwidth-imgwidth;
    console.log("maxpx: ", maxpx);
    //userx=moveStone2(stone,maxpx);
  
  }else{
    stonepic.addEventListener('load', function() {
      imgwidth=parseInt(this.width);
      console.log('load Rendered Width stone:', imgwidth);
      
      maxpx= wellwidth-imgwidth;
      console.log("maxpx: ", maxpx);
     // userx=moveStone2(stone,maxpx);
      console.log("userx: ", userx);
    });
  }
  return userx;
}



function moveStone2(){
  let xval;
  console.log("how much can the block move horizontally? ");
  //document.getElementById("stone"+(stoneNum)).style.position="absolute";
  //maxmove=makeStone(stoneType[0]);
  //console.log("maxmove is a number: ", typeof maxmove === 'number');

  const delay=(ms)=> new Promise(resolve => setTimeout(resolve,ms));
  let buttonNotPressed=true;
  let maxmove=0;

  async function moveloop() {
    let moveInc=Math.floor(maxmove/10);
    let x=0;
    buttonNotPressed=true;
    console.log("moveloop running ");
    let tempconstraint=0;
    document.getElementById("stone"+stoneNum).style.zIndex= (10+stoneNum)+"";

    while(buttonNotPressed===true){
      document.getElementById("stone"+stoneNum).style.left="0px";
      console.log("maxmove while loop: ", maxmove);
      x=0;

      for(l=0;l<=moveInc;l++){
        document.getElementById("stone"+(stoneNum)).style.left= (l*(Math.floor(maxmove/moveInc)))+"px";
        console.log(document.getElementById("stone"+(stoneNum)).style.left);
        await delay(100);
      }
      console.log("right loop done");
      for(r=moveInc;r>=0;r--){
        document.getElementById("stone"+(stoneNum)).style.left= (r*(Math.floor(maxmove/moveInc)))+"px";
        console.log(document.getElementById("stone"+(stoneNum)).style.left);
        await delay (100);
      }
      await delay(0);



      
      /*while(buttonNotPressed===true && x<maxmove){
        //if(parseInt(document.getElementById("stone"+stoneNum).style.left)>=(160)){
        //  break;
        //}
        //console.log(document.getElementById("stone"+(stoneNum)).style.left);
        document.getElementById("stone"+(stoneNum)).style.left=(parseInt(document.getElementById("stone"+(stoneNum)).style.left)+ moveInc)+"px"
        //console.log(document.getElementById("stone"+(stoneNum)).style.left);
        //console.log("button pressed? ", !buttonNotPressed);
  
        await delay(100);
        x=x+moveInc;
        //console.log("waited");
        //console.log("x: ", x);
        
        
      }
      console.log("right loop done"); 
      //document.getElementById("stone"+stoneNum).style.left=169+"px";
      while(buttonNotPressed===true){
        if(parseInt(document.getElementById("stone"+stoneNum).style.left)<=10){
          break;
        }
        //console.log(document.getElementById("stone"+(stoneNum)).style.left);
        document.getElementById("stone"+(stoneNum)).style.left= (parseInt(document.getElementById("stone"+(stoneNum)).style.left)- moveInc)+"px";
        //console.log(document.getElementById("stone"+(stoneNum)).style.left);
        //console.log("button pressed? ", !buttonNotPressed);
        await delay(100);
        x=x-moveInc;
        //console.log("waited");
        //console.log("x: ", x);
        await delay();
      
      }*/
      console.log("left loop done");
      
    }
    //console.log("button pressed? ", !buttonNotPressed);
    //console.log("x: ",x);
    //return x;
  }

  //xval=moveloop();
  console.log("xval: ", xval);
  if(startbutt){
    startbutt.addEventListener("click",()=>{
    //buttonNotPressed=false;
    startbutt.disabled=true;
    stonebutt.disabled=false;
    stonebutt.style.display= "flex";
    //console.log("button pressed? ", !buttonNotPressed);
    stoneNum=stoneNum+1;
    maxmove=makeStone(stoneType[stoneNum-1]);
    console.log("maxmove(", maxmove, ") is a number?: ", typeof maxmove === 'number');
    document.getElementById("stone"+(stoneNum)).style.left="0px"
    //document.getElementById("stone"+(stoneNum)).style.gridRow="1/3";
    //document.getElementById("stone"+(stoneNum)).style.gridColumn="1/4";
    moveStone1(document.getElementById("stone"+(stoneNum)),document.getElementById("stoneimg"+(stoneNum)));
    moveloop();
    //console.log("xval: ", xval)
    if(stonebutt){
      stonebutt.addEventListener("click", ()=>{
      clearTimeout(delay);
      buttonNotPressed=false;
      xval=parseInt(document.getElementById("stone"+(stoneNum)).style.left);
      console.log("XVAL: ", xval," is it a number? ", typeof xval)
      try{
        placeStone(document.getElementById("stone"+(stoneNum)),xval,stoneType[stoneNum-1]);
      //console.log("button pressed? ", !buttonNotPressed);
      stoneNum=stoneNum+1;
      maxmove=makeStone(stoneType[stoneNum-1]);
      console.log("maxmove(", maxmove, ") is a number?: ", typeof maxmove === 'number');
      document.getElementById("stone"+(stoneNum)).style.left="0px"
      //document.getElementById("stone"+(stoneNum)).style.gridRow="1/3";
      //document.getElementById("stone"+(stoneNum)).style.gridColumn="1/4";
      moveStone1(document.getElementById("stone"+(stoneNum)),document.getElementById("stoneimg"+(stoneNum)));
      xval=moveloop();
      console.log("xval: ", xval);
      }catch(error){
        if(error instanceof ReferenceError || error instanceof TypeError){
          console.log("ERROR!!: ", error.name," ", error.message);
          gameover();
    

        }
      }
    });
    }

     //make stone type changeable
    
      

    //placeStone(document.getElementById("stone"+(stoneNum)),x,stoneType[0]);
    });
  }
  console.log("xval: ", xval);
  return xval;
}
  
function gameover(){
  for(let p=5;p>0;p--){
    //if(spaces[0][p]===false){
    console.log("game over");
    for(let r=1;r<6;r++){
      for(let c=0;c<5;c++){
        console.log("space[",r,"][",c,"] is: ", spaces[r][c]);
        if(spaces[r][c]===false){
          dropsEarned=dropsEarned+40;
          console.log("gamedrops",gamedrops);
        }
      }
    }

    gamedrops=gamedrops+dropsEarned;
    syncGamedrops();
    saveData();
    const gameover=document.createElement("p");
    gameover.textContent="Game Over!\n you earned "+dropsEarned+" drops!\nYou have  "+gamedrops+" drops in total!";
    gameover.style.fontSize="1rem";
    gameover.style.backgroundColor="white";
    gameover.style.position="absolute";
    gameover.style.gridRow="4/7";
    gameover.style.left="1/9";
    gameover.style.zIndex="30";
    well.appendChild(gameover);
    continuebutt.style.display="flex";
    continuebutt.style.gridRow="5/6";
    continuebutt.style.gridColumn="5/6";
    //drops.textContent="&#128167;- "+ gamedrops;
    document.getElementById("stone"+(stoneNum)).style.display="none";
    stonebutt.removeEventListener("click",()=>{});
    stonebutt.disabled=true;
    startbutt.style.display="none";
    //break;
  //}
    break;
  }
}

function placeStone(stone,x,stonetype){
  let spaceval;
  let gridx;
  let gridinc=wellwidth/10;
  //x.then((x)=>{
  console.log('gridinc time 3: ', 3*gridinc);
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
  }
  
  
  try{
    for(let i=5;i>=0;i--){
      for(let j=0;j<5;j++){
        for(let k=0;k<6;k++){
          console.log("spaces[",k,"][",j,"] = ", spaces[k][j]);
          let spaceval=spaces?.[k][j];
        }
      }
    
      console.log("stone type match: ",stonetype==stoneType[1]);
      console.log(spaces);
      console.log("STONE TYPE: ",stonetype);
      if(stonetype===stoneType[0]){
        if(( spaces[i][gridx]===undefined) && ( spaces[i-1][gridx]===undefined) &&  ( spaces[i][gridx+1]===undefined ) && ( spaces[i][gridx+2]===undefined) ){
      
          spaces[i][gridx]=false;
          spaces[i-1][gridx]=false;
          spaces[i][gridx+1]=false;
          spaces[i][gridx+2]=false;
          console.log(spaces);
          
          well.appendChild(stone);
          stone.style.position="absolute";
          
          
          stone.style.gridRow=((15-(6-i))-2)+"/"+((15-(6-i)));
          stone.style.gridColumn=(gridx+2)+"/"+(gridx+5);
          console.log(stone.style.gridRow, stone.style.gridColumn);
          break;
        }
      }else if(stonetype===stoneType[1]){
        if(( spaces[i][gridx]===undefined) && ( spaces[i][gridx+1]===undefined) &&  ( spaces[i-1][gridx+1]===undefined ) && ( spaces[i-2][gridx+1]===undefined) ){
      
          spaces[i][gridx]=false;
          spaces[i][gridx+1]=false;
          spaces[i-1][gridx+1]=false;
          spaces[i-2][gridx+1]=false;
          console.log(spaces);
          
          well.appendChild(stone);
          stone.style.position="absolute";
          
          
          stone.style.gridRow=((15-(6-i))-3)+"/"+((15-(6-i)));
          stone.style.gridColumn=(gridx+2)+"/"+(gridx+4);
          console.log(stone.style.gridRow, stone.style.gridColumn);
          break;
        }
      }else if(stonetype===stoneType[2]){
        if(( spaces[i][gridx]===undefined) && ( spaces[i][gridx+1]===undefined) &&  ( spaces[i-1][gridx+1]===undefined ) && ( spaces[i-1][gridx]===undefined) ){
      
        
          spaces[i][gridx]=false;
          spaces[i][gridx+1]=false;
          spaces[i-1][gridx+1]=false;
          spaces[i-1][gridx]=false;
          console.log(spaces);
          well.appendChild(stone);
          stone.style.position="absolute";
          
          
          stone.style.gridRow=((15-(6-i))-2)+"/"+((15-(6-i)));
          stone.style.gridColumn=(gridx+2)+"/"+(gridx+4);
          console.log(stone.style.gridRow, stone.style.gridColumn);
          break;
        }
      }else if(stonetype===stoneType[3]){
        if(( spaces[i][gridx]===undefined) && ( spaces[i-1][gridx]===undefined) &&  ( spaces[i-2][gridx]===undefined ) && ( spaces[i-2][gridx+1]===undefined) ){
      
          spaces[i][gridx]=false;
          spaces[i-1][gridx]=false;
          spaces[i-2][gridx]=false;
          spaces[i-2][gridx+1]=false;
          console.log(spaces);
          
          well.appendChild(stone);
          stone.style.position="absolute";
          
          
          stone.style.gridRow=((15-(6-i))-3)+"/"+((15-(6-i)));
          stone.style.gridColumn=(gridx+2)+"/"+(gridx+4);
          console.log(stone.style.gridRow, stone.style.gridColumn);
          break;
        }
      }else if(stonetype===stoneType[4]){
        if(( spaces[i][gridx]===undefined) && ( spaces[i-1][gridx]===undefined) &&  ( spaces[i-1][gridx+1]===undefined ) && ( spaces[i-1][gridx+2]===undefined) ){
      
          spaces[i][gridx]=false;
          spaces[i-1][gridx]=false;
          spaces[i-1][gridx+1]=false;
          spaces[i-1][gridx+2]=false;
          console.log(spaces);
          
          well.appendChild(stone);
          stone.style.position="absolute";
          
          
          stone.style.gridRow=((15-(6-i))-2)+"/"+((15-(6-i)));
          stone.style.gridColumn=(gridx+2)+"/"+(gridx+5);
          console.log(stone.style.gridRow, stone.style.gridColumn);
          break;
        }
      }else if(stonetype===stoneType[5]){
        if(( spaces[i][gridx]===undefined) && ( spaces[i][gridx+1]===undefined) &&  ( spaces[i][gridx+2]===undefined ) && ( spaces[i][gridx+3]===undefined) && ( spaces[i][gridx+4]===undefined ) ){
      
          spaces[i][gridx]=false;
          spaces[i][gridx+1]=false;
          spaces[i][gridx+2]=false;
          spaces[i][gridx+3]=false;
          spaces[i][gridx+4]=false;
          console.log(spaces);
          
          well.appendChild(stone);
          stone.style.position="absolute";
          
          
          stone.style.gridRow=((15-(6-i))-1)+"/"+((15-(6-i)));
          stone.style.gridColumn=(gridx+2)+"/"+(gridx+6);
          console.log(stone.style.gridRow, stone.style.gridColumn);
          break;
        }
      }
    }
  }
  catch(error){
    if(error instanceof ReferenceError || error instanceof TypeError){
      console.error("cant place at spaces: [",i,"][", gridx,"], [",i-1,"][",gridx,"], [",i,"][",gridx+1,"], [",i,"][",gridx+2,"]");
      gameover();

      
    }else{
      console.log("other err: ", error.name," ", error.message);
    }
    
  }     
        
      
      
    
  //});
    
}

moveStone2();
//makeStone(stoneType[0]);
//let maxmove;
//moveStone1(document.getElementById("stone"+stoneNum),document.getElementById("stoneimg"+stoneNum));
//console.log(container.id);
//console.log(wellimg.width);

