
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
let spaces=[[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false]];
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
  if(wellimg.complete){
    wellwidth=wellimg.width;
    console.log('Rendered Width well:', wellimg.width);  
  }else{
    wellimg.addEventListener('load', function() {
    console.log('load Rendered Width well:', this.width);
    wellwidth=this.width;
    });
  }
  
  if(stonepic.complete){
    imgwidth=parseInt(stonepic.width);
    console.log('Rendered Width stone:', imgwidth); 
    moveStone2(stone,maxpx); 
  }else{
    stonepic.addEventListener('load', function() {
      imgwidth=parseInt(this.width);
      console.log('load Rendered Width stone:', imgwidth);
      
      maxpx= wellwidth-imgwidth;
      console.log("maxpx: ", maxpx);
      moveStone2(stone,maxpx);
    });
  }
  
}

function moveStone2(stone, px){
  let moveInc=10;
  console.log("how much can the block move horizontally? ", px);
  stone.style.position="absolute";
  
  const delay=(ms)=> new Promise(resolve => setTimeout(resolve,ms));

  async function moveloop() {
    let x=0;
    let buttonNotPressed=true;
    stonebutt.addEventListener("click",()=>{
      buttonNotPressed=false;
      console.log("button pressed? ", !buttonNotPressed);
      
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
  }

  
  moveloop();
  
  
};


[container,stoneimg]=makeStone(stoneType[0]);
let maxmove;
maxmove=moveStone1(container,stoneimg);
console.log(container.id);
console.log(wellimg.width);
