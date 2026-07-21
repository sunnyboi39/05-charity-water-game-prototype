
const stoneType=["l shape","back l","wide","tall"];
const stonebutt= document.getElementById("stone-button");
const drops=document.getElementById("drops");
const well = document.getElementById("wellcontainer");
const wellimg = document.getElementById("well");
let stoneNum=0;
let wellwidth;
let imgwidth;
let container;
let stoneimg;
let spaces=[[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false]];

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
  stoneNum=stoneNum+1;
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
  }
  /* add more elifs for different stones*/
  imgWrap.appendChild(stoneImg);
  well.appendChild(imgWrap);
  imgWrap.style.zIndex = "10"; 
  imgWrap.style.position = "absolute";
  return [imgWrap, stoneImg];
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
      placeStone(stone,x,stoneType[0]); //make stone type changeable
      
    });

    while(buttonNotPressed){
      while(x<px){
        if(!buttonNotPressed){
          break;
        }
        console.log(stone.style.left);
        stone.style.left= (parseInt(window.getComputedStyle(stone).left)+ moveInc)+"px";
        console.log(stone.style.left);
        await delay(100);
        console.log("waited");
        console.log("x: ", x);
        x=x+moveInc;
      }
      console.log("right loop done"); 
      while(x>0){
        if(!buttonNotPressed){
          break;
        }
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
  let gridx;
  let gridinc=wellwidth/10;
  console.log('place stone x:', x);
  console.log('place stone id:', stone.id);
  if(0<=x<=gridinc){
    console.log('is ',x,' between 0 and ',gridinc,' :', 0<=x<=gridinc);
    gridx=0;
  }else if(gridinc<x<=3*gridinc){
    gridx=1;

  }else if(3*gridinc<x<=5*gridinc){
    gridx=2;
  }else if(5*gridinc<x<=7*gridinc){
    gridx=3;
  }else{
    gridx=4;
  }
  console.log("grid x value: ", gridx);

  

  //console.log(spaces[4][gridx]==false, spaces[4-1][gridx]==false, spaces[4][gridx+1]==false, spaces[4][gridx+2]==false);
  
  if(stonetype==stoneType[0]){
  
    for(let i=4;i>=0;i--){
      console.log("stone type 0 match: ",stonetype==stoneType[0]);
      if(spaces[i][gridx]==false && spaces[i-1][gridx]==false && spaces[i][gridx+1]==false && spaces[i][gridx+2]==false ){
        spaces[i][gridx]=true;
        spaces[i-1][gridx]=true;
        spaces[i][gridx+1]=true;
        spaces[i][gridx+2]=true;
        console.log(spaces);
        well.appendChild(stone);

        stone.style.gridRow=((i+9)-1)+"/"+((i+9)+1);
        stone.style.gridColumn=gridx+"/"+(gridx+3);
        break;
        /*well.appendChild(stone);

        stone.style.gridRow=2/4;
        //(i-1)+"/"+(i+1);
        stone.style.gridColumn=2/4;
        //gridx+"/"+(grid+3);*/
      }
    }
    
  }
  
}


[container,stoneimg]=makeStone(stoneType[0]);
let maxmove;
moveStone1(container,stoneimg);
console.log(container.id);
console.log(wellimg.width);
